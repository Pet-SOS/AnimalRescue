import React from 'react';
import { BASE_URL } from '../../api';
import noPhotoImage from './../../img/nophoto.jpg';
import './index.scss';

export interface IPropTypes {
    image: string;
    title: string;
    id: string;
    text: string; 
}

export const BlogItem: React.FC<IPropTypes> = ({ image, title, id, text }) => {
  return (        
      <li className="blog-item-holder">
        <a href={id}>
            <div className="blog-item-image" 
            style={{ backgroundImage: `url(${image ? `${BASE_URL}documents/${image}` : `${noPhotoImage}`})`}}>
            </div>
        </a>
        <div className="blog-grey-text">{text}</div>
        <div className="blog-item-title">{title}</div>      
      </li>  
  )
}