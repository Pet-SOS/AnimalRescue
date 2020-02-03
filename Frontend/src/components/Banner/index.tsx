import React from 'react';
import './index.scss';

export interface IBannerPropTypes {
  title?: string | React.ReactNode;
  subTitle?: string | React.ReactNode;
  imgLink?: string;
}

export const Banner: React.FC<IBannerPropTypes> = ({ title, subTitle, imgLink }) => {
  const bgStyle = !!imgLink ? { backgroundImage: `url(${imgLink}` } : {};
  return (
    <div style={bgStyle} className='banner custom-banner'>
      {!!title && <div className='banner-title'>{title}</div>}
      {!!subTitle && <div className='banner-subtitle'>{subTitle}</div>}
    </div>
  )
}