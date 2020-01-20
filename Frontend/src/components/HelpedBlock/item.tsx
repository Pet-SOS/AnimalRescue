import React from 'react';
import { BASE_URL } from '../../api';
import { TI18n } from '../../i18n';
import noPhotoImage from './../../img/nophoto.jpg';
import { BlockLink } from '../BlockLink';
import { IAnimal } from '../../api/animals';
import './index.scss';

interface IPropTypes {
  animal: IAnimal
}

export const HelpedBlockItem: React.FC<IPropTypes> = ({ animal }) => {
  return (
    <div className="slide-item">
      <div className="img-holder" style={{ backgroundImage: `url(${animal.imageIds[0] ? `${BASE_URL}documents/${animal.imageIds[0]}` : `${noPhotoImage}`})`}}>
      </div>
      <div className="info-holder">
        <div className="info-content">
          <div className="info-title">{animal.name}</div>
          <div className="info-text">{animal.description}</div>
        </div>
        <BlockLink 
          title={<TI18n keyStr="readStory" default="Читать историю" />}
          href={''}
          isButtonHidden={true}
        />
      </div>
    </div>
  )
}