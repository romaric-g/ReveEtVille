import { render, h } from 'preact';
import { useState } from 'preact/hooks';
import classnames from 'classnames';
import './index.scss'

interface Props {
    type: 'left' | 'right'
}

const MenuDecoration = ({ type }: Props) => {

    return (
        <div className={classnames("MenuDecoration", `MenuDecoration--${type}`)}>
            <span></span>
            <span></span>
            <span></span>
        </div>
    )
}

export default MenuDecoration;