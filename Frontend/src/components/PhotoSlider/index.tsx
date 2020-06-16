import React from 'react';
import { useSelector } from 'react-redux';
import noPhoto from '../../img/nophoto.jpg';
import './index.scss';
import { actionIsActivePopup } from '../../containers/client/Home/store/actions';
import { store } from '../../store';
import { selectApiUrl } from '../../store/selectors/config.selector';

export const PhotoSlider: React.FC<any> = ({ sliders, updatePostInfo, slideIndex }) => {
  const baseUrl: string = useSelector(() => selectApiUrl(store.getState()));
  const coverImageId = sliders[0] && sliders[slideIndex].coverImage ? sliders[slideIndex].coverImage : 0;
  const imageUrl = sliders[0] && sliders[slideIndex].imageIds[coverImageId] ? `${baseUrl}documents/${sliders[slideIndex].imageIds[coverImageId]}/type/medium` : noPhoto;
  return (
    <>
      <div className='image-help-holder' onClick={() => { store.dispatch(actionIsActivePopup(true)) }} >
        <div className="image-help" style={{ backgroundImage: `url(${imageUrl})` }}></div>
      </div>
      {!!sliders && !!sliders.length && (
        <div className='buttons-help-holder'>
          <button onClick={() => updatePostInfo(slideIndex - 1 < 0 ? sliders.length - 1 : slideIndex - 1)} className='swiper-button-prev'></button>
          <button onClick={() => updatePostInfo(slideIndex + 1 > sliders.length - 1 ? 0 : slideIndex + 1)} className='swiper-button-next'></button>
        </div>
      )}
    </>
  )
}
