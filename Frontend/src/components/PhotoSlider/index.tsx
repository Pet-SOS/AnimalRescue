import React from 'react';
import { BASE_URL } from "../../api/index";
import noPhoto from '../../img/nophoto.jpg';
import './index.scss';
import { actionIsActivePopup } from '../../containers/client/Home/store/actions';
import { store } from '../../store';

export const PhotoSlider: React.FC<any> = ({ sliders, updatePostInfo, slideIndex }) => {
  const imageUrl = sliders[0] ? `${BASE_URL}documents/${sliders[slideIndex].imageIds[0]}/type/medium` : noPhoto;
  return (
    <div className="slide">
      <div className='box-img' onClick={() => { store.dispatch(actionIsActivePopup(true)) }} >
        <div className="image" style={{ backgroundImage: `url(${imageUrl})` }}></div>
      </div>
      {!!sliders && !!sliders.length && (
        <div className='buttons-holder'>
          <button onClick={() => updatePostInfo(slideIndex - 1 < 0 ? sliders.length - 1 : slideIndex - 1)} className='swiper-button-prev'></button>
          <button onClick={() => updatePostInfo(slideIndex + 1 > sliders.length - 1 ? 0 : slideIndex + 1)} className='swiper-button-next'></button>
        </div>
      )}
    </div>
  )
}
