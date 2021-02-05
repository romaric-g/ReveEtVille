import { render, h, JSX, FunctionalComponent } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import gsap from "gsap";
import './index.scss'

const Loading: FunctionalComponent = ({children}) => {

    const [ isLoaded, setLoaded ] = useState(false);

    useEffect(() => {
        window.onload = () => {
            console.log('ON LOAD')
            setLoaded(true)
        }
    }, [window]);

    return (
        <div>
            { !isLoaded && (
                <div className="Loading">
                    
                </div>
            )}
            {children}
        </div>
    )
}

export default Loading;