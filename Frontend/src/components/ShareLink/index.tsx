import React from 'react';
import './index.scss';

export interface IPropTypes {
  link: string;
  text?: string | React.ReactNode;
}

export const ShareLink: React.FC<IPropTypes> = ({ link, text }) => (
  <div className="facebook-share">
    <a
      className="share-wrapper"
      target="_blank"
      href={`https://www.facebook.com/sharer/sharer.php?u=${link}`}
    >
      <i className="icon-fb">icon</i>
      <span>{text}</span>
    </a>
  </div>
);
