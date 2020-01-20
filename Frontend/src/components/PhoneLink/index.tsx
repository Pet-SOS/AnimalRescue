import React from 'react';
import { ReactComponent as Phone } from './../../assets/header/iphone.svg';
import { TI18n } from "./../../i18n";
import './index.scss';

export const PhoneLink: React.FC = () => (
  <div className="phone-block">
    <div className="icon-phone"><Phone /></div>
    <div className="phone">
      <a className="number" href='tel:+38 095 497 81 95'>+38 095 497 81 95</a>
      <span className="title"><TI18n keyStr="hotLinePhones" default="Телефоны горячей линии" /></span>
    </div>
  </div>
);

