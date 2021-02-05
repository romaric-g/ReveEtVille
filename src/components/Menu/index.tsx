import { render, h } from 'preact';
import { useState } from 'preact/hooks';
import classnames from 'classnames';
import MenuDecoration from './MenuDecoration';
import './index.scss';

interface Props {
    isPlay: boolean,
    quit: () => void
}

const Menu = ({ isPlay, quit }: Props) => {

    const [ open, setOpen ] = useState(false);

    return (
        <div className="Menu cursor--noaction">
            <div className={classnames("Menu__inner", {'Menu__inner--open': open})}>
                <div className="Menu__inner__links">
                    <button className="Menu__inner__links__link cursor--follow-h" onClick={() => setOpen(false)}>Reprendre</button>
                    { isPlay && (
                        <button className="Menu__inner__links__link cursor--follow-h" onClick={() => {
                            setOpen(false);
                            quit();
                        }}>Quitter</button>
                    )}
                    <button className="Menu__inner__links__link cursor--follow-h">Peintures</button>
                    <button className="Menu__inner__links__link cursor--follow-h">Crédit</button>
                </div>
            </div>
            <div className="Menu__header">
                <div className="Menu__header__logo">
                    <h1 className="Menu__header__logo__title">L'évadé</h1>
                    <p className="Menu__header__logo__subtitle">Une expérience interactive</p>
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