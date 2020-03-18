import React from 'react';
import './styles.scss';
import cn from 'classnames';
import { Link } from 'react-router-dom';

export enum ButtonTypes {
  Blue = 'blue',
  Yellow ='yellow',
  BlueCircle = 'blue-circle',
  WhiteCircle = 'white-circle',
  Close = 'close'
}

interface IPropTypes {
    content?: string;
    onClick?: () => void;
    className?: string;
    styleType?: ButtonTypes;
    children?: React.ReactNode;
    href?: string;
}

export const Button: React.FC<IPropTypes> = (
    {content, onClick, className, styleType, children, href}: IPropTypes
) => {
    return href ?
    (
    <Link to={href} className={cn(className,{button: true, [styleType || '']: [!!styleType]})}>
        {content || children || null}
    </Link>
    ) :
    (
        <button
            className={cn(className,{button: true, [styleType || '']: [!!styleType]})}
            onClick={onClick}
            type='button'
        >
            {content || children || null}
        </button>
    )
};