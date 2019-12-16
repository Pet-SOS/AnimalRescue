import React from 'react';
import {ReactComponent as Logo} from '../../../../assets/header/logo.svg';
import {AppMenu} from './Menu';
import {ChangeLocale, TI18n} from "../../../../i18n";
import {SocialLinks} from "../../../../components/SocialLinks";
import '../styles/header.scss'
import {BottomContent} from "./BottomContent";

interface IPropTypes {
}

const AppHeader: React.FC<IPropTypes> = () => {
    return (
        <header className="dog-background">
            <div className="header">
                <div className="logo-main">
                    <div className="logo"><Logo/></div>
                    <div className="logo-text">
                        <TI18n keyStr="headerTitle" default="Спасение животных в Харькове"/>
                    </div>
                </div>
                <div className="contacts">
                    <div className="phone">
                        <span className="number">+38 097 637 63 43</span>
                        <span className="title"><TI18n keyStr="hotLinePhones" default="Телефоны горячей линии"/></span>
                    </div>
                </div>
                <SocialLinks/>
                <div className="change-locale">
                    <ChangeLocale/>
                </div>
            </div>
            <AppMenu/>
            <BottomContent/>
        </header>
    )
};

export default AppHeader;
