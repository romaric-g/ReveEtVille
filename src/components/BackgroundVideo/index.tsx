import { render, h } from 'preact';
import classnames from 'classnames';
import { useCallback, useEffect, useMemo, useState } from 'preact/hooks';
import './index.scss';

import oeuvre1 from './../../assets/video/oeuvre 1 v2 25 f.mp4';
import oeuvre2 from './../../assets/video/Oeuvre 2 25 f.mp4';
import oeuvre3 from './../../assets/video/Oeuvre 3 25 f.mp4';

interface Props {
    video: string
}

const videos = {
    oeuvre1,
    oeuvre2,
    oeuvre3
}

const body = document.body;

const BackgroundVideo = ({ video }: Props) => {

    const [ mousePosition, setMousePosition ] = useState<{ x: number, y: number }>({ x: 0, y: 0 })

    const onMouseMove = useCallback((e) => {
        setMousePosition({ x: e.clientX, y: e.clientY  })
    }, []);

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
        <div className="BackgroundVideo" >
            <video className={classnames("BackgroundVideo__video", {
                "BackgroundVideo__video--video3styletemp": video === 'oeuvre3'
            })} autoplay loop width="1080px">
                <source src={videos[video]}
                        type="video/mp4" />
            </video>
        </div>
    )
}

export default BackgroundVideo;