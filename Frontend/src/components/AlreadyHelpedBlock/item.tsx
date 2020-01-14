import React from 'react';
import './index.scss';
import { BASE_URL } from '../../api';

interface IPropTypes {
  slideData: any
}

export const AlreadyHelpBlockItem: React.FC<IPropTypes> = ({ slideData }) => {
  return (
    <div className="slide-item">
      <div className="img-holder" style={{ backgroundImage: `url(${BASE_URL}documents/${slideData.imageLinks[0]})`}}>
      </div>
      <div className="info-holder">
        <div className="info-title">{slideData.title}</div>
        <p>{slideData.description}</p>
        <a>Читать историю</a>
      </div>
    </div>
  )
}