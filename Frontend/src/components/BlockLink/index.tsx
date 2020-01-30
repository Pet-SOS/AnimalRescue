import React from 'react';
import { Link } from 'react-router-dom';
import { Button, ButtonTypes } from '../Button';
import './index.scss';

export interface IBlockLinkPropTypes {
  title: string | React.ReactNode;
  href: string;
  isButtonHidden?: boolean;
  isExternalLink?: boolean;  
}

export const BlockLink: React.FC<IBlockLinkPropTypes> = ({ title, href, isButtonHidden, isExternalLink }) => (
  isExternalLink ?
    <a href={href} target="_blank" className="default-block-link">
      <span>{title}</span>
      {!isButtonHidden && <Button styleType={ButtonTypes.BlueCircle} />}
    </a> :
    <Link to={href} className="default-block-link">
      <span>{title}</span>
      {!isButtonHidden && <Button styleType={ButtonTypes.BlueCircle} />}
    </Link>
) 