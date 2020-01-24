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
  const [slidesPerView, setSlidesPerView] = useState(3);
  useEffect(() => {
    const listener = () => {
      setWindowWidth(window.innerWidth);
      setSlidesPerView(window.innerWidth > 1023 ? 3 : window.innerWidth > 600 ? 2.33 : 1.2);
    }
    window.addEventListener('resize', listener);
    return () => {
      window.removeEventListener('resize', listener);
    };
  }, []);
  
  const getSlideElements = (): React.ReactNode[] => [...data.map(animal => <AnimalCard animal={animal}/>)];
  return (
    <div className="animal-slider-holder">
      <div className="content">
        <h2 className="title">{title}</h2>
        {!!data && !!data.length && <div className="slider-holder">
          <Slider
            slides={getSlideElements()}
            slidesPerView={slidesPerView}
            spaceBetween={windowWidth > 767 ? -16 : -24}
            isPaginationHidden={true}
            isNavigationHidden={windowWidth < 1024}
            isSwipeDisable={windowWidth > 1023 || !data || data.length <= Math.floor(slidesPerView)}
          />
        </div>}
        {!!link && !!link.href && <BlockLink {...link} />}
      </div>
    </div>
  )
};