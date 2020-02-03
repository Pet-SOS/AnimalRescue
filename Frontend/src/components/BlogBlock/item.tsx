import React from 'react';
import { BASE_URL } from '../../api';
import noPhotoImage from './../../img/nophoto.jpg';
import { Link } from 'react-router-dom';
import './index.scss';

export interface IPropTypes {
    image: string;
    title: string;
    id: string;
    text: string | React.ReactNode; 
}

export const BlogItem: React.FC<IPropTypes> = ({ image, title, id, text }) => {
    console.log('tit', text)
  return (
    <li className="blog-item-holder">
        <Link to={`/blog/${id}`} className="blog-item-link" />
        <div className="blog-item-image" style={{ backgroundImage: `url(${image ? `${BASE_URL}documents/${image}/type/medium` : `${noPhotoImage}`})` }}/>
        <div className="blog-grey-text">{text}</div>
        <div className="blog-item-title">{title}</div>
  </li>
  )
}