import React, { useState } from "react";
import {TI18n, ChangeLocale} from "../../../../i18n";
import {Button, ButtonTypes} from "../../../../components/Button";
import "../styles/mobileMenu.scss"
import {ReactComponent as HeartLogo} from '../../../../assets/header/heart.svg';
import { SocialLinks } from "../../../../components/SocialLinks";
import { Link } from "react-router-dom";



export const MobileMenu: React.FC = () => {
    let initialState = {
        drop1: false,
        drop2: false,
        drop3: false
    }

    let [stateMenu, setStateMenu] = useState(initialState);
    const createNewStateDrop = (key:string, obj:any)=> {
        let newStateDrop= {...obj};
        newStateDrop[key]= !obj[key]
        return newStateDrop
    }
    const openedMenu = (e: any, element: any) =>{
        e.preventDefault();
        e.stopPropagation();
           let nexState ={};
            setStateMenu(prevState => {
              for (const key in prevState ) {
                if (key === element) {
                    nexState = createNewStateDrop(key, prevState);
                  }
              }
              return {...prevState, ...nexState};
            })
    }
    const stopFloatinUp =(e:any) :void => {
        e.stopPropagation();
    }
    return (
        <div className="header-menu-mobile" onClick={(e)=> stopFloatinUp(e)}>
            <div className="first-menu">
                <div className="contacts-mobile">
                    <div className="phone">
                        <a className="number" href='tel:+38 095 497 81 95'>+38 095 497 81 95</a>
                        <span className="title"><TI18n keyStr="hotLinePhones" default="Телефоны горячей линии"/></span>
                    </div>
                </div>
                <div className= {stateMenu.drop1? 'active item drop': 'item drop'}  onClick={ (e)=> openedMenu(e, 'drop1')}>
                    <div className="drop-icon">
                       <span><TI18n keyStr="headerMenuItem1" default="О службе"/></span>
                        <ul className="dropdown" onClick={(e)=> stopFloatinUp(e)}>
                            <li><a href="rescue-service"><TI18n keyStr="headerMenuItem1Dropdown1" default="О службе спасения"/></a></li>
                            <li><a href="rules-for-working"><TI18n keyStr="headerMenuItem1Dropdown2" default="Правила работы с нами"/></a></li>
                            <li><Link to="/financial-reports"><TI18n keyStr="headerMenuItem1Dropdown3" default="Финансовые отчеты"/></Link></li>
                        </ul>
                    </div>
                </div>
                <div className= {stateMenu.drop2? 'active item drop': 'item drop'} onClick={ (e)=> openedMenu(e, 'drop2')}>
                    <div className="drop-icon">
                         <span><TI18n keyStr="headerMenuItem2" default="Ищу друга"/></span>
                        <ul className="dropdown" onClick={(e)=> stopFloatinUp(e)}>
                            <li><a href="pet-any"><TI18n keyStr="headerMenuItem2Dropdown1" default="Любого"/></a></li>
                            <li><a href="pet-dog"><TI18n keyStr="headerMenuItem2Dropdown2" default="Собачку"/></a></li>
                            <li><a href="pet-cat"><TI18n keyStr="headerMenuItem2Dropdown3" default="Котика"/></a></li>
                            <li><a href="pet-the-loss"><TI18n keyStr="headerMenuItem2Dropdown4" default="Потеряшку"/></a></li>
                        </ul>
                    </div>
                </div>
                <div className= {stateMenu.drop3? 'active item drop': 'item drop'} onClick={ (e)=> openedMenu(e, 'drop3')}>
                    <div className="drop-icon" >
                         <span><TI18n keyStr="headerMenuItem3" default="Как я могу помочь?"/></span>
                        <ul className="dropdown" onClick={(e)=> stopFloatinUp(e)}>
                            <li><a href="help-financially"><TI18n keyStr="headerMenuItem3Dropdown1" default="Финансово"/></a></li>
                            <li><a href="help-things"><TI18n keyStr="headerMenuItem3Dropdown2" default="Вещами"/></a></li>
                            <li><a href="help-volunteering"><TI18n keyStr="headerMenuItem3Dropdown3" default="Волонтерством"/></a></li>
                        </ul>
                    </div>
                </div>
                <div className="item"><TI18n keyStr="blog" default="Блог"/></div>
                <div className="item"><TI18n keyStr="contacts" default="Контакты"/></div>
                <div className="item heart"><TI18n keyStr="headerMenuItem7" default="Понравились"/><HeartLogo className='heart-logo'/></div>
                <Button onClick={() => {}} styleType={ButtonTypes.Blue} className="btn-give">
                    <TI18n keyStr="help" default="Помочь"/>
                </Button>
            </div>
            <div  className="box-social-locale">
                <SocialLinks/>
                <div className="change-locale"><ChangeLocale/></div>
            </div>
        </div>
    )
};
