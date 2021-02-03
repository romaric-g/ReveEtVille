import { render, h } from 'preact';
import './../scss/step.scss';

import { StepAction, StepInfo } from  './../App';
import { useMemo } from 'preact/hooks';
import Background from './Background';

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
                <Background background={backgrounds[stepInfo.background]}/>
                <div className="Step__container">
                    { stepInfo.type === 'dialog' && (
                        <div className="Step__dialog">
                            <p className="Step__dialog__speaker">{stepInfo.dialog.speaker}</p>
                            <p className="Step__dialog__text">{stepInfo.dialog.text}</p>
                            <button onClick={() => next({type: 'next'})}>Suivant</button>
                        </div>
                    ) }
                    { stepInfo.type === 'choose' && (
                        <div className="Step__chooses">
                            {
                                stepInfo.choose.map((choose, index) => (
                                    <button className="Step__chooses__option cursor--hover cursor--follow-h" onClick={() => next({type: 'choose', choose: index})}>{ choose.text }</button>
                                ))
                            }
                        </div>
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