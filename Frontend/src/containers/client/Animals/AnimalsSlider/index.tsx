import React, { useEffect, useState } from 'react';
import { Slider } from '../../../../components/Slider';
import { AnimalCard } from '../AnimalCard';
import { IBlockLinkPropTypes, BlockLink } from '../../../../components/BlockLink';
import './index.scss';

interface IPropTypes {
  data: any[];
  title: string | React.ReactNode;
  link?: IBlockLinkPropTypes
}

export const AnimalsSlider: React.FC<IPropTypes> = ({ data, title, link }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const listener = () => {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener("resize", listener);
    return () => {
      window.removeEventListener("resize", listener);
    };
  }, []);
  
  const getSlideElements = (): React.ReactNode[] => [...data.map(animal => <AnimalCard animal={animal}/>)];
  return (
    <div className="animal-list-holder">
      <h2 className="title">{title}</h2>
      {!!data && !!data.length && <div className="slider-holder">
        <Slider slides={getSlideElements()} slidesPerView={windowWidth > 1023 ? 3 : windowWidth > 600 ? 2.33 : 1.2} spaceBetween={windowWidth > 767 ? 24 : 16} isPaginationHidden={true} isNavigationHidden={windowWidth < 1024}/>
      </div>}
      {!!link && !!link.href && <BlockLink {...link}/>}
    </div>
  )
};