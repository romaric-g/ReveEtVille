import { render, h } from 'preact';
import { useCallback, useState } from 'preact/hooks';
import classnames from 'classnames';
import i18n from "i18next";
import { useTranslation } from 'react-i18next';
import MenuDecoration from './MenuDecoration';
import './index.scss';
import Icon from '../Icon';
import { Pages } from '../../App';

interface Props {
    isPlay: boolean,
    quit: () => void,
    volume: number,
    onVolumeChange: (event: any) => void,
    setCurrentPage: (page: Pages) => void
}

const Menu = ({ isPlay, quit, volume, onVolumeChange, setCurrentPage }: Props) => {

    const [ open, setOpen ] = useState(false);

    const { t } = useTranslation();

    const setLang = useCallback((lang: string) => {
        i18n.changeLanguage(lang);
    }, [])

    return (
        <div className="Menu cursor--noaction">
            <div className={classnames("Menu__inner", {'Menu__inner--open': open})}>
                <div className="Menu__inner__links">
                    <button className="Menu__inner__links__link cursor--follow-h" onClick={() => setOpen(false)}>{ t("resume") }</button>
                    { isPlay && (
                        <button className="Menu__inner__links__link cursor--follow-h" onClick={() => {
                            setOpen(false);
                            quit();
                        }}>{t('leave')}</button>
                    )}
                    <button className="Menu__inner__links__link cursor--follow-h" onClick={() => setCurrentPage('oeuvres')}>{t('oeuvres')}</button>
                    <button className="Menu__inner__links__link cursor--follow-h" onClick={() => setCurrentPage('credits')}>{t('credits')}</button>
                </div>
                <div className="Menu__inner__audio">
                    <Icon icon="audio" />
                    <input className="Menu__inner__audio__range" value={volume} type="range" id="points" name="points" min="0" max="100" onChange={onVolumeChange}></input>
                </div>
                <div className="Menu__inner__langs">
                    <button className="Menu__inner__langs__lang" onClick={() => setLang('fr')}>FR</button>
                    <span className="Menu__inner__langs__split"></span>
                    <button className="Menu__inner__langs__lang" onClick={() => setLang('en')}>EN</button>
                </div>
            </div>
            <div className="Menu__header">
                <div className="Menu__header__logo">
                    <h1 className="Menu__header__logo__title">L'évadé</h1>
                    <p className="Menu__header__logo__subtitle">{ t('interactexperience') }</p>
                </div>
                <button className="Menu__header__toggle cursor--follow-h" onClick={() => setOpen(!open)}>
                    <MenuDecoration type="left" />
                    <div className="Menu__header__toggle__text">
                        Menu
                    </div>
                    <MenuDecoration type="right" />
                </button>
            </div>
        </div>
    )
}

export default Menu;