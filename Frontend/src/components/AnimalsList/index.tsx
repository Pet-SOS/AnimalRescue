import React from 'react';
import { Slider } from '../Slider';
import { AnimalListItem } from './item';
import { IBlockLinkPropTypes, BlockLink } from '../BlockLink';
import './index.scss';

interface IPropTypes {
  data: any[];
  title: string | React.ReactNode;
  link?: IBlockLinkPropTypes
}

export const AnimalsList: React.FC<IPropTypes> = ({ data, title, link }) => {
  const getSlideElements = (): React.ReactNode[] => [...data.map(animal => <AnimalListItem animal={animal}/>)];
  return (
    <div className="animal-list-holder">
      <h2 className="title">{title}</h2>
      {!!data && !!data.length && <div className="slider-holder">
        <Slider slides={getSlideElements()} slidesPerView={3} spaceBetween={24} isPaginationHidden={true}/>
      </div>}
      {!!link && !!link.href && <BlockLink {...link}/>}
    </div>
  )
};