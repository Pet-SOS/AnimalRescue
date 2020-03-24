import React from 'react';
import {SocialLinks} from "../../../../components/SocialLinks";
import {Button, ButtonTypes} from "../../../../components/Button";
import {ChangeLocale, TI18n} from '../../../../i18n';
import { PhoneLink } from '../../../../components/PhoneLink';
import { SelectExpandDirections } from '../../../../components/Select';
import '../styles/footer.scss';
import { NavLink } from 'react-router-dom';
import { RULES_PAGE_LINK } from '../../Rules/index';
import { HELP_PAGE_LINKS } from '../../HowToHelp/index';
import { actionIsActivePopup } from '../../Home/store/actions';
import { store } from '../../../../store';

export const AppFooter: React.FC = () =>  (
  <footer className="footer">
    <div className="container">
      <div className="footer-top">
        <nav>
          <ul className="footer-nav">
            <li>
              <NavLink to="/about" className="head-link">
                <TI18n keyStr="footerAbout" default="О службе" />
              </NavLink>
              <ul className="sub-list">
                <li>
                  <NavLink to="/about">
                    <TI18n keyStr="footerAboutRescue" default="О службе спасения" />
                  </NavLink>
                </li>
                <li>
                  <NavLink to={`/about${RULES_PAGE_LINK}`}>
                    <TI18n keyStr="footerRules" default="Правила работы" />
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/about/financial-reports">
                    <TI18n keyStr="financeReadout" default="Финансовый отсчет" />
                  </NavLink>
                </li>
              </ul>
            </li>
            <li>
              <NavLink to={HELP_PAGE_LINKS.default} className="head-link">
                <TI18n keyStr="footerHowToHelp" default="Как помочь" />
              </NavLink>
              <ul className='sub-list'>
                <li>
                  <NavLink to={HELP_PAGE_LINKS.finance}>
                    <TI18n keyStr="footerWithFinance" default="Финансово" />
                  </NavLink>
                </li>
                <li>
                  <NavLink to={HELP_PAGE_LINKS.stuff}>
                    <TI18n keyStr="footerStuff" default="Вещами" />
                  </NavLink>
                </li>
                <li>
                  <NavLink to={HELP_PAGE_LINKS.volunteering}>
                    <TI18n keyStr="footerVolunteering" default="Волонтерство" />
                  </NavLink>
                </li>
              </ul>
            </li>
            <li>
              <NavLink to='/animals/page/1'><TI18n keyStr="headerMenuItem2" default="Ищу друга" /></NavLink>
            </li>
            <li>
              <NavLink to="/blog/page/1">
                <TI18n keyStr="blog" default="Блог" />
              </NavLink>
            </li>
            <li>
              <NavLink to="/contacts">
                <TI18n keyStr="contacts" default="Контакты" />
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className="add-content">
          <PhoneLink/>
          <SocialLinks />
          <Button onClick={() => { store.dispatch(actionIsActivePopup(true)) }} styleType={ButtonTypes.Blue}>
            <TI18n keyStr="help" default="Помочь" />
          </Button>
        </div>
      </div>
      <div className="footer-bottom">
        <ul className="list">
          <li className="copyright">&copy; 2019 - 2020</li>
          <li><TI18n keyStr="footerOrganization" default="Общественная организация «Спасение животных Харьков»" /></li>
          <li><TI18n keyStr="footerRights" default="Все права защищены" /></li>
        </ul>
        <ChangeLocale expandDirection={SelectExpandDirections.TOP}/>
      </div>
    </div>
  </footer>
);