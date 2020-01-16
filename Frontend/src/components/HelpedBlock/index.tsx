import React from 'react';
import { HelpedBlockItem } from './item';
import { Slider } from '../Slider';
import './index.scss';
import { IAnimal } from '../../api/animals';

interface IPropTypes {
  data: IAnimal[];
  title: string | React.ReactNode;
}

export const HelpedBlock: React.FC<IPropTypes> = ({ data, title }) => {
  const getSlideElements = (): React.ReactNode[] => [...data.map(slideData => <HelpedBlockItem animal={slideData} />)];
  return (
    <div className="helped-holder">
      <h2 className="title">{title}</h2>
      {!!data && !!data.length && <div className="slider-holder">
        <Slider slides={getSlideElements()} />
      </div>}
    </div>
  )
};