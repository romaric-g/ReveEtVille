import { render, h } from 'preact';
import './../scss/step.scss';

import { StepAction, StepInfo } from  './../App';
import { useMemo } from 'preact/hooks';

interface Props {
    stepInfo: StepInfo,
    next: (action: StepAction) => void,
    backgrounds: {[key: string]: any}
}

const Step = (props: Props) => {
    const {
        stepInfo,
        next,
        backgrounds
    } = props;

    if (stepInfo) {
        return (
            <div className="Step">
                <div className="Step__background">
                    <img className="Step__background__image" src={backgrounds[stepInfo.background]} alt=""/>
                </div>
                <div className="Step__container">
                    { stepInfo.type === 'dialog' && (
                        <div className="Step__dialog">
                            <p className="Step__dialog__speaker">{stepInfo.dialog.speaker}</p>
                            <p className="Step__dialog__text">{stepInfo.dialog.text}</p>
                            <button onClick={() => next({type: 'next'})}>Suivant</button>
                        </div>
                    ) }
                    { stepInfo.type === 'choose' && (
                        stepInfo.choose.map((choose, index) => (
                            <div className="Step__choose">
                                <p>{ choose.text }</p>
                                <p>Next: { choose.goTostep }</p>
                                <button onClick={() => next({type: 'choose', choose: index})}>Choose it</button>
                            </div>
                        ))
                    )}
                    { stepInfo.type === 'interact' && (
                        <button onClick={() => next({type: 'interact'})}>{stepInfo.interact.text}</button>
                    )}
                </div>       
            </div>
        )
    } else {
        return <div></div>
    }

}

export default Step;