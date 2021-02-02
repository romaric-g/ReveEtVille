import { render, h } from 'preact';
import homeImage from './../assets/le musée dessin.png';

const wrapChildren = [];

for (let index = 0; index < 300; index++) {
    wrapChildren.push(<div class="c"></div>);
}

const Home = () => (
    <div class="HomeSection">
        <div class="HomeSection__particulesBox">
            <div class="wrap">
                { wrapChildren }
            </div>
        </div>
        <p class="HomeSection__title">L’évadé</p>
        <img class="HomeSection__image" src={homeImage} alt="" />
        <button class="HomeSection__button">Commencer l'experience</button>
    </div>
);

export default Home;