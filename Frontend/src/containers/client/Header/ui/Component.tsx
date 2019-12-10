import React from 'react';
import {ReactComponent as Logo} from '../../../../assets/header/logo.svg';
import {AppMenu} from './Menu';
import {ChangeLocale, TI18n} from "../../../../i18n";
import {SocialLinks} from "../../../../components/SocialLinks";
import '../styles/header.scss'
import {PageLayout} from "../../../../components/PageLayout";

interface IPropTypes {
}

const AppHeader: React.FC<IPropTypes> = () => {

    return (
        <div className="app-header"
             style={{background: `url(${require('../../../../assets/header/background/dog_1.png')}) no-repeat`}}>
            <PageLayout>
                <div className="header">
                    <div className="logo-main">
                        <div className="logo"><Logo/></div>
                        <div className="logo-text">
                            <TI18n keyStr="headerTitle" default="Спасение животных в Харькове"/>
                        </div>
                    </div>
                    <div className="logo-contacts">
                        <div className={"phone"}>
                            <p className={"title"}><TI18n keyStr="hotLinePhones" default="Телефоны горячей линии"/></p>
                            <p className={"number"}>+38 097 637 63 43 +38 095 497 81 95</p>
                        </div>
                    </div>
                    <SocialLinks/>
                    <ChangeLocale/>
                </div>
                <AppMenu/>
            </PageLayout>
        </div>
    )
};

export default AppHeader;
