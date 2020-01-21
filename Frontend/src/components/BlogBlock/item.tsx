import React from 'react';
import { BASE_URL } from '../../api';
import { IBlog } from '../../api/blogs';
import noPhotoImage from './../../img/nophoto.jpg';
import './index.scss';

export interface IPropTypes {
    blog: IBlog
    // href: string;    
}

export const BlogItem: React.FC<IPropTypes> = ({ blog }) => {
  return (        
      <div className="blog-item-holder">
        {/* <a href={href}> */}
            <div className="blog-item-image" 
            style={{ backgroundImage: `url(${blog.imageIds[0] ? `${BASE_URL}documents/${blog.imageIds[0]}` : `${noPhotoImage}`})`}}></div>
        {/* </a> */}
        <div className="blog-grey-text">{blog.type}</div>
        <div className="blog-grey-text">{blog.createdAt}</div>
        <div className="blog-item-title">{blog.title}</div>      
      </div>  
  )
}