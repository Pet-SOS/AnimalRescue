import React from 'react';
import cn from 'classnames';
import Swiper from 'react-id-swiper';
import 'swiper/css/swiper.min.css';
import './index.scss';

export enum SlidesPerViewValue { AUTO = 'auto' }
export enum SlideEffects { FADE = 'fade', CUBE = 'cube', COVERFLOW = 'coverflow', FLIP = 'flip' }

interface IPropTypes {
  slides: React.ReactNode[];
  isPaginationHidden?: boolean;
  isNavigationHidden?: boolean;
  isLoop?: boolean;
  slidesPerView?: number | SlidesPerViewValue;
  slideEffect?: SlideEffects;
  isAutoplay?: boolean;
  isSwipeDisable?: boolean;
  autoPlayDelayMs?: number;
  spaceBetween?: number;
  breakpoints?: { [key: number]: IPropTypes }
}


export const Slider: React.FC<IPropTypes> = ({
  slides,
  isPaginationHidden,
  isNavigationHidden,
  slidesPerView,
  isLoop,
  slideEffect,
  isAutoplay,
  autoPlayDelayMs,
  spaceBetween,
  isSwipeDisable,
  breakpoints
}) => {
  const getSliderParams = () => {
    const sliderParams: any = {
      rebuildOnUpdate: true,
      shouldSwiperUpdate: true,
      slidesPerView: !!slidesPerView ? slidesPerView === SlidesPerViewValue.AUTO ? slidesPerView : Math.abs(slidesPerView) : 1,
      loop: isLoop,
      effect: slideEffect,
      noSwiping: !!isSwipeDisable,
      breakpoints
    }
    if (!!spaceBetween) {
      sliderParams.spaceBetween = spaceBetween;
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
    if (isAutoplay || !!autoPlayDelayMs) {
      sliderParams.autoplay = {
        delay: !!autoPlayDelayMs ? Math.abs(autoPlayDelayMs) : 2500,
        disableOnInteraction: false,
      }
    }
    return sliderParams;
  }
  return (
    <div className={
      cn('custom-slider-wrapper', {
        'pagination-active': !isPaginationHidden,
        'auto-slides': slidesPerView === SlidesPerViewValue.AUTO
      })
    }>
      <div className="custom-slider-inner">
        <Swiper {...getSliderParams()}>
          {slides.map((slide, index) => <div key={index}>{slide}</div>)}
        </Swiper>
      </div>
    </div>
  )
}