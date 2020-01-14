import React from 'react';
import {ReactComponent as Logo} from '../../../../assets/header/logo.svg';
import {ReactComponent as Phone} from '../../../../assets/header/iphone.svg';
import {AppMenu} from './Menu';
import {ChangeLocale, TI18n} from "../../../../i18n";
import {SocialLinks} from "../../../../components/SocialLinks";
import '../styles/header.scss'
import {BottomContent} from "./BottomContent";

interface IPropTypes {
}

const AppHeader: React.FC<IPropTypes> = () => {
    return (
        <header>
            <div className="content">
                <div className="header">
                    <div className="logo-main">
                        <div className="logo"><Logo/></div>
                        <div className="logo-text">
                            <TI18n keyStr="headerTitle" default="Спасение животных в Харькове"/>
                        </div>
                    </div>
                    <div className="contacts">
                        <div className="icon-phone"><Phone/></div>
                        <div className="phone">
                            <span className="number">+38 095 497 81 95</span>
                            <span className="title"><TI18n keyStr="hotLinePhones" default="Телефоны горячей линии"/></span>
                        </div>
                    </div>
                    <div className="box-social-locale">
                        <SocialLinks/>
                        <div className="change-locale"><ChangeLocale/></div>
                    </div>
                </div>
                <AppMenu/>
            </div>
        </header>
    )
};

export default AppHeader;
