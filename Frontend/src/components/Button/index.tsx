import React from 'react';
import './styles.scss';
import cn from 'classnames';

export enum ButtonTypes {
  Blue = 'blue',
  Yellow ='yellow',
  BlueCircle = 'blue-circle',
  Close = 'close'
}

interface IPropTypes {
    content?: string;
    onClick?: (e?:any) => void;
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
            type='button'
        >
            {content || children || null}
        </button>
    )
};