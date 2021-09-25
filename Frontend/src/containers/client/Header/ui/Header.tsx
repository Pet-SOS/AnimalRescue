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
import { infoContactsCheckAndLoad, helpPopupCheckAndLoad, availableLanguagesCheckAndLoad } from '../../Home/store/selectors';

interface IPropTypes {}

export const AppHeader: React.FC<IPropTypes> = () => {
  const appLanguage: string = useSelector(
    (store: ICustomAppState) => store.appLanguage,
  )
  const isActivePopup: boolean = useSelector(
    (store: ICustomAppState) => store.homePage.isActivePopup,
  );
  const infoCard: string = store.getState().homePage.infoCard.data.body;
  const paragraphs: any = store.getState().homePage.helpPopup.data.paragraphs;
  const title: string = paragraphs[0].values.find((v: any) => v.lang === appLanguage).value;
  const firstParagraph: string = paragraphs[1].values.find((v: any) => v.lang === appLanguage).value;
  const secondParagraph: string = paragraphs[2].values.find((v: any) => v.lang === appLanguage).value;
  const [isActiveMenu, setIsActiveMenu] = useState(false);
  useEffect(() => {
    infoContactsCheckAndLoad();
    helpPopupCheckAndLoad();
    availableLanguagesCheckAndLoad();
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
          title={title}
          card={infoCard}
          textFirst={firstParagraph}
          textSecond={secondParagraph}
        />
      ) : (
        ''
      )}
    </header>
  );
};
