import React from "react";
import { Link } from "react-router-dom";
import {TI18n} from "../../../../i18n";
import {Button, ButtonTypes} from "../../../../components/Button";
import "../styles/menu.scss"
import {ReactComponent as HeartLogo} from '../../../../assets/header/heart.svg';

export const AppMenu: React.FC = () => {
    return (
        <div className="header-menu">
            <div className="item">
                <TI18n keyStr="headerMenuItem1" default="О службе"/>
                <ul className="dropdown">
                    <li><Link to="/about"><TI18n keyStr="headerMenuItem1Dropdown1" default="Про службу порятунку" /></Link></li>
                    <li><Link to="/rules"><TI18n keyStr="headerMenuItem1Dropdown2" default="Правила работы с нами" /></Link></li>
                    <li><a href="financial-reports"><TI18n keyStr="headerMenuItem1Dropdown3" default="Финансовые отчеты"/></a></li>
                </ul>
            </div>
            <div className="item">
                <TI18n keyStr="headerMenuItem2" default="Ищу друга"/>
                <ul className="dropdown">
                    <li><a href="pet-any"><TI18n keyStr="headerMenuItem2Dropdown1" default="Любого"/></a></li>
                    <li><a href="pet-dog"><TI18n keyStr="headerMenuItem2Dropdown2" default="Собачку"/></a></li>
                    <li><a href="pet-cat"><TI18n keyStr="headerMenuItem2Dropdown3" default="Котика"/></a></li>
                    <li><a href="pet-the-loss"><TI18n keyStr="headerMenuItem2Dropdown4" default="Потеряшку"/></a></li>
                </ul>
            </div>
            <div className="item">
                <TI18n keyStr="headerMenuItem3" default="Как я могу помочь?"/>
                <ul className="dropdown">
                    <li><a href="help-financially"><TI18n keyStr="headerMenuItem3Dropdown1" default="Финансово"/></a></li>
                    <li><a href="help-things"><TI18n keyStr="headerMenuItem3Dropdown2" default="Вещами"/></a></li>
                    <li><a href="help-volunteering"><TI18n keyStr="headerMenuItem3Dropdown3" default="Волонтерством"/></a></li>
                </ul>
            </div>
            <div className="item"><TI18n keyStr="blog" default="Блог"/></div>
        <div className="item"><TI18n keyStr="contacts" default="Контакты"/></div>
            <div className="item heart"><HeartLogo/></div>
            <Button onClick={() => {}} styleType={ButtonTypes.Blue}>
                <TI18n keyStr="help" default="Помочь"/>
            </Button>
        </div>
    )
};
