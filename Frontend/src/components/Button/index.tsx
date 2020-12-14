import React from 'react';
import './styles.scss';
import cn from 'classnames';
import { Link } from 'react-router-dom';

export enum ButtonTypes {
  Blue = 'btn-blue',
  BlueSmall = 'btn-blue btn-sm',
  Yellow = 'btn-yellow',
  BlueOutline = 'btn-blue-outline',
  BlueOutlineSmall = 'btn-blue-outline btn-sm',
  WhiteCircle = 'btn-circle btn-white',
  Close = 'btn-circle btn-close',
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
  children,
}) =>
  !!href ? (
    <Link
      to={href}
      className={cn(className, 'btn', { [styleType as string]: [!!styleType] })}
    >
      {children || null}
    </Link>
  ) : (
    <button
      className={cn(className, 'btn', { [styleType as string]: [!!styleType] })}
      onClick={onClick}
      type="button"
    >
      {children || null}
    </button>
  );
