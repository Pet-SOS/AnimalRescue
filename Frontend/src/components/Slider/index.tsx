import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import SwiperCore,
  { 
    Navigation,
    Pagination,
    Thumbs,
    Autoplay,
    EffectCube,
    EffectFade,
    EffectCoverflow,
    EffectFlip,
  } from 'swiper/core';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/components/effect-fade/effect-fade.min.css"
import "swiper/components/navigation/navigation.min.css"
import "swiper/components/pagination/pagination.min.css"
import './index.scss';

export enum SlidesPerViewValue {
  AUTO = 'auto',
}
export enum SlideEffects {
  FADE = 'fade',
  CUBE = 'cube',
  COVERFLOW = 'coverflow',
  FLIP = 'flip',
}
export enum ThumbSlidesAlignment {
  LEFT = 'left',
  RIGHT = 'right',
}

interface IPropTypes {
  slides: React.ReactNode[];
  thumbSlides?: React.ReactNode[];
  thumbSlidesAlignment?: ThumbSlidesAlignment;
  isPaginationHidden?: boolean;
  isNavigationHidden?: boolean;
  isLoop?: boolean;
  slidesPerView?: number | SlidesPerViewValue;
  slideEffect?: SlideEffects;
  isAutoplay?: boolean;
  isSwipeDisable?: boolean;
  autoPlayDelayMs?: number;
  spaceBetween?: number;
  breakpoints?: { [key: number]: IPropTypes };
}

SwiperCore.use([
  Navigation,
  Pagination,
  Thumbs,
  Autoplay,
  EffectCube,
  EffectFade,
  EffectCoverflow,
  EffectFlip,
]);

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
  breakpoints,
  thumbSlides,
  thumbSlidesAlignment,
}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  // const [swiper, updateSwiper] = useState();
  // const [swiperThumbs, updateSwiperThumbs] = useState();
  const getSliderParams = () => {
    const sliderParams: any = {
      rebuildOnUpdate: !thumbSlides || !thumbSlides.length,
      shouldSwiperUpdate: !thumbSlides || !thumbSlides.length,
      slidesPerView: !!slidesPerView
        ? slidesPerView === SlidesPerViewValue.AUTO
          ? slidesPerView
          : Math.abs(slidesPerView)
        : 1,
      loop: isLoop,
      effect: slideEffect,
      noSwiping: !!isSwipeDisable,
      breakpoints,
    };
    if (!!spaceBetween) {
      sliderParams.spaceBetween = spaceBetween;
    }
    if (!isPaginationHidden) {
      sliderParams.pagination = {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true,
      };
    }
    if (!isNavigationHidden) {
      sliderParams.navigation = true;
    }
    if (isAutoplay || !!autoPlayDelayMs) {
      sliderParams.autoplay = {
        delay: !!autoPlayDelayMs ? Math.abs(autoPlayDelayMs) : 2500,
        disableOnInteraction: false,
      };
    }
    if (!!thumbSlides && !!thumbSlides.length) {
      sliderParams.thumbs={ swiper: thumbsSwiper }
      
    }
    return sliderParams;
  };

  // const thumbsParams = {
  //   slideToClickedSlide: true,
  //   slidesPerView: SlidesPerViewValue.AUTO,
  //   centeredSlides: true,
  //   spaceBetween: 10,
  //   getSwiper: updateSwiperThumbs,
  // };

  // useEffect(() => {
  //   if (!!swiper && !!swiperThumbs) {
  //     swiper.controller.control = swiperThumbs;
  //     swiperThumbs.controller.control = swiper;
  //   }
  // }, [swiper, swiperThumbs]);
  
  return (
    <React.Fragment>
      <div
        className={cn('custom-slider-wrapper', {
          'pagination-active': !isPaginationHidden,
          'auto-slides': slidesPerView === SlidesPerViewValue.AUTO,
          'one-slide': slides.length === 1,
        })}
      >
        <div className="custom-slider-inner">
          <Swiper {...getSliderParams()} >
            {slides.map((slide, index) => (
              <SwiperSlide key={index}>{slide}</SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      {!!thumbSlides && !!thumbSlides.length && (
        <div className={cn('thumb-swiper', {
            [`align-${thumbSlidesAlignment}`]: !!thumbSlidesAlignment,
          })}
        >
          <Swiper
          //@ts-ignore
            onSwiper={setThumbsSwiper}
            watchSlidesVisibility
            watchSlidesProgress
            slideToClickedSlide={true}
            slidesPerView={SlidesPerViewValue.AUTO}
            centeredSlides={true}
            spaceBetween={10}
          >
            {thumbSlides.map((slide, index) => (
              <div key={index}>{slide}</div>
            ))}
            </Swiper>
        </div>
      )}
    </React.Fragment>
  );
};
