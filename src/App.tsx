import { render, h } from 'preact';
import { useCallback, useMemo, useState } from 'preact/hooks';
import './scss/app.scss';
import Home from './components/Home';
import Step from './components/Step';
import Cursor, { CURSOR_SIZE } from './components/Cursor'
import { Icons } from './components/Icon';
import Menu from './components/Menu';
import './scripts/i18n';

export interface StepInfo {
    type: 'dialog' | 'choose' | 'interact', 
    background: string,
    audio?: string,
    dialog?: Dialog,
    choose?: Choose[],
    interact?: Interact,
    goTostep?: string
}

export interface BackgroundInfo {
    image?: any,
    video?: string
}
export interface Dialog {
    text: string,
    speaker: string,
}
export interface Choose {
    text: string,
    goTostep: string,
}

export interface Interact {
    text: string
}

export interface StepAction {
    type: 'start' | 'next' | 'choose' | 'interact',
    choose?: number
}

const SPEARKER = {
    YOU: 'Vous',
    TABLEAU1_1: 'Marie',
    TABLEAU1_2: 'Jacques Rolla',
    TABLEAU2_1: 'Glaucos',
    TABLEAU2_2: 'Une nymphe',
    TABLEAU2_3: 'Triton',
    TABLEAU2_4: 'Vénus',
    TABLEAU3: 'Voix inconnue au loin',
    TABLEAU3_1:'Sénateur Orsini'
}

const App = () => {

    const [ currentStepID, setCurrentStepID ] = useState<string | null>(null);

    const steps: {[key: string]: StepInfo } = {
        '1': {
            type: 'dialog', background: '0', dialog: {
                text: 'intro1',
                speaker: SPEARKER.YOU
            }
        },
        '2': {
            type: 'dialog', background: '0', dialog: {
                text: 'intro2',
                speaker: SPEARKER.YOU
            }
        },
        '3': {
            type: 'dialog', background: '0', dialog: {
                text: 'intro3',
                speaker: SPEARKER.YOU
            }
        },
        '4': {
            type: 'dialog', background: '0', dialog: {
                text: 'intro4',
                speaker: SPEARKER.YOU
            }
        },
        '5': {
            type: 'dialog', background: '0', dialog: {
                text: 'intro5',
                speaker: SPEARKER.YOU
            }
        },
        '6': {
            type: 'dialog', background: '0', dialog: {
                text: 'intro6',
                speaker: SPEARKER.YOU
            }
        },
        '7': {
            type: 'interact', background: '0', interact: { text: 't1' }
        },
        '8': {
            type: 'interact', background: '1', interact: { text: 't2' }
        },
        '9': {
            type: 'dialog', background: '3', dialog: {
                text: 'o1moi1',
                speaker: SPEARKER.YOU
            },
            audio: 'ambiance_1'
        },
        '10': {
            type: 'dialog', background: '3', dialog: {
                text: 'o1o1',
                speaker: SPEARKER.TABLEAU1_1
            },
            audio: 'ambiance_1'
        },
        '11': {
            type: 'dialog', background: '3', dialog: {
                text: 'o1moi2',
                speaker: SPEARKER.YOU
            },
            audio: 'ambiance_1'
        },
        '12': {
            type: 'dialog', background: '3', dialog: {
                text: 'o1o2',
                speaker: SPEARKER.TABLEAU1_1
            },
            audio: 'ambiance_1'
        },
        '13': {
            type: 'choose', background: '3', choose: [
                {
                    text: 'o1c1moi3',
                    goTostep: 'a1'
                },
                {
                    text: 'o1c2moi3',
                    goTostep: 'b1'
                },
                {
                    text: 'o1c3moi3',
                    goTostep: 'c1'
                },
            ], 
            audio: 'ambiance_1'

        },
        // RÉPONSE 1
        'a1': {
            type: 'dialog', background: '3', dialog: {
                text: 'o1c1moi3',
                speaker: SPEARKER.YOU
            },
            audio: 'ambiance_1'
        },
        'a2': {
            type: 'dialog', background: '3', dialog: {
                text: 'o1c1o3',
                speaker: SPEARKER.TABLEAU1_2
            },
            audio: 'ambiance_1'
        },
        'a3': {
            type: 'dialog', background: '3', dialog: {
                text: 'o1c1moi3.2',
                speaker: SPEARKER.YOU
            },
            audio: 'ambiance_1'
        },

        'a4': {
            type: 'dialog', background: '3', dialog: {
                text: 'o1c1o3.2',
                speaker: SPEARKER.TABLEAU1_2
            },
            goTostep: '13',
            audio: 'ambiance_1'
        },

        // RÉPONSE 2
        'b1': {
            type: 'dialog', background: '3', dialog: {
                text: 'o1c2moi3',
                speaker: SPEARKER.YOU
            },
            audio: 'ambiance_1'
        },

        'b2': {
            type: 'dialog', background: '3', dialog: {
                text: 'o1c2o3',
                speaker: SPEARKER.TABLEAU1_1
            },
            audio: 'ambiance_1'
        },

        'b3': {
            type: 'dialog', background: '3', dialog: {
                text: 'o1c2moi3.2',
                speaker: SPEARKER.YOU
            },
            audio: 'ambiance_1'
        },

        'b4': {
            type: 'dialog', background: '3', dialog: {
                text: 'o1c2o3.2',
                speaker: SPEARKER.TABLEAU1_2
            },
            audio: 'ambiance_1'
        },

        'b5': {
            type: 'dialog', background: '3', dialog: {
                text: 'o1c2moi3.3',
                speaker: SPEARKER.YOU
            },
            audio: 'ambiance_1'
        },

        'b6': {
            type: 'dialog', background: '3', dialog: {
                text: 'o1c2o3.3',
                speaker: SPEARKER.TABLEAU1_1
            },
            audio: 'ambiance_1'
        },

        'b7': {
            type: 'dialog', background: '3', dialog: {
                text: 'o1c2moi3.4',
                speaker: SPEARKER.YOU
            },
            audio: 'ambiance_1'
        },

        'b8': {
            type: 'dialog', background: '3', dialog: {
                text: 'o1c2o3.4',
                speaker: SPEARKER.TABLEAU1_1
            }, 
            goTostep: '14',
            audio: 'ambiance_1'
        },

       
        // RÉPONSE 3
        'c1': {
            type: 'dialog', background: '3', dialog: {
                text: 'o1c3moi3',
                speaker: SPEARKER.YOU
            },
            audio: 'ambiance_1'
        },
        'c2': {
            type: 'dialog', background: '3', dialog: {
                text: 'o1c3o3',
                speaker: SPEARKER.TABLEAU1_2
            },
            audio: 'ambiance_1' 
        },
        'c3': {
            type: 'dialog', background: '3', dialog: {
                text: 'o1c3o3.2',
                speaker: SPEARKER.TABLEAU1_2
            }, 
            goTostep: '13',
            audio: 'ambiance_1'
        },

        '14': {
            type: 'dialog', background: '3', dialog: {
                text: 'o1o4',
                speaker: SPEARKER.TABLEAU1_1
            },
            audio: 'ambiance_1'
        },
        '15': {
            type: 'dialog', background: '3', dialog: {
                text: 'o1moi4',
                speaker: SPEARKER.YOU
            },
            audio: 'ambiance_1'
        },
        '16': {
            type: 'dialog', background: '3', dialog: {
                text: 'o1o5',
                speaker: SPEARKER.TABLEAU1_1
            },
            audio: 'ambiance_1'
        },
        '17': {
            type: 'dialog', background: '3', dialog: {
                text: 'o1moi5',
                speaker: SPEARKER.YOU
            },
            audio: 'ambiance_1'
        },
        '18': {
            type: 'interact', background: '3', interact: { text: 't3' }
        },

        '19': {
            type: 'interact', background: '1', interact: { text: 't4' }
        },

        '20': {
            type: 'dialog', background: '2', dialog: {
                text: 'o2moi1',
                speaker: SPEARKER.YOU
            },
            audio: 'ambiance_2'
        },
        '21': {
            type: 'dialog', background: '2', dialog: {
                text: 'o2o1',
                speaker: SPEARKER.TABLEAU2_1
            },
            audio: 'ambiance_2'
        },
        '22': {
            type: 'dialog', background: '2', dialog: {
                text: 'o2moi2',
                speaker: SPEARKER.YOU
            },
            audio: 'ambiance_2'
        },
        '23': {
            type: 'dialog', background: '2', dialog: {
                text: 'o2o2',
                speaker: SPEARKER.TABLEAU2_2
            },
            audio: 'ambiance_2'
        },
        '24': {
            type: 'dialog', background: '2', dialog: {
                text: 'o2o3',
                speaker: SPEARKER.TABLEAU2_3
            },
            audio: 'ambiance_2'
        },
        '25': {
            type: 'dialog', background: '2', dialog: {
                text: 'o2o4',
                speaker: SPEARKER.TABLEAU2_1
            },
            audio: 'ambiance_2'
        },
        '26': {
            type: 'dialog', background: '2', dialog: {
                text: 'o2o5',
                speaker: SPEARKER.TABLEAU2_4
            },
            audio: 'ambiance_2'
        },
        '27': {
            type: 'dialog', background: '2', dialog: {
                text: 'o2o6',
                speaker: SPEARKER.TABLEAU2_2
            },
            audio: 'ambiance_2'
        },
        '28': {
            type: 'dialog', background: '2', dialog: {
                text: 'o2o7',
                speaker: SPEARKER.TABLEAU2_4
            },
            audio: 'ambiance_2'
        },
        '29': {
            type: 'dialog', background: '2', dialog: {
                text: 'o2moi3',
                speaker: SPEARKER.YOU
            },
            audio: 'ambiance_2'
        },
        '30': {
            type: 'choose', background: '2', choose: [
                {
                    text: 'o2c1moi4',
                    goTostep: 'd1'
                },
                {
                    text: 'o2c2moi4',
                    goTostep: 'e1'
                },
                {
                    text: 'o2c3moi4',
                    goTostep: 'f1'
                },
            ],
            audio: 'ambiance_2'
        },

        // RÉPONSE 1
        'd1': {
            type: 'dialog', background: '2', dialog: {
                text: 'o2c1moi4',
                speaker: SPEARKER.YOU
            },
            audio: 'ambiance_2'
        },
        'd2': {
            type: 'dialog', background: '2', dialog: {
                text: 'o2c1o8',
                speaker: SPEARKER.TABLEAU2_2
            },
            audio: 'ambiance_2'
        },
        'd3': {
            type: 'dialog', background: '2', dialog: {
                text: 'o2c1o8.2',
                speaker: SPEARKER.TABLEAU2_3
            },
            audio: 'ambiance_2'
        },
        'd4': {
            type: 'dialog', background: '2', dialog: {
                text: 'o2c1o8.3',
                speaker: SPEARKER.TABLEAU2_1
            },
            audio: 'ambiance_2'
        },
        'd5': {
            type: 'dialog', background: '2', dialog: {
                text: 'o2c1o8.4',
                speaker: SPEARKER.TABLEAU2_3
            },
            audio: 'ambiance_2'
        },
        'd6': {
            type: 'dialog', background: '2', dialog: {
                text: 'o2c1o8.5',
                speaker: SPEARKER.TABLEAU2_2
            },
            audio: 'ambiance_2'
        },

        'd7': {
            type: 'dialog', background: '2', dialog: {
                text: 'o2c1moi4.2',
                speaker: SPEARKER.YOU
            },
            audio: 'ambiance_2'
        },

        'd8': {
            type: 'dialog', background: '2', dialog: {
                text: 'o2c1o8.6',
                speaker: SPEARKER.TABLEAU2_4
            },
            audio: 'ambiance_2'
        },
        'd9': {
            type: 'dialog', background: '2', dialog: {
                text: 'o2c1o8.7',
                speaker: SPEARKER.TABLEAU2_1
            },
            audio: 'ambiance_2'
        },
        'd10': {
            type: 'dialog', background: '2', dialog: {
                text: 'o2c1moi4.3',
                speaker: SPEARKER.YOU
            },
            audio: 'ambiance_2'
        },
        'd11': {
            type: 'dialog', background: '2', dialog: {
                text: 'o2c1o8.8',
                speaker: SPEARKER.TABLEAU2_1
            },
            goTostep: '31',
            audio:'ambiance_2'
        },

        // RÉPONSE 2
        'e1': {
            type: 'dialog', background: '2', dialog: {
                text: 'o2c2moi4',
                speaker: SPEARKER.YOU
            },
            audio: 'ambiance_2'
        },
        'e2': {
            type: 'dialog', background: '2', dialog: {
                text: 'o2c2o8',
                speaker: SPEARKER.TABLEAU2_1
            },
            audio: 'ambiance_2'
        },
        'e3': {
            type: 'dialog', background: '2', dialog: {
                text: 'o2c2moi4.2',
                speaker: SPEARKER.YOU
            },
            audio: 'ambiance_2'
        },
        'e4': {
            type: 'dialog', background: '2', dialog: {
                text: 'o2c2o8.2',
                speaker: SPEARKER.TABLEAU2_4
            },
            audio: 'ambiance_2'
        },
        'e5': {
            type: 'dialog', background: '2', dialog: {
                text: 'o2c2o8.3',
                speaker: SPEARKER.TABLEAU2_2
            },
            goTostep: '30',
            audio: 'ambiance_2'
        },

        // RÉPONSE 3
        'f1': {
            type: 'dialog', background: '2', dialog: {
                text: 'o2c3moi4',
                speaker: SPEARKER.YOU
            },
            audio: 'ambiance_2'
        },
        'f2': {
            type: 'dialog', background: '2', dialog: {
                text: 'o2c3o8',
                speaker: SPEARKER.TABLEAU2_2
            },
            audio: 'ambiance_2'
        },
        'f4': {
            type: 'dialog', background: '2', dialog: {
                text: 'o2c3o8.2',
                speaker: SPEARKER.TABLEAU2_1
            },
            audio: 'ambiance_2'
        },
        'f5': {
            type: 'dialog', background: '2', dialog: {
                text: 'o2c3o8.3',
                speaker: SPEARKER.TABLEAU2_4
            },
            audio: 'ambiance_2'
        },

        'f6': {
            type: 'dialog', background: '2', dialog: {
                text: 'o2c3moi4.2',
                speaker: SPEARKER.YOU
            },
            audio: 'ambiance_2'
        },
        'f7': {
            type: 'dialog', background: '2', dialog: {
                text: 'o2c3o8.4',
                speaker: SPEARKER.TABLEAU2_4
            },
            goTostep: '30',
            audio: 'ambiance_2'
        },

        '31': {
            type: 'dialog', background: '2', dialog: {
                text: 'o2moi5',
                speaker: SPEARKER.YOU
            },
            audio: 'ambiance_2'
        },
        '32': {
            type: 'dialog', background: '2', dialog: {
                text: 'o209',
                speaker: SPEARKER.TABLEAU3
            }
        },
        '33': {
            type: 'interact', background: '2', interact: { text: 't6' }
        },

        '34': {
            type: 'interact', background: '1', interact: { text: 't7' }
        },
        '35': {
            type: 'dialog', background: '4', dialog: {
                text: 'o3o1',
                speaker: SPEARKER.TABLEAU3_1
            },
            audio: 'ambiance_3'
        },
        '36': {
            type: 'dialog', background: '4', dialog: {
                text: 'o3moi1',
                speaker: SPEARKER.YOU
            },
            audio: 'ambiance_3'
        },
        '37': {
            type: 'dialog', background: '4', dialog: {
                text: 'o3o2',
                speaker: SPEARKER.TABLEAU3_1
            },
            audio: 'ambiance_3'
        },
        '39': {
            type: 'dialog', background: '4', dialog: {
                text: 'o3moi2',
                speaker: SPEARKER.YOU
            },
            audio: 'ambiance_3'
        },
        '40': {
            type: 'dialog', background: '4', dialog: {
                text: 'o3o3',
                speaker: SPEARKER.TABLEAU3_1
            },
            audio: 'ambiance_3'
        },
        '41': {
            type: 'choose', background: '4', choose: [
                {
                    text: 'o3c1moi3',
                    goTostep: 'g1'
                },
                {
                    text: 'o3c2moi3',
                    goTostep: 'h1'
                },
            ],
            audio:'ambiance_3'
        },

         // RÉPONSE 1
         'g1': {
            type: 'dialog', background: '4', dialog: {
                text: 'o3c1moi3',
                speaker: SPEARKER.YOU
            },
            audio: 'ambiance_3'
        },
        'g2': {
            type: 'dialog', background: '4', dialog: {
                text: 'o3c1o4',
                speaker: SPEARKER.TABLEAU2_1
            },
            goTostep: '42',
            audio: 'ambiance_3'
        },

        // RÉPONSE 2
        'h1': {
            type: 'dialog', background: '4', dialog: {
                text: 'o3c2moi3',
                speaker: SPEARKER.YOU
            },
            audio: 'ambiance_3'
        },
        'h2': {
            type: 'dialog', background: '4', dialog: {
                text: 'o3c2o4',
                speaker: SPEARKER.TABLEAU2_1
            },
            goTostep: '41',
            audio: 'ambiance_3'
        },

        '42': {
            type: 'dialog', background: '4', dialog: {
                text: 'o3o5',
                speaker: SPEARKER.TABLEAU3_1
            },
            audio: 'ambiance_3'
        },
        '43': {
            type: 'dialog', background: '4', dialog: {
                text: 'o3moi4',
                speaker: SPEARKER.YOU
            },
            audio: 'ambiance_3'
        },
        '44': {
            type: 'dialog', background: '4', dialog: {
                text: 'o3o6',
                speaker: SPEARKER.TABLEAU3_1
            },
            audio: 'ambiance_3'
        },
        '45': {
            type: 'dialog', background: '4', dialog: {
                text: 'o3moi5',
                speaker: SPEARKER.YOU
            },
            audio: 'ambiance_3'
        },
        '46': {
            type: 'dialog', background: '4', dialog: {
                text: 'o3o7',
                speaker: SPEARKER.TABLEAU3_1
            },
            audio: 'ambiance_3'
        },
        '47': {
            type: 'dialog', background: '4', dialog: {
                text: 'o3moi6',
                speaker: SPEARKER.YOU
            },
            audio: 'ambiance_3'
        },
        '48': {
            type: 'dialog', background: '4', dialog: {
                text: 'o3o8',
                speaker: SPEARKER.TABLEAU3_1
            },
            audio: 'ambiance_3'
        },
        '49': {
            type: 'dialog', background: '4', dialog: {
                text: 'o3moi7',
                speaker: SPEARKER.YOU
            },
            audio: 'ambiance_3'
        },
        '50': {
            type: 'dialog', background: '5', dialog: {
                text: 'o3moi8',
                speaker: SPEARKER.YOU
            },
            audio: 'suspens'
        },
        '51': {
            type: 'dialog', background: '6', dialog: {
                text: 'o3moi9',
                speaker: SPEARKER.YOU
            },
            audio: 'suspens'
        },
        '52': {
            type: 'dialog', background: '7', dialog: {
                text: 'o3moi10',
                speaker: SPEARKER.YOU
            },
            audio: 'suspens'
        },
        '53': {
            type: 'choose', background: '5', choose: [
                {
                    text: 'c1n1',
                    goTostep: 'i1'
                },
                {
                    text: 'c2n1',
                    goTostep: 'j1'
                },
            ],
            audio:'suspens'
        },

         // FIN 1
         'i1': {
            type: 'dialog', background: '4', dialog: {
                text: 'c1n2',
                speaker: SPEARKER.YOU
            }
        },
        // FIN 2
        'j1': {
            type: 'dialog', background: '4', dialog: {
                text: 'c2n2',
                speaker: SPEARKER.YOU
            }
        },
    }
    
    const backgrounds: {[key: string]: BackgroundInfo} = useMemo(() => ({
        '0': {
            image: require('./assets/plates/plate0.png')
        },
        '1': {
            image: require('./assets/plates/plate1.png')
        },
        '2': {
            video: 'oeuvre2'
        },
        '3': {
            video: 'oeuvre1'
        }, 
        '4': {
            video: 'oeuvre3'
        },
        '5': {
            image: require('./assets/plates/prisedetête.png')
        }, 
        '6': {
            image: require('./assets/plates/têtegauche.png')
        },
        '7': {
            image: require('./assets/plates/têtedroite.png')
        }, 
    }), [])

    const currentStep = useMemo(() => steps[currentStepID], [currentStepID])

    const next = useCallback((action: StepAction) => {
        console.log(action)
        console.log(currentStep)
        if (!currentStep) {
            if (action.type === 'start') setCurrentStepID('1')
            return;
        }
        if (currentStep.type === 'choose' && action.type  === 'choose') {
            console.log(currentStep.choose[action.choose].goTostep)
            setCurrentStepID(currentStep.choose[action.choose].goTostep)
        } else if ( 
            (currentStep.type === 'dialog' && action.type === 'next') ||
            (currentStep.type === 'interact' && action.type === 'interact')
        ) {
            console.log('Next afet dialog')
            if (currentStep.goTostep) {
                console.log("goTostep")
                setCurrentStepID(currentStep.goTostep);
            } else {
                const keys = Object.keys(steps);
                const index = keys.indexOf(currentStepID);
                console.log("Ci: " + index)
                const nextStepIndex = index + 1;
                console.log("Ni: " + nextStepIndex)
                const nextStep = keys[nextStepIndex];
                if (nextStep) {
                    setCurrentStepID(nextStep)
                }
                
            }
        }
    }, [currentStep])

    const currentCursorAction = useMemo(() => {
        if (!currentStep) return null;
        if (currentStep.type === 'dialog') return {
            size: CURSOR_SIZE.FOCUS,
            icon: "next" as Icons,
            run: () => {
                console.log('run');
                next({type: 'next'})
            },
            delay: 500
        };
        if (currentStep.type === 'interact') return {
            size: CURSOR_SIZE.FOCUS,
            icon: "next" as Icons,
            run: () => {
                console.log('run');
                next({type: 'interact'})
            },
            delay: 0
        };
        return null;
    }, [currentStep])

    const quit = useCallback(() => {
        setCurrentStepID(null)
    }, [setCurrentStepID])

    console.log("CURRENT: ", currentCursorAction);

    return (
        <div className="App">
            <Menu 
                isPlay={currentStepID !== null}
                quit={quit}
            />
            <Cursor action={currentCursorAction} />
            { currentStepID === null ? <Home start={() => next({ type: 'start'})} /> : <Step stepInfo={steps[currentStepID]} next={next} backgrounds={backgrounds} /> }
        </div>
    )
}

const appElement = document.getElementById('app');

render(<App />, appElement);