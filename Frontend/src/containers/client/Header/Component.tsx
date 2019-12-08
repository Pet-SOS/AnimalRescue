import React from 'react';
import './header.scss'
import './page.scss'
import {ReactComponent as Logo} from './logo.svg';
import {AppMenu} from './Menu';
import {ReactComponent as FacebookLogo} from './facebook.svg';
import {ReactComponent as TwitterLogo} from './twitter.svg';
import {ReactComponent as YoutubeLogo} from './youtube.svg';

const AppHeader: React.FC = () => {
    return (
        <div className={'page'}>
            <div className={"header"}>
                <div className={"logo-contacts"}>
                    <div className={"logo"}><Logo/></div>
                    <div className={"logo-text"}>
                        Спасение животных в Харькове
                    </div>
                    <div className={"phone"}>
                        <p className={"title"}>Телефоны горячей линии</p>
                        <p className={"number"}>+38 097 637 63 43 +38 095 497 81 95</p>
                    </div>
                </div>
                <FacebookLogo/>
                <TwitterLogo/>
                <YoutubeLogo/>
                <div className={"language"}>{`^RU`}</div>
            </div>
            <AppMenu/>
        </div>
    )
};

export default AppHeader;
