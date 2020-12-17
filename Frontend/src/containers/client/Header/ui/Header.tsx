import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ReactComponent as Logo } from '../../../../assets/header/logo.svg';
import { AppMenu } from './Menu';
import { ChangeLocale, TI18n } from '../../../../i18n';
import { SocialLinks } from '../../../../components/SocialLinks';
import { store } from '../../../../store/index';
import { PopupInfo } from './PopupInfo';
import { PhoneLink } from '../../../../components/PhoneLink';
import counterImage5 from '../../../../img/counter-images/counter_5.png';
import counterImage6 from '../../../../img/counter-images/counter_6.png';
import counterImage9 from '../../../../img/counter-images/counter_9.png';
import counterImage10 from '../../../../img/counter-images/counter_10.png';
import '../styles/header.scss';
import { ICustomAppState } from '../../../../store/state';
import { Link } from 'react-router-dom';
import { infoContactsCheckAndLoad } from '../../Home/store/selectors';

interface IPropTypes {}

export const AppHeader: React.FC<IPropTypes> = () => {
  const isActivePopup: boolean = useSelector(
    (store: ICustomAppState) => store.homePage.isActivePopup,
  );
  const infoCard: string = store.getState().homePage.infoCard.data.body;
  const [isActiveMenu, setIsActiveMenu] = useState(false);
  useEffect(() => {
    infoContactsCheckAndLoad();
  }, []);
  return (
    <header className={isActiveMenu ? 'nav-active' : ''}>
      <div className="container">
        <div className="header-content">
          <div className="header-top">
            <div className="logo-main">
              <Link className="logo" to="/">
                <Logo />
              </Link>
              <div className="logo-text">
                <TI18n
                  keyStr="headerTitle"
                  default="Спасение животных Харьков"
                />
              </div>
            </div>
            <PhoneLink />
            <div className="box-social-locale-header">
              <SocialLinks />
              <div className="change-locale">
                <ChangeLocale />
              </div>
            </div>
          </div>
          <div className="wrap-navigation">
            <div
              className="band nav-opener"
              onClick={e => {
                e.stopPropagation();
                e.preventDefault();
                setIsActiveMenu(!isActiveMenu);
              }}
            >
              <span>Open</span>
            </div>
            <nav
              className="header-menu"
              onClick={e => {
                e.stopPropagation();
                e.preventDefault();
                setIsActiveMenu(!isActiveMenu);
              }}
            >
              <AppMenu />
            </nav>
          </div>
        </div>
      </div>
      {isActivePopup ? (
        <PopupInfo
          boxImages={[
            counterImage5,
            counterImage9,
            counterImage6,
            counterImage10,
          ]}
          title={
            <TI18n keyStr="popupInfoBlockTitle" default="Помощь животным" />
          }
          card={infoCard}
          textFirst={
            <TI18n
              keyStr="popupBlockFirstText"
              default="Если Вы хотите помочь нам и нашим подопечным, переведите любую сумму на карту Приватбанка:"
            />
          }
          textSecond={
            <TI18n keyStr="popupBlockSecondText" default="Также нам нужны:" />
          }
          textThird={
            <TI18n
              keyStr="popupBlockThirdText"
              default="люди, у которых есть потребность и возможность передерживать у себя животное (от малыша до взрослой особи) до момента усыновления;"
            />
          }
          textThirdTwo={
            <TI18n
              keyStr="popupBlockThirdTextTwo"
              default="специалисты с нестандартными и интересными вариантами фото и видеосъемки наших животных для сайта."
            />
          }
        />
      ) : (
        ''
      )}
    </header>
  );
};
