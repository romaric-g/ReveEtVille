import { render, h } from 'preact';
import { useCallback, useEffect, useMemo, useRef, useState } from 'preact/hooks';
import './index.scss';
import Icon, { Icons } from '../Icon';
import { hasSomeParentTheClass } from '../../scripts/utils';

const body = document.body;

interface Action {
    size: number,
    icon: Icons,
    run: () => void,
    delay: number
}
interface Props {
    action: Action
}

export const CURSOR_SIZE = {
    DEFAULT: 50,
    FOCUS: 100
}

interface CursorInfo { x: number, y: number, size: number, waitAction: boolean, showCursorAction: boolean }

const Cursor = ({ action }: Props) => {

    const [ cursorInfo, setcursorInfo ] = useState<CursorInfo>({ x: 0, y: 0, size: 5, waitAction: false, showCursorAction: true})
    const actionRef = useRef<Action>();
    const waitactionRef = useRef<boolean>(cursorInfo.waitAction);
    const delayRef = useRef(0);

    useEffect(() => {
        console.log('NEW action')
        console.log(action)
        if (cursorInfo && action && action.size) {
            console.log('OK')
            setcursorInfo(Object.assign({}, cursorInfo, {size: action.size}));
        }
        actionRef.current = action;
    }, [action])

    const onMouseMove = useCallback((e) => {
        const target = (e.target);
        if(target) {
            const action = actionRef.current;
            const waitAction = !hasSomeParentTheClass(target, 'cursor--noaction') && !!action;
            console.log(action)
            // setcursorInfo({ x: e.clientX, y: e.clientY, waitAction, size: 
            //     ( target.classList.contains('cursor--hover') ? CURSOR_SIZE.FOCUS : CURSOR_SIZE.DEFAULT )
            // })
            if(hasSomeParentTheClass(target, 'cursor--follow-h')) {
                const targetPos = target.getBoundingClientRect()
                setcursorInfo({ x: e.clientX, y: (targetPos.y + targetPos.height / 2), waitAction , size: waitAction ? action.size : CURSOR_SIZE.FOCUS, showCursorAction: false })
            } else {
                setcursorInfo({ x: e.clientX, y: e.clientY, waitAction, size: waitAction ? action.size : CURSOR_SIZE.DEFAULT, showCursorAction: true  })
            }
        } else {
            setcursorInfo({ x: e.clientX, y: e.clientY, waitAction: false, size: CURSOR_SIZE.DEFAULT, showCursorAction: true })
        }
    }, [])

    const onClick = useCallback((e) => {
        console.log('Click event')
        console.log(actionRef.current)
        const delayPassed = new Date().getTime() - delayRef.current > actionRef.current.delay;
        if (actionRef.current && waitactionRef.current && delayPassed) {
            (actionRef.current as any).run()
            delayRef.current = new Date().getTime();
        }
    }, [actionRef, waitactionRef])

    useEffect(() => {
        body.addEventListener('mousemove', onMouseMove);
        body.addEventListener('click', onClick);
        return () => {
            body.removeEventListener("mousemove", onMouseMove);
            body.removeEventListener("mousemove", onClick);
        }
    }, []);

    useEffect(() => {
        waitactionRef.current = cursorInfo.waitAction;
    }, [cursorInfo])

    const cursorCss = useMemo(() => ({
        top: cursorInfo.y - cursorInfo.size /2 + 'px',
        left: cursorInfo.x - cursorInfo.size  /2 + 'px',
        width: cursorInfo.size + 'px',
        height: cursorInfo.size + 'px'
    }), [cursorInfo])
    
    return (
        <div className="Cursor" style={cursorCss}>
            {action && cursorInfo.waitAction && cursorInfo.showCursorAction && (
                <Icon icon={action.icon} />
            )}
        </div>
    )
}

export default Cursor;
