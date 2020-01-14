import React from 'react';
import Swiper from 'react-id-swiper';
import 'swiper/css/swiper.min.css';
import './index.scss';

interface IPropTypes {
  data: any[];
  isPaginationShow: boolean;
  isNavigationShow: boolean;
  slidesPerView: number;
}

export const SwiperSlider: React.FC<IPropTypes> = ({ data, isPaginationShow, isNavigationShow, slidesPerView }) => {
  const getSliderParams = () => {
    const sliderParams: any = {
      rebuildOnUpdate: true,
      shouldSwiperUpdate: true,
      slidesPerView
    }
    if (isPaginationShow) {
      sliderParams.pagination = {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
      }
    }
    if (isNavigationShow) {
      sliderParams.navigation = {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      }
    }
    return sliderParams;
  }
  return (
    <div className="custom-slider-wrapper">
      <div className="custom-slider-inner">
        <Swiper {...getSliderParams()}>
          {data.map((slider, index) => <div key={index}>{slider}</div>)}
        </Swiper>
      </div>
    </div>
  )
}