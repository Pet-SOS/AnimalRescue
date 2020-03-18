import React from 'react';
import './index.scss';
import { IBreadcrumbProps, Breadcrumb } from './item';

export interface IBreadcrumbsPropTypes {
  data: IBreadcrumbProps[];
}

export const Breadcrumbs: React.FC<IBreadcrumbsPropTypes> = ({ data }) => (
  <ul className='breadcrumbs'>
    {data.map((item, index) => (
      <li key={index}>
        <Breadcrumb text={item.text} href={item.href}/>
      </li>
    ))}
  </ul>
)