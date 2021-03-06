import { render, h } from 'preact';
import { useEffect, useMemo, useRef, useState } from 'preact/hooks';
import { useTranslation } from 'react-i18next';
import classnames from 'classnames';

import './index.scss';

import { BackgroundInfo, StepAction, StepInfo, SPEARKER } from  '../../App';
import Background from '../Background';

import suspens from './../../assets/audio/suspens.mp3'
import ambiance_1 from './../../assets/audio/ambiance_1.mp3';
import ambiance_2 from './../../assets/audio/ambiance_2.mp3';
import ambiance_3 from './../../assets/audio/ambiance_3.mp3';
import BackgroundVideo from '../BackgroundVideo';

interface Props {
    stepInfo: StepInfo,
    next: (action: StepAction) => void,
    backgrounds: {[key: string]: BackgroundInfo},
    volume: number,
    choiseShowed: string[]
}

const sounds = {
    suspens: suspens,
    ambiance_1: ambiance_1,
    ambiance_2: ambiance_2,
    ambiance_3: ambiance_3
}

const Step = (props: Props) => {
    const {
        stepInfo,
        next,
        backgrounds,
        volume,
        choiseShowed
    } = props;

    const { t } = useTranslation();

    const [ audio, ] = useState(new Audio(null))
    const currentAudio  = useRef(null)

    useEffect(() => {
        audio.loop = true;
        if (stepInfo.audio !== currentAudio.current) {
            if(!stepInfo.audio) {
                audio.pause();
                audio.currentTime = 0;  
            } else {
                audio.src = sounds[stepInfo.audio]
                audio.play();
            }
        }
        currentAudio.current = stepInfo.audio;
    }, [stepInfo, audio]);

    useEffect(() => {
        audio.volume = (0.2 * (volume / 50.0))
    }, [audio, volume])

    useEffect(() => {
        return () => {
            audio.pause();
            audio.currentTime = 0;  
        }
    }, [])

    if (stepInfo) {
        return (
            <div className="Step">
                { !backgrounds[stepInfo.background].video ? (
                    <Background 
                        background={backgrounds[stepInfo.background].image}
                        fit={stepInfo.background === '0'}
                    />
                ) : (
                    <BackgroundVideo video={backgrounds[stepInfo.background].video}/>
                )}
                
                <div className="Step__container">
                    { stepInfo.type === 'dialog' && (
                        <div className={classnames("Step__dialog", {
                            "Step__dialog--left": stepInfo.dialog.speaker === SPEARKER.YOU,
                            "Step__dialog--right": stepInfo.dialog.speaker !== SPEARKER.YOU,
                        })}>
                            <p className="Step__dialog__speaker">{t(stepInfo.dialog.speaker)}</p>
                            <p className="Step__dialog__text">{t(stepInfo.dialog.text)}</p>
                        </div>
                    ) }
                    { stepInfo.type === 'choose' && (
                        <div className="Step__chooses">
                            {
                                stepInfo.choose.map((choose, index) => (
                                    <button className={classnames("Step__chooses__option", "cursor--follow-h", {
                                        "Step__chooses__option--hidden": choiseShowed.includes(choose.goTostep)
                                    })} onClick={() => next({type: 'choose', choose: index})}>{ t(choose.text) }</button>
                                ))
                            }
                        </div>
                    )}
                    { stepInfo.type === 'interact' && (
                      <p className="Step__interactText cursor--follow-h">
                          { t(stepInfo.interact.text) }
                      </p>
                    )}
                </div>       
            </div>
        )
    } else {
        return <div></div>
    }

}

export default Step;