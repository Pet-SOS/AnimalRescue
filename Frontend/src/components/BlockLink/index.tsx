import React from 'react';
import { Link } from 'react-router-dom';
import { Button, ButtonTypes } from '../Button';
import cn from 'classnames';
import './index.scss';

export interface IBlockLinkPropTypes {
  title: string | React.ReactNode;
  href: string;
  isButtonHidden?: boolean;
  isExternalLink?: boolean;
  isBack?: boolean;
}

export const BlockLink: React.FC<IBlockLinkPropTypes> = ({ title, href, isButtonHidden, isExternalLink, isBack }) => {
  const getLinkClasses = (): string => {
    return cn('default-block-link', { 'back-link': isBack });
  }
  const linkBody: JSX.Element = (
    <React.Fragment>
      <span>{title}</span>
      {!isButtonHidden && <Button styleType={ButtonTypes.WhiteCircle} />}
    </React.Fragment>
  )

  return isExternalLink ?
    <a href={href} target="_blank" className={getLinkClasses()}>
      {linkBody}
    </a> :
    <Link to={href} className={getLinkClasses()}>
      {linkBody}
    </Link>
}