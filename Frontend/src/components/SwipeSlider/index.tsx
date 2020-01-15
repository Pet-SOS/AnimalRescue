import React from 'react';
import Swiper from 'react-id-swiper';
import 'swiper/css/swiper.min.css';
import './index.scss';

interface IPropTypes {
  data: React.ReactNode[];
  isPaginationHidden?: boolean;
  isNavigationHidden?: boolean;
  slidesPerView?: number;
}

export const SwiperSlider: React.FC<IPropTypes> = ({ data, isPaginationHidden, isNavigationHidden, slidesPerView }) => {
  const getSliderParams = () => {
    const sliderParams: any = {
      rebuildOnUpdate: true,
      shouldSwiperUpdate: true,
      slidesPerView: !!slidesPerView ? Math.round(Math.abs(slidesPerView)) : 1,
    }
    if (!isPaginationHidden) {
      sliderParams.pagination = {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
      }
    }
    if (!isNavigationHidden) {
      sliderParams.navigation = {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      }
    }
    return sliderParams;
  }
  return (
    <div className="custom-slider-wrapper" style={!isNavigationHidden ? { paddingBottom: '2.25rem'} : {}}>
      <div className="custom-slider-inner">
        <Swiper {...getSliderParams()}>
          {data.map((slider, index) => <div key={index}>{slider}</div>)}
        </Swiper>
      </div>
    </div>
  )
}