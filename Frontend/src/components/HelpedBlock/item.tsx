import React from 'react';
import { BASE_URL } from '../../api';
import { TI18n } from '../../i18n';
import noPhotoImage from './../../img/nophoto.jpg';
import './index.scss';

interface IPropTypes {
  slideData: any
}

export const HelpedBlockItem: React.FC<IPropTypes> = ({ slideData }) => {
  return (
    <div className="slide-item">
      <div className="img-holder" style={{ backgroundImage: `url(${slideData.imageLinks[0] ? `${BASE_URL}documents/${slideData.imageLinks[0]}` : `${noPhotoImage}`})`}}>
      </div>
      <div className="info-holder">
        <div className="info-content">
          <div className="info-title">{slideData.title}</div>
          <div className="info-text">{slideData.description}</div>
        </div>
        <a><TI18n keyStr="readStory" default="Читать историю" /></a>
      </div>
    </div>
  )
}