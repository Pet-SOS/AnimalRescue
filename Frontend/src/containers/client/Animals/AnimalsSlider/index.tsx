import React, { useEffect, useState } from 'react';
import { Slider } from '../../../../components/Slider';
import { AnimalCard } from '../AnimalCard';
import { IBlockLinkPropTypes, BlockLink } from '../../../../components/BlockLink';
import './index.scss';
import { ButtonTypes, Button } from '../../../../components/Button';

interface IPropTypes {
  data: any[];
  title: string | React.ReactNode;
  link?: IBlockLinkPropTypes
}

export const AnimalsSlider: React.FC<IPropTypes> = ({ data, title, link }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [slidesPerView, setSlidesPerView] = useState(3);
  useEffect(() => {
    const setWindowParams = () => {
      setWindowWidth(window.innerWidth);
      setSlidesPerView(window.innerWidth > 1023 ? 3 : window.innerWidth > 600 ? 2.33 : 1.2);
    }
    setWindowParams();
    window.addEventListener('resize', setWindowParams);
    return () => {
      window.removeEventListener('resize', setWindowParams);
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
        {!!link && !!link.href && 
          <div className="bottomButton">
            <Button href = {link.href} styleType={ButtonTypes.Blue}>
                  {link.title}
            </Button>
          </div>
        }
      </div>
    </div>
  )
};