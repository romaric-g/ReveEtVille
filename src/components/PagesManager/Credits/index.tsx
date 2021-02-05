import { render, h } from 'preact';
import './index.scss';

const Credits = () => (
    <div className="Credits">
        <section>
            <div class="titre blanc">
                <strong><p>Créateurs</p></strong>
            </div>
            <div>
                
                <div class="ligne">
                <p class="createurs blanc">Julie Joaquim - </p>
                <p class="createurs rouge"> script - traduction - développement</p>
                </div>

                <div class="ligne">
                <p class="createurs blanc">Eva Van Der Erve -</p>
                <p class="createurs rouge"> script - traduction</p>
                </div>

                <div class="ligne">
                <p class="createurs blanc">Malvina Brauge -</p>
                <p class="createurs rouge"> script - traduction - design graphique</p>
                </div>

                <div class="ligne">
                <p class="createurs blanc">Maxime Lauer -</p>
                <p class="createurs rouge"> design graphique - animation</p>
                </div>

                <div class="ligne">
                <p class="createurs blanc">Romaric Gauzi -</p>
                <p class="createurs rouge"> développement</p>
                </div>

                <div class="ligne">
                <p class="createurs blanc">Lucie Canton -</p>
                <p class="createurs rouge"> design graphique</p>
                </div>
            </div>

        </section>

        <section>
            <div class="titre blanc">
                <strong><p>Remerciements</p></strong>
            </div>
            <div class="contenu">
                <p class="createurs blanc">Musée des Beaux-Arts de Bordeaux</p>
                <p class="createurs blanc">Alexis Benoit</p>
                <p class="createurs blanc">Bastien De l’Hermitte</p>
                <p class="createurs blanc">Benjamin Hoguet</p>
                <p class="createurs blanc">Thibaut Charron</p>
                <p class="createurs blanc">Oscar Motta</p>
            </div>
        </section>
    </div>
)

export default Credits;