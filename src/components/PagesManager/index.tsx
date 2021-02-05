import { render, h } from 'preact';
import Oeuvres from './Oeuvres';
import Credits from './Credits';
import { Pages } from '../../App';
import './index.scss';
import Icon from '../Icon';

interface Props {
    currentPage?: Pages,
    setCurrentPage: (page: Pages) => void
}

const PagesManager = ({ currentPage, setCurrentPage }: Props) => {

    return currentPage && (
        <div className="PagesManager">
            <div className="PagesManager__header">
                <div className="PagesManager__header__logo">
                    <h1 className="PagesManager__header__logo__title">L'évadé</h1>
                    <p className="PagesManager__header__logo__subtitle">Une expérience interactive</p>
                </div>
                <button className="PagesManager__header__close cursor--follow-h" onClick={() => setCurrentPage(null)}>
                    <Icon icon="close"/>
                    Retour
                </button>
            </div>
            <div className="PagesManager__content">
                { currentPage === 'credits' && <Credits /> }
                { currentPage === 'oeuvres' && <Oeuvres /> }
            </div>
        </div>
    )
}

export default PagesManager;