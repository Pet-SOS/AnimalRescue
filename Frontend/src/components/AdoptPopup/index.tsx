import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { selectInfoContacts } from '../../containers/client/Home/store/selectors';
import { TI18n } from '../../i18n';
import { store } from '../../store';
import heartImage from '../../img/heart.png';
import './index.scss';
import { Button, ButtonTypes } from '../Button';

interface IPropTypes {
  onClose?: () => void;
}

export const AdoptPopup: React.FC<IPropTypes> = ({ onClose }) => {
  const { phones } = useSelector(() => selectInfoContacts(store.getState()).data, shallowEqual);
  return (
    <div className='adopt-popup-wrapper'>
      <div className='adopt-popup-holder'>
        <div className='popup-head'>
          <Button
            styleType={ButtonTypes.Close}
            onClick={onClose}
          />
          <h2 className='title'>
            <TI18n keyStr="adoptPopupTitle" default="Хочу забрати тварину додому" />
          </h2>
          <img src={heartImage} alt="heart" />
        </div>
        <div className='popup-content'>
          <p>
            <TI18n keyStr="adoptPopupText1" default="Мы рады, что вам приглянулся наш пушистик!" />
          </p>
          <p>
            <TI18n keyStr="adoptPopupText2" default="Чтобы забрать его к себе, " />
            {!!phones && !!phones[0] && (
              <React.Fragment>
                <TI18n keyStr="adoptPopupText3" default="позвоните нам по номеру " />
                <a className='phone' href={`tel:${phones[0]}}`}>{phones[0]}</a>
                <TI18n keyStr="adoptPopupText4" default=" или " />
              </React.Fragment>
            )}
            <TI18n keyStr="adoptPopupText5" default="оставьте нам свои контакты и мы сами вам перезвоним." />
          </p>
          <form>
            <input type="text" placeholder='Имя' />
            <input type="text" placeholder='Телефон' />
            <Button styleType={ButtonTypes.Blue}>
              <TI18n keyStr="callBack" default="Перезвоните мне" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}