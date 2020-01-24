import React from 'react';
import { HelpedBlockItem } from './item';
import { Slider } from '../../../../../components/Slider';
import './index.scss';
import { IBlogItem } from '../../../../../api/blog';

interface IPropTypes {
  data: IBlogItem[];
  title: string | React.ReactNode;
}

export const HelpedBlock: React.FC<IPropTypes> = ({ data, title }) => {
  const getSlideElements = (): React.ReactNode[] => [...data.map(slideData => <HelpedBlockItem story={slideData} />)];
  return (
    <div className="helped-holder">
      <div className="content">
        <h2 className="title">{title}</h2>
        {!!data && !!data.length && <div className="slider-holder">
          <Slider slides={getSlideElements()} isSwipeDisable={true}/>
        </div>}
      </div>
    </div>
  )
};