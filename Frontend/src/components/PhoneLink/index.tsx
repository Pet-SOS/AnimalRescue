import React, { useState } from 'react';
import { ReactComponent as Phone } from './../../assets/header/iphone.svg';
import { TI18n } from './../../i18n';

import './index.scss';
import { store } from '../../store';

export const PhoneLink: React.FC<any> = () => {
  const [phoneNumber, setPhoneNumber] = useState(['']);
  store.subscribe(() => {
    setPhoneNumber(store.getState().homePage.infoContacts.data.phones);
  });
  return (
    <div className="phone-block">
      <div className="icon-holder">
        <i className="icon-phone"></i>
      </div>
      <div className="phone">
        <a className="number" href={`tel:${phoneNumber[0]}`}>
          {phoneNumber[0]}
        </a>
        <span className="title">
          <TI18n keyStr="hotLinePhones" default="Телефоны горячей линии" />
        </span>
      </div>
    </div>
  );
};
