import React from 'react';
import { ReactComponent as Logo } from '../../../../assets/header/logo.svg';
import { ChangeLocale, TI18n } from '../../../../i18n';
import { SocialLinks } from '../../../../components/SocialLinks';
import '../styles/header.scss';

interface IPropTypes {}

export const AdminHeader: React.FC<IPropTypes> = () => (
  <header>
    <div className="header">
      <div className="logo-main">
        <div className="logo">
          <Logo />
        </div>
        <div className="logo-text">
          <TI18n keyStr="headerTitle" default="Спасение животных Харьков" />
        </div>
      </div>
      <div className="logo-main">
        <div className="logo-text">ADMIN</div>
      </div>
      <SocialLinks />
      <div className="change-locale">
        <ChangeLocale />
      </div>
    </div>
  </header>
);
