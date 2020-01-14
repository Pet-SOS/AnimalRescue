import React from 'react';
import './index.scss';
import { AlreadyHelpBlockItem } from './item';
import { SwiperSlider } from '../SwipeSlider';

interface IPropTypes {
  data: any[];
  title: string | React.ReactNode;
}

export const AlreadyHelpBlock: React.FC<IPropTypes> = ({ data, title }) => {
  const getSlideElements = () => {
    return [...data.map(slideData => <AlreadyHelpBlockItem slideData={slideData} />)]
  }
  return (
    <div className="helped-holder">
      <div className="title">{title}</div>
      {!!data && !!data.length && <div className="slider-holder">
        <SwiperSlider data={getSlideElements()} isNavigationShow={true} isPaginationShow={true} slidesPerView={1}/>
      </div>}
    </div>
  )
};