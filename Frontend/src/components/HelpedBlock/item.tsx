import React from 'react';
import { BASE_URL } from '../../api';
import { TI18n } from '../../i18n';
import noPhotoImage from './../../img/nophoto.jpg';
import { BlockLink } from '../BlockLink';
import './index.scss';
import { IBlogItem } from '../../api/blog';

interface IPropTypes {
  story: IBlogItem;
}

export const HelpedBlockItem: React.FC<IPropTypes> = ({ story }) => {
  return (
    <React.Fragment>
      <div className="img-holder" style={{ backgroundImage: `url(${story.imageIds[0] ? `${BASE_URL}documents/${story.imageIds[0]}` : `${noPhotoImage}`})`}}>
      </div>
      <div className="info-holder">
        <div className="info-content">
          <div className="info-title">{story.title}</div>
          <div className="info-text">{story.body}</div>
        </div>
        <BlockLink 
          title={<TI18n keyStr="readStory" default="Читать историю" />}
          href={''}
          isButtonHidden={true}
        />
      </div>
    </React.Fragment>
  )
}