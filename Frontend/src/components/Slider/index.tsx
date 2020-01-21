import React from 'react';
import Swiper from 'react-id-swiper';
import 'swiper/css/swiper.min.css';
import './index.scss';

interface IPropTypes {
  slides: React.ReactNode[];
  isPaginationHidden?: boolean;
  isNavigationHidden?: boolean;
  isLoop?: boolean;
  slidesPerView?: number;
  slideEffect?: SlideEffects;
  isAutoplay?: boolean;
  autoPlayDelayMs?: number;
  spaceBetween?: number;
}

export enum SlideEffects { FADE = 'fade', CUBE = 'cube', COVERFLOW = 'coverflow', FLIP = 'flip'}

export const Slider: React.FC<IPropTypes> = ({ slides, isPaginationHidden, isNavigationHidden, slidesPerView, isLoop, slideEffect, isAutoplay, autoPlayDelayMs, spaceBetween }) => {
  const getSliderParams = () => {
    const sliderParams: any = {
      rebuildOnUpdate: true,
      shouldSwiperUpdate: true,
      slidesPerView: !!slidesPerView ? Math.abs(slidesPerView) : 1,
      loop: isLoop,
      effect: slideEffect,
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
    <div className={`custom-slider-wrapper ${isPaginationHidden ? '' : 'pagination-active'}`}>
      <div className="custom-slider-inner">
        <Swiper {...getSliderParams()}>
          {slides.map((slide, index) => <div key={index}>{slide}</div>)}
        </Swiper>
      </div>
    </div>
  )
}