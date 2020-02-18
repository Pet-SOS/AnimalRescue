import React from 'react';
import { BASE_URL } from './../../../../api';
import noPhotoImage from './../../../../img/nophoto.jpg';
import { Link } from 'react-router-dom';
import './../style/blog-card.scss';

export interface IPropTypes {
    image: string;
    title: string;
    id: string;
    text: string | React.ReactNode; 
}

export const BlogCard: React.FC<IPropTypes> = ({ image, title, id, text }) => (
  <div className="blog-card-holder">
      <Link to={`/blog/${id}`} className="blog-card-link" />
      <div className="blog-card-image" style={{ backgroundImage: `url(${image ? `${BASE_URL}documents/${image}/type/medium` : `${noPhotoImage}`})` }}/>
      <div className="blog-grey-text">{text}</div>
      <div className="blog-card-title">{title}</div>
  </div>
);