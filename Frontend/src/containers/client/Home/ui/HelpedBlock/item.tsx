import React from 'react';
import { useSelector } from 'react-redux';
import { TI18n } from '../../../../../i18n';
import noPhotoImage from './../../../../../img/nophoto.jpg';
import { BlockLink } from '../../../../../components/BlockLink';
import './index.scss';
import { IBlogItem } from '../../../../../api/blog';
import { selectApiUrl } from '../../../../../store/selectors/config.selector';
import { store } from '../../../../../store';

interface IPropTypes {
  story: IBlogItem;
}

export const HelpedBlockItem: React.FC<IPropTypes> = ({ story }) => {
  const baseUrl: string = useSelector(() => selectApiUrl(store.getState()));
  return (  
    <React.Fragment>
      <div className="img-holder" style={{ backgroundImage: `url(${story.imageIds[0] ? `${baseUrl}documents/${story.imageIds[0]}/type/medium` : `${noPhotoImage}`})` }}>
      </div>
      <div className="info-holder">
        <div className="info-content">
          <div className="info-title">{story.title}</div>
          <div className='info-text'>{story.body}</div>
        </div>
        <BlockLink
          title={<TI18n keyStr="readStory" default="Читать историю" />}
          href={`blog/${story.id}`}
          isButtonHidden={true}
        />
      </div>
    </React.Fragment>
  )
}