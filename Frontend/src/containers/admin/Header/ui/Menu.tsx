import React from 'react';
import { TI18n } from '../../../../i18n';
import { Button, ButtonTypes } from '../../../../components/Button';
import '../styles/menu.scss';
import { ReactComponent as HeartLogo } from '../../../../assets/header/heart.svg';

export const AppMenu: React.FC = () => {
  return (
    <div className="header-menu">
      <div className="item">
        <TI18n keyStr="headerMenuItem1" default="В приюте" />
      </div>
      <div className="item">
        <TI18n keyStr="headerMenuItem2" default="Наши животные" />
      </div>
      <div className="item">
        <TI18n keyStr="headerMenuItem3" default="Как я могу помочь?" />
      </div>
      <div className="item">
        <TI18n keyStr="blog" default="Блог" />
      </div>
      <div className="item">
        <TI18n keyStr="contacts" default="Контакты" />
      </div>
      <div className="item">
        <HeartLogo />
      </div>
      <Button onClick={() => {}} styleType={ButtonTypes.Blue}>
        <TI18n keyStr="help" default="Помочь" />
      </Button>
    </div>
  );
};
