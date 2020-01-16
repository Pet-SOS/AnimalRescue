import React from 'react';
import { HelpedBlockItem } from './item';
import { SwiperSlider } from '../SwipeSlider';
import './index.scss';

interface IPropTypes {
  data: any[];
  title: string | React.ReactNode;
}

export const HelpedBlock: React.FC<IPropTypes> = ({ data, title }) => {
  const getSlideElements = (): React.ReactNode[] => [...data.map(slideData => <HelpedBlockItem slideData={slideData} />)];
  return (
    <div className="helped-holder">
      <div className="title">{title}</div>
      {!!data && !!data.length && <div className="slider-holder">
        <SwiperSlider slides={getSlideElements()} />
      </div>}
    </div>
  )
};