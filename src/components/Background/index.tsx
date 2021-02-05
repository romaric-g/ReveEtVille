import { render, h } from 'preact';
import { useCallback, useEffect, useMemo, useState } from 'preact/hooks';
import classnames from 'classnames';
import './index.scss';

interface Props {
    background: any,
    fit: boolean
}

const body = document.body;

const Background = ({ background, fit }: Props) => {

    const [ mousePosition, setMousePosition ] = useState<{ x: number, y: number }>({ x: 0, y: 0 })

    const onMouseMove = useCallback((e) => {
        setMousePosition({ x: e.clientX, y: e.clientY  })
    }, []);

    //mousePosition.y / body.offsetHeight)-0.5
    /*
    {
        transform: `rotateY(${
            ((mousePosition.x / body.offsetWidth)-0.5) * 40
        }deg) rotateX(${
            ((mousePosition.y / body.offsetHeight)-0.5) * 40
        }deg) scale(1.2)`,
        transformOrigin: `${25 + (1 - mousePosition.x / body.offsetWidth) * 50}% ${25 +(1 - mousePosition.x / body.offsetWidth) * 50}%`
    }
    */
   /*
    scaleX(${
            1 - Math.abs(((mousePosition.x / body.offsetWidth) - 0.5)) * 0.05
        })
   */
    const BackgroundCss = useMemo(() => ({
        transform: `translateX(${
            ((mousePosition.x / body.offsetWidth)-0.5) * -40
        }px) translateY(${
            ((mousePosition.y / body.offsetHeight)-0.5) * -40
        }px)`,
        transformOrigin: `${25 + (1 - mousePosition.x / body.offsetWidth) * 50}% ${25 +(1 - mousePosition.x / body.offsetWidth) * 50}%`
    }), [mousePosition])

    useEffect(() => {
        body.addEventListener('mousemove', onMouseMove);
        return () => body.addEventListener("mousemove", onMouseMove, true);
    }, []);

    return (
        <div className={classnames("Background", {
            "Background--fit": fit
        })} >
            <img style={BackgroundCss} className="Background__image" src={background} alt=""/>
        </div>
    )
}

export default Background;