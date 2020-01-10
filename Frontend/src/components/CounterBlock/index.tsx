import React from 'react';
import './index.scss';
import { CounterNumber } from './number';

interface IPropTypes {
  backgroundColor: string;
  count: number | string;
  images: string[];
  title: string | React.ReactNode;
  text?: string | React.ReactNode;
}

export const CounterBlock: React.FC<IPropTypes> = ({ backgroundColor, count, title, images, text}) => {
  return (
    <div className="counter-holder" style={{backgroundColor}}>
      <div className="counter">
        {`${!!count ? count : 0}`.split('').map((number, index) => (
          <CounterNumber number={number} key={index}/>
        ))}
      </div>
      <div className="title">{title}</div>
      {!!text ? <span className="text"> {text}</span> : null}
      <div className="image-holder">
        {images.slice(0, 8).map((img, index) => (
          <img src={img} key={index} alt='pet'/>
        ))}
      </div>
    </div>
  )
}