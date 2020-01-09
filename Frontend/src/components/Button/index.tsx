import React from 'react';
import './styles.scss';
import cn from 'classnames';

export enum ButtonTypes {
    Green = 'blue',
    GreenCircle = 'blue-circle',
}

interface IPropTypes {
    content?: string;
    onClick: () => void;
    className?: string;
    styleType?: ButtonTypes;
    children?: React.ReactNode,
}

export const Button: React.FC<IPropTypes> = (
    {content, onClick, className, styleType, children}: IPropTypes
) => {
    return (
        <button
            className={cn(className,{button: true, [styleType || '']: [!!styleType]})}
            onClick={onClick}
        >
            {content || children || null}
        </button>
    )
};