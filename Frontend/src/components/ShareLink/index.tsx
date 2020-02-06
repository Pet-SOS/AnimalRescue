import React from 'react';
import './index.scss';

export interface IPropTypes {
  link: string;
  text?: string | React.ReactNode
}

export const ShareLink: React.FC<IPropTypes> = ({ link, text }) => (
  <a className="facebook-share" target='_blank' href={`https://www.facebook.com/sharer/sharer.php?u=${link}`}>
    <div className='share-wrapper'>
      <span>{text}</span>
    </div>
  </a>
)