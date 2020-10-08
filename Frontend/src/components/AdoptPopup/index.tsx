import React, { useState } from 'react';
import { useSelector, shallowEqual, Provider } from 'react-redux';
import { message } from 'antd';
import { selectInfoContacts } from '../../containers/client/Home/store/selectors';
import { TI18n } from '../../i18n';
import { store } from '../../store';
import heartImage from '../../img/heart.png';
import './index.scss';
import { Button, ButtonTypes } from '../Button';
import { postAnimalAdoptionRequest } from '../../api/animals';

interface IPropTypes {
  onClose: () => void;
  AnimalName: string;
  AnimalId: string | undefined;
}

export const AdoptPopup: React.FC<IPropTypes> = ({ onClose, AnimalId, AnimalName }) => {
  const { phones } = useSelector(() => selectInfoContacts(store.getState()).data, shallowEqual);
  const [AdoptiveName, setAdoptiveName] = useState('');
  const [PhoneNumber, setPhoneNumber] = useState('');
  const [errors, setErrors] = useState<{ phone: null | JSX.Element }>({
    phone: null,
  })
  const handleSubmit = async () => {
    if (!PhoneNumber) {
      setErrors({ ...errors, phone: <TI18n keyStr="thisFieldIsRequired" default="Обов'язкове поле" /> })
      return;
    } else if (!/^[+()0-9]+$/.test(PhoneNumber)) {
      setErrors({ ...errors, phone: <TI18n keyStr="invalidPhoneNumberFormat" default="Неправильний формат номеру" /> })
      return;
    }
    setErrors({ ...errors, phone: null });

    const key = 'sendingRequest';
    message.loading({
      content: <Provider store={store}>
        <TI18n keyStr="loading" default="Завантаження..." />
      </Provider>, 
      key,
    })
    try {
      await postAnimalAdoptionRequest({ 
        AdoptiveName, 
        PhoneNumber, 
        AnimalId, 
        AnimalName,
      });
      message.success({
        content: (
          <Provider store={store}>
            <TI18n keyStr="requestHasBeenSent" default="Ваш запит успішно надіслано" />
          </Provider>
        ),
        key
      });
    } catch {
      message.error({
        content: (
          <Provider store={store}>
            <TI18n keyStr="smthWentWrong" default="Щось пішло не так... Спробуйте, будь ласка, спробуйте пізніше" />
          </Provider>
        ),
        key,
      });
    } finally {
      onClose();
    }
  }
  const handleNameChange = (e: { target: { value: string } }) => setAdoptiveName(e.target.value);
  const handlePhoneChange = (e: { target: { value: string } }) => setPhoneNumber(e.target.value);

  return (
    <div className='adopt-popup-wrapper'>
      <div className='adopt-popup-holder'>
        <div className='popup-head'>
          <h2>
            <TI18n keyStr="adoptPopupTitle" default="Хочу забрати тварину додому" />
          </h2>
          <img src={heartImage} alt="heart" />
          <Button
              styleType={ButtonTypes.Close}
              onClick={onClose}
          />
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
            <input type="text" name="AdoptiveName" placeholder='Имя' value={AdoptiveName} onChange={handleNameChange}/>
            <input className={errors.phone ? 'validation-error' : ''} type="text" name="PhoneNumber" placeholder='Телефон' value={PhoneNumber} onChange={handlePhoneChange} />
            {errors.phone && (
              <div className="validation-message">
                {errors.phone}
              </div>
            )}
            <Button styleType={ButtonTypes.Blue} onClick={handleSubmit}>
              <TI18n keyStr="callBack" default="Перезвоните мне" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
