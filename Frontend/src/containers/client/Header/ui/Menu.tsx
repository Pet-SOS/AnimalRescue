import React from "react";
import {TI18n} from "../../../../i18n";
import {Button, ButtonTypes} from "../../../../components/Button";
import {ReactComponent as HeartLogo} from '../../../../assets/header/heart.svg';
import {Link, NavLink} from'react-router-dom';
import { store } from "../../../../store";
import { actionIsActivePopup } from "../../Home/store/actions";
import "../styles/menu.scss"
import { RULES_PAGE_LINK } from "../../Rules";
import { HOW_TO_HELP_PAGE_LINK } from "../../HowToHelp";
import { HOW_TO_HELP_QUERY_NAME, HelpTypes } from "../../HowToHelp/Component";

export const AppMenu: React.FC = () => {
    return (
        <div className="header-menu">
            <NavLink className="item"  to="/about" activeClassName="is-active">
                <TI18n keyStr="headerMenuItem1" default="О службе"/>
                <ul className="dropdown">
                    <li><NavLink to="/about/help" activeClassName="is-active"><TI18n keyStr="headerMenuItem1Dropdown1" default="Про службу порятунку" /></NavLink></li>
                    <li><NavLink to={`/about${RULES_PAGE_LINK}`} activeClassName="is-active"><TI18n keyStr="headerMenuItem1Dropdown2" default="Правила работы с нами" /></NavLink></li>
                    <li><NavLink to="/about/financial-reports" activeClassName="is-active"><TI18n keyStr="headerMenuItem1Dropdown3" default="Финансовые отчеты"/></NavLink></li>
                </ul>
            </NavLink>
            <div className="item">
                <TI18n keyStr="headerMenuItem2" default="Ищу друга"/>
                <ul className="dropdown">
                    <li><a href="pet-any"><TI18n keyStr="headerMenuItem2Dropdown1" default="Любого"/></a></li>
                    <li><a href="pet-dog"><TI18n keyStr="headerMenuItem2Dropdown2" default="Собачку"/></a></li>
                    <li><a href="pet-cat"><TI18n keyStr="headerMenuItem2Dropdown3" default="Котика"/></a></li>
                    <li><a href="pet-the-loss"><TI18n keyStr="headerMenuItem2Dropdown4" default="Потеряшку"/></a></li>
                </ul>
            </div>
            <NavLink  className="item" to={HOW_TO_HELP_PAGE_LINK} activeClassName="is-active"><TI18n keyStr="headerMenuItem3" default="Как я могу помочь?" />
              <ul className="dropdown">
                <li><NavLink to={`${HOW_TO_HELP_PAGE_LINK}/${HelpTypes.FINANCE}`} activeClassName="is-active"><TI18n keyStr="headerMenuItem3Dropdown1" default="Финансово" /></NavLink></li>
                <li><NavLink to={`${HOW_TO_HELP_PAGE_LINK}/${HelpTypes.STUFF}`} activeClassName="is-active"><TI18n keyStr="headerMenuItem3Dropdown2" default="Вещами" /></NavLink></li>
                <li><NavLink to={`${HOW_TO_HELP_PAGE_LINK}/${HelpTypes.VOLUNTEERING}`} activeClassName="is-active"><TI18n keyStr="headerMenuItem3Dropdown3" default="Волонтерством" /></NavLink></li>
              </ul>
            </NavLink >
            <NavLink to="/blog" activeClassName="is-active" className="item"><TI18n keyStr="blog" default="Блог"/></NavLink>
            <NavLink activeClassName="is-active" className="item" to="/contacts"><TI18n keyStr="contacts" default="Контакты"/></NavLink>
            <div className="item heart"><HeartLogo/></div>
            <Button onClick={() => {store.dispatch(actionIsActivePopup(true))
            }}  styleType={ButtonTypes.Blue}>
                <TI18n keyStr="help" default="Помочь"/>
            </Button>
        </div>
    )
};
