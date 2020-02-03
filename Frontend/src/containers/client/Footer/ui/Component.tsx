import React from 'react';
import {SocialLinks} from "../../../../components/SocialLinks";
import {Button, ButtonTypes} from "../../../../components/Button";
import {ChangeLocale, TI18n} from '../../../../i18n';
import { PhoneLink } from '../../../../components/PhoneLink';
import { SelectExpandDirections } from '../../../../components/Select';
import '../styles/footer.scss';

export const AppFooter: React.FC = () =>  (
  <footer className="footer">
    <div className="content">
      <div className="footer-top">
        <div className="column">
          <ul>
            <li>
              <a href="" className="head-link">
                <TI18n keyStr="footerAbout" default="О службе" />
              </a>
            </li>
            <li>
              <a href="">
                <TI18n keyStr="footerAboutRescue" default="О службе спасения" />
              </a>
            </li>
            <li>
              <a href="">
                <TI18n keyStr="footerRules" default="Правила работы" />
              </a>
            </li>
            <li>
              <a href="">
                <TI18n keyStr="financeReadout" default="Финансовый отсчет" />
              </a>
            </li>
          </ul>
          <ul>
            <li>
              <a href="" className="head-link">
                <TI18n keyStr="animals" default="Животные" />
              </a>
            </li>
            <li>
              <a href="">
                <TI18n keyStr="footerDogs" default="Собачки" />
              </a>
            </li>
            <li>
              <a href="">
                <TI18n keyStr="footerCats" default="Котики" />
              </a>
            </li>
            <li>
              <a href="">
                <TI18n keyStr="footerLosts" default="Потеряшки" />
              </a>
            </li>
          </ul>
          <ul>
            <li>
              <a href="" className="head-link">
                <TI18n keyStr="footerHowToHelp" default="Как помочь" />
              </a>
            </li>
            <li>
              <a href="">
                <TI18n keyStr="footerWithFinance" default="Финансово" />
              </a>
            </li>
            <li>
              <a href="">
              <TI18n keyStr="footerStuff" default="Вещами" />
              </a>
            </li>
            <li>
              <a href="">
                <TI18n keyStr="footerVolunteering" default="Волонтерство" />
              </a>
            </li>
          </ul>
          <div className="custom-list">
            <ul>
              <li>
                <a href="" className="head-link">
                  <TI18n keyStr="blog" default="Блог" />
                </a>
              </li>
              <li>
                <a href="" className="head-link">
                  <TI18n keyStr="contacts" default="Контакты" />
                </a>
              </li>
            </ul>
            <SocialLinks />
          </div>
        </div>
        <div className="column">
          <PhoneLink/>
          <Button onClick={() => { }} styleType={ButtonTypes.Blue}>
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