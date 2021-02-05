import { render, h } from 'preact';
import Particles from "preact-particles";
import homeImage from './../../assets/le musée dessin.png';
import './index.scss';

interface Props {
    start: () => void
}

const wrapChildren = [];

for (let index = 0; index < 300; index++) {
    wrapChildren.push(<div className="c"></div>);
}

const Home = ({ start } : Props) => (
    <div className="HomeSection">
        <Particles 
            id="tsparticles"
            width="1400px"
            height="900px"
            params={{
                "particles": {
                  "number": {
                    "value": 71,
                    "density": {
                      "enable": true,
                      "value_area": 800
                    }
                  },
                  "color": {
                    "value": "#e1d3d3"
                  },
                  "shape": {
                    "type": "circle",
                    "stroke": {
                      "width": 0,
                      "color": "#000000"
                    },
                    "polygon": {
                      "nb_sides": 5
                    },
                    "image": {
                      "src": "img/github.svg",
                      "width": 100,
                      "height": 100
                    }
                  },
                  "opacity": {
                    "value": 1,
                    "random": true,
                    "anim": {
                      "enable": true,
                      "speed": 1,
                      "opacity_min": 0,
                      "sync": false
                    }
                  },
                  "size": {
                    "value": 1.5,
                    "random": false,
                    "anim": {
                      "enable": false,
                      "speed": 4,
                      "size_min": 0.3,
                      "sync": false
                    }
                  },
                  "line_linked": {
                    "enable": false,
                    "distance": 150,
                    "color": "#ffffff",
                    "opacity": 0.4,
                    "width": 1
                  },
                  "move": {
                    "enable": true,
                    "speed": 3.2048200493542316,
                    "direction": "right",
                    "random": true,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                      "enable": false,
                      "rotateX": 3445.1815530557988,
                      "rotateY": 3445.1815530557988
                    }
                  }
                },
                "interactivity": {
                  "detect_on": "canvas",
                  "events": {
                    "onhover": {
                      "enable": true,
                      "mode": "bubble"
                    },
                    "onclick": {
                      "enable": false,
                      "mode": "bubble"
                    },
                    "resize": true
                  },
                  "modes": {
                    "grab": {
                      "distance": 400,
                      "line_linked": {
                        "opacity": 1
                      }
                    },
                    "bubble": {
                      "distance": 250,
                      "size": 0,
                      "duration": 2,
                      "opacity": 0,
                      "speed": 3
                    },
                    "repulse": {
                      "distance": 400,
                      "duration": 0.4
                    },
                    "push": {
                      "particles_nb": 4
                    },
                    "remove": {
                      "particles_nb": 2
                    }
                  }
                },
                "retina_detect": true
              }} 
        />
        <img className="HomeSection__image" src={homeImage} alt="" />
        <div className="HomeSection__actions">
            <button className="HomeSection__actions__button cursor--follow-h" onClick={start}>Commencer l'experience</button>
        </div>
    </div>
);

export default Home;