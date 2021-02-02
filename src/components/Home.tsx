import { render, h } from 'preact';
import homeImage from './../assets/le musée dessin.png';
import './../scss/home.scss';

interface Props {
    start: () => void
}

const wrapChildren = [];

for (let index = 0; index < 300; index++) {
    wrapChildren.push(<div className="c"></div>);
}

const Home = ({ start } : Props) => (
    <div className="HomeSection">
        <div className="HomeSection__particulesBox">
            <div className="wrap">
                { wrapChildren }
            </div>
        </div>
        <p className="HomeSection__title">L’évadé</p>
        <img className="HomeSection__image" src={homeImage} alt="" />
        <button className="HomeSection__button" onClick={start}>Commencer l'experience</button>
    </div>
);

export default Home;