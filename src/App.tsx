import { render, h } from 'preact';
import { useCallback, useMemo, useState } from 'preact/hooks';
import './scss/App.scss';
import Home from './components/Home';
import Step from './components/Step';
import Cursor from './components/Cursor'

export interface StepInfo {
    type: 'dialog' | 'choose' | 'interact', 
    background: string,
    dialog?: Dialog,
    choose?: Choose[],
    interact?: Interact,
    goTostep?: string
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
    TABLEAU1: 'Brigitte'
}

const App = () => {

    const [ currentStepID, setCurrentStepID ] = useState<string | null>(null);

    const steps: {[key: string]: StepInfo } = {
        '1': {
            type: 'dialog', background: '0', dialog: {
                text: 'Aucun souvenir, j’ouvre un œil puis deux, ma tête me fait mal.',
                speaker: SPEARKER.YOU
            }
        },
        '2': {
            type: 'dialog', background: '0', dialog: {
                text: 'Qu’est-ce que je fais là ?',
                speaker: SPEARKER.YOU
            }
        },
        '3': {
            type: 'dialog', background: '0', dialog: {
                text: 'Tout est sombre autour de moi, la pièce à l’air immense.',
                speaker: SPEARKER.YOU
            }
        },
        '4': {
            type: 'dialog', background: '0', dialog: {
                text: 'Tout m’a l’air familier mais je ne suis jamais venu ici.',
                speaker: SPEARKER.YOU
            }
        },
        '5': {
            type: 'dialog', background: '0', dialog: {
                text: 'Je crois que je suis dans un musée.',
                speaker: SPEARKER.YOU
            }
        },
        '6': {
            type: 'dialog', background: '1', dialog: {
                text: 'Mais qu’est-il arrivé à ce tableau ?',
                speaker: SPEARKER.YOU
            }
        },
        '7': {
            type: 'interact', background: '2', interact: { text: 'Parler à cette oeuvre' }
        },
        '8': {
            type: 'dialog', background: '3', dialog: {
                text: 'Bonsoir, vous m’entendez ?',
                speaker: SPEARKER.YOU
            }
        },
        '9': {
            type: 'dialog', background: '3', dialog: {
                text: 'Bien sur que nous t’entendons, tous les tableaux ont des oreilles.',
                speaker: SPEARKER.YOU
            }
        },
        '10': {
            type: 'dialog', background: '3', dialog: {
                text: 'Pouquoi la femme sur le tableau là-bas ne me répond pas dans ce cas ?',
                speaker: SPEARKER.YOU
            }
        },
        '11': {
            type: 'dialog', background: '3', dialog: {
                text: 'Son tableau est déchiré, vous ne pouvez communiquer ensemble, le temps est figé pour elle.',
                speaker: SPEARKER.YOU
            }
        },
        '12': {
            type: 'choose', background: '3', choose: [
                {
                    text: 'Depuis quand le tableau est déchiré ?',
                    goTostep: 'a1'
                },
                {
                    text: 'Vous savez pourquoi je suis ici ? Je ne sais pas d\'où je viens.',
                    goTostep: 'b1'
                },
                {
                    text: 'Mais qui êtes vous ?',
                    goTostep: 'c1'
                },
            ]
        },
        // RÉPONSE 1 (Dialogue qui fait avancer l’intrigue)
        'a1': {
            type: 'dialog', background: '4', dialog: {
                text: 'Le tableau est déchiré depuis peu, encore hier soir il était entier.',
                speaker: SPEARKER.YOU
            }
        },
        'a2': {
            type: 'dialog', background: '4', dialog: {
                text: 'Déchiré ? mais cette femme... elle semble souffrir...',
                speaker: SPEARKER.YOU
            }, 
            goTostep: '12'
        },
        // RÉPONSE 2
        'b1': {
            type: 'dialog', background: '4', dialog: {
                text: 'A vrai dire nous ne savons pas ce que vous faites ici, le musée est fermé.',
                speaker: SPEARKER.YOU
            }, 
            goTostep: '12'
        },
        // RÉPONSE 3
        'c1': {
            type: 'dialog', background: '4', dialog: {
                text: 'Qui sommes nous ? Seulement deux êtres, épris l’un de l’autre.',
                speaker: SPEARKER.TABLEAU1
            }, 
        },
        'c2': {
            type: 'dialog', background: '4', dialog: {
                text: 'Nous sommes dans ce tableau depuis 1878, c’est Henri GERVEX qui nous a imaginé et peint',
                speaker: SPEARKER.TABLEAU1
            }, 
            goTostep: '12'
        }
    }
    
    const backgrounds = useMemo(() => ({
        '0': require('./assets/plates/plate0.png'),
        '1': require('./assets/plates/plate1.png'),
        '2': require('./assets/plates/plate2.png'), 
        '3': require('./assets/plates/plate3.png'), 
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

    return (
        <div class="App">
            <Cursor />
            { currentStepID === null ? <Home start={() => next({ type: 'start'})} /> : <Step stepInfo={steps[currentStepID]} next={next} backgrounds={backgrounds} /> }
        </div>
    )
}

const appElement = document.getElementById('app');

render(<App />, appElement);