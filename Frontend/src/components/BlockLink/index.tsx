import React from 'react';
import { Button, ButtonTypes } from '../Button';
import './index.scss';

export interface IBlockLinkPropTypes {
  title: string | React.ReactNode;
  href: string;
  isButtonHidden?: boolean
}

export const BlockLink: React.FC<IBlockLinkPropTypes> = ({ title, href, isButtonHidden }) => {
  return (    
    <a href={href} className="default-block-link">
      <span>{title}</span>
      {!isButtonHidden && <Button styleType={ButtonTypes.BlueCircle} />}
    </a>
  )
}