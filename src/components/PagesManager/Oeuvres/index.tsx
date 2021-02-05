import { render, h } from 'preact';
import './index.scss';

import oeuvre1 from './../../../assets/oeuvres/oeuvre1.jpg';
import oeuvre2 from './../../../assets/oeuvres/oeuvre2.jpg';
import oeuvre3 from './../../../assets/oeuvres/oeuvre3.jpg';
import oeuvre4 from './../../../assets/oeuvres/oeuvre4.jpg';

const Oeuvres = () => (
    <div className="Oeuvres">
        <div class="ligne">
            <img src={oeuvre1} />
            <p>Tiziano Vecellio dit TITIEN , "Tarquin et Lucrèce"</p>
        </div>
        <div class="ligne">
            <img src={oeuvre2} />
            <p>Henri GERVEX, “Rolla”</p>
        </div>
        <div class="ligne">
            <img src={oeuvre3} />
            <p>Johann ZOFFANY, "Vénus sur les eaux"</p>
        </div>
        <div class="ligne">
            <img src={oeuvre4} />
            <p>Lavinia FONTANA, "Portrait d’homme assis feuilletant un livre, dit Portrait du sénateur Orsini"</p>
        </div>
    </div>
)

export default Oeuvres;