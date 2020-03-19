import React from 'react';
import { useSelector } from 'react-redux';
import noPhotoImage from './../../../../img/nophoto.jpg';
import { Link } from 'react-router-dom';
import './../style/blog-card.scss';
import { TI18n } from '../../../../i18n';
import { selectApiUrl } from '../../../../store/selectors/config.selector';
import { store } from '../../../../store';

export interface IPropTypes {
    image: string;
    title: string;
    id: string;
    text: string | React.ReactNode; 
}

export const BlogCard: React.FC<IPropTypes> = ({ image, title, id, text }) => {
  const baseUrl: string = useSelector(() => selectApiUrl(store.getState()));
 const convertToTitle =(type: React.ReactNode)=>{
    return <TI18n keyStr={`blog${type}`}/>
  }
  
  return (
    <div className="blog-card-holder">
        <Link to={`/blog/${id}`} className="blog-card-link" />
      <div className="blog-card-image" style={{ backgroundImage: `url(${image ? `${baseUrl}documents/${image}/type/medium` : `${noPhotoImage}`})` }}/>
        <div className="blog-grey-text">{convertToTitle(text)}</div>
        <div className="blog-card-title">{title}</div>
    </div>
  )
}