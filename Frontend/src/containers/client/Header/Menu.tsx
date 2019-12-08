import React from "react";
import "./menu.scss"
import {ReactComponent as HeartLogo} from './heart.svg';

export const AppMenu: React.FC = () => {
    return (
        <div className={"menu"}>
            <div className={"item"}>В приюте</div>
            <div className={"item"}>Наши животные</div>
            <div className={"item"}>Как я могу помочь?</div>
            <div className={"item"}>Блог</div>
            <div className={"item"}>Контакты</div>
            <div className={"item"}><HeartLogo/></div>
            <div className={"help-button"}>Помощь</div>
        </div>
    )
};
