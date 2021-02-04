import { render, h } from 'preact';
import { useCallback, useEffect, useMemo, useRef, useState } from 'preact/hooks';
import './index.scss';
import Icon, { Icons } from '../Icon';
import { hasSomeParentTheClass } from '../../scripts/utils';

const body = document.body;

interface Props {
    action: {
        size: number,
        icon: Icons,
        run: () => void
    }
}

export const CURSOR_SIZE = {
    DEFAULT: 50,
    FOCUS: 100
}

const Cursor = ({ action }: Props) => {

    const [ mousePosition, setMousePosition ] = useState<{ x: number, y: number, size: number }>({ x: 0, y: 0, size: 50})
    const actionRef = useRef();

    useEffect(() => {
        console.log('NEW action')
        console.log(action)
        if (mousePosition && action && action.size) {
            console.log('OK')
            setMousePosition(Object.assign({}, mousePosition, {size: action.size}));
        }
        actionRef.current = action;
    }, [action])

    const onMouseMove = useCallback((e) => {
        const target = (e.target);
        if(target) {
            setMousePosition({ x: e.clientX, y: e.clientY , size: 
                ( target.classList.contains('cursor--hover') ? CURSOR_SIZE.FOCUS : CURSOR_SIZE.DEFAULT )
            })
            if(hasSomeParentTheClass(target, 'cursor--follow-h')) {
                const targetPos = target.getBoundingClientRect()
                setMousePosition({ x: e.clientX, y: (targetPos.y + targetPos.height / 2) , size: CURSOR_SIZE.FOCUS })
            } else {
                setMousePosition({ x: e.clientX, y: e.clientY , size: CURSOR_SIZE.DEFAULT  })
            }
        } else {
            setMousePosition({ x: e.clientX, y: e.clientY , size: CURSOR_SIZE.DEFAULT })
        }
    }, [])

    const onClick = useCallback((e) => {
        console.log('Click event')
        console.log(actionRef.current)
        if (actionRef.current) {
            (actionRef.current as any).run()
        }
    }, [actionRef])

    useEffect(() => {
        body.addEventListener('mousemove', onMouseMove);
        body.addEventListener('click', onClick);
        return () => {
            body.removeEventListener("mousemove", onMouseMove);
            body.removeEventListener("mousemove", onClick);
        }
    }, []);

    const cursorCss = useMemo(() => ({
        top: mousePosition.y - mousePosition.size /2 + 'px',
        left: mousePosition.x - mousePosition.size  /2 + 'px',
        width: ((action && action.size) || mousePosition.size) + 'px',
        height: ((action && action.size) || mousePosition.size) + 'px'
    }), [mousePosition])
    
    return (
        <div className="Cursor" style={cursorCss}>
            {action && (
                <Icon icon={action.icon} />
            )}
        </div>
    )
}

export default Cursor;
