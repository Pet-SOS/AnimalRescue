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
  onClick?: (e?: any) => void;
  className?: string;
  styleType?: ButtonTypes;
  href?: string;
  children?: React.ReactNode | string;
}

export const Button: React.FC<IPropTypes> = ({
  onClick,
  className,
  styleType,
  href,
  children
}) => (!!href ?
    (
      <Link to={href} className={cn(className, 'button', {[styleType as string]: [!!styleType]})}>
        { children || null}
      </Link>
    ) :
    (
      <button
        className={cn(className, 'button', {[styleType as string]: [!!styleType]})}
        onClick={onClick}
        type='button'
      >
        { children || null}
      </button>
    )
);