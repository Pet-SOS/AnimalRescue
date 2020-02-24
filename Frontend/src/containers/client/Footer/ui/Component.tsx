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
    <div className="content">
      <div className="footer-top">
        <div className="column">
          <ul>
            <li>
              <NavLink to="/about" className="head-link">
                <TI18n keyStr="footerAbout" default="О службе" />
              </NavLink>
            </li>
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
          <ul>
            <li>
              <a href="" className="head-link">
              <NavLink to='/animals/page/1'><TI18n keyStr="animals" default="Животные" /></NavLink>
              </a>
            </li>
          </ul>
          <ul>
            <li>
              <NavLink to={HELP_PAGE_LINKS.default} className="head-link">
                <TI18n keyStr="footerHowToHelp" default="Как помочь" />
              </NavLink>
            </li>
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
          <div className="custom-list">
            <ul>
              <li>
                <NavLink to="/blog/page/1" className="head-link">
                  <TI18n keyStr="blog" default="Блог" />
                </NavLink>
              </li>
              <li>
                <NavLink className="head-link" to="/contacts">
                  <TI18n keyStr="contacts" default="Контакты" />
                </NavLink>
              </li>
            </ul>
            <SocialLinks />
          </div>
        </div>
        <div className="column">
          <PhoneLink/>
          <Button onClick={() => { store.dispatch(actionIsActivePopup(true)) }} styleType={ButtonTypes.Blue}>
            <TI18n keyStr="help" default="Помочь" />
          </Button>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="rights">
          <span>
            &copy; 2019 - 2020
          </span>
          <span>
            <TI18n keyStr="footerOrganization" default="Общественная организация «Спасение животных Харьков»" />
          </span>
          <span>
            <TI18n keyStr="footerRights" default="Все права защищены" />
          </span>
        </div>
        <ChangeLocale expandDirection={SelectExpandDirections.TOP}/>
      </div>
    </div>
  </footer>
);