import React from 'react';
import { HelpedBlockItem } from './item';
import { Slider } from '../../../../../components/Slider';
import './index.scss';
import { IBlogItem } from '../../../../../api/blog';
import { Button, ButtonTypes } from '../../../../../components/Button';
import { TI18n } from '../../../../../i18n';

interface IPropTypes {
  data: IBlogItem[];
  title: string | React.ReactNode;
}

export const HelpedBlock: React.FC<IPropTypes> = ({ data, title }) => {
  const getSlideElements = (): React.ReactNode[] => [...data.map(slideData => <HelpedBlockItem story={slideData} />)];
  return (
    <section className="section-helped section-padding">
      <div className="container">
        <h2>{title}</h2>
        {!!data && !!data.length && <div className="slider-holder">
          <Slider slides={getSlideElements()} isSwipeDisable={true}/>
        </div>}
        <div className="btn-wrap">
          <Button href = {'/how-to-help'} styleType={ButtonTypes.Blue}>
                <TI18n keyStr="howCanIHelp" default="Как я могу помочь" />
          </Button>
        </div>
      </div>
    </section>
  )
};