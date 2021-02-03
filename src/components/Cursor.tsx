import { render, h } from 'preact';
import { useCallback, useEffect, useMemo, useState } from 'preact/hooks';
import './../scss/cursor.scss';

const body = document.body;

const Cursor = () => {

    const [ mousePosition, setMousePosition ] = useState<{ x: number, y: number, size: number }>({ x: 0, y: 0, size: 50})
    
    const onMouseMove = useCallback((e) => {
        const target = (e.target);
        if(target) {
            if(target.classList.contains('cursor--hover')) {
                setMousePosition({ x: e.clientX, y: e.clientY , size: 100 })
            } else {
                setMousePosition({ x: e.clientX, y: e.clientY , size: 50 })
            }
            if(target.classList.contains('cursor--follow-h')) {
                const targetPos = target.getBoundingClientRect()
                setMousePosition({ x: e.clientX, y: (targetPos.y + targetPos.height / 2) , size: 100 })
            } else {
                setMousePosition({ x: e.clientX, y: e.clientY , size: 50 })
            }
        }
    }, [])

    useEffect(() => {
        body.addEventListener('mousemove', onMouseMove);
        return () => body.addEventListener("mousemove", onMouseMove, true);
    }, []);

    const cursorCss = useMemo(() => ({
        top: mousePosition.y - mousePosition.size /2 + 'px',
        left: mousePosition.x - mousePosition.size  /2 + 'px',
        width: mousePosition.size + 'px',
        height: mousePosition.size + 'px'
    }), [mousePosition])

    return (
        <div className="Cursor" style={cursorCss}></div>
    )
}

export default Cursor;
