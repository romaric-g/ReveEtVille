import { render, h } from 'preact';
import { useState } from 'preact/hooks';
import classnames from 'classnames';
import MenuDecoration from './MenuDecoration';
import './index.scss';

const Menu = () => {

    const [ open, setOpen ] = useState(false);

    return (
        <div className="Menu">
            <div className={classnames("Menu__inner", {'Menu__inner--open': open})}>
                <div className="Menu__inner__links">
                    <p className="cursor--follow-h">Reprendre</p>
                    <p className="cursor--follow-h">Quitter</p>
                    <p className="cursor--follow-h">Crédit</p>
                </div>
            </div>
            <div className="Menu__header">
                <div className="Menu__header__audio">
                    
                </div>
                <div className="Menu__header__toggle cursor--follow-h" onClick={() => setOpen(!open)}>
                    <MenuDecoration type="left" />
                    <div className="Menu__header__toggle__text">
                        Menu
                    </div>
                    <MenuDecoration type="right" />
                </div>
            </div>
        </div>
    )
}

export default Menu;