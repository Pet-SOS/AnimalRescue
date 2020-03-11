import React from 'react';
import './index.scss';
import { Link } from 'react-router-dom';
import { Button, ButtonTypes } from '../Button';

export interface IBreadcrumbProps {
  text: string | React.ReactNode;
  href: string;
}

export const Breadcrumb: React.FC<IBreadcrumbProps> = ({ text, href }) => (
  <Link to={href} className='breadcrumb'>
    <span>{text}</span>
    <Button styleType={ButtonTypes.WhiteCircle}/>
  </Link>
)