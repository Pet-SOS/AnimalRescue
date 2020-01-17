import React, { useState } from 'react';
import {ReactComponent as Logo} from '../../../../assets/header/logo.svg';
import {ReactComponent as Phone} from '../../../../assets/header/iphone.svg';
import {AppMenu} from './Menu';
import {ChangeLocale, TI18n} from "../../../../i18n";
import {SocialLinks} from "../../../../components/SocialLinks";
import {store} from '../../../../store/index';

import { PopupInfo } from './PopupInfo';
import '../styles/header.scss'
import { MobileMenu } from './MobileMenu';
import counterImage5 from '../../../../img/counter-images/counter_5.png';
import counterImage6 from '../../../../img/counter-images/counter_6.png';
import counterImage9 from '../../../../img/counter-images/counter_9.png';
import counterImage10 from '../../../../img/counter-images/counter_10.png';

interface IPropTypes {
}

const AppHeader: React.FC<IPropTypes> = () => {
    let [isActivePopup, setIsActivePopup] = useState(0);
    store.subscribe(() =>{
        isActivePopup = store.getState().homePage.isActivePopup;
        setIsActivePopup(store.getState().homePage.isActivePopup); 
    })
    
    let [isActiveMenu, setIsActiveMenu] = useState(false);


    return (
        <header>
            <div className="content">
                <div className="header">
                <div className="box-menu-logo">
                    <div className='box-mobile' onClick={(e)=> {
                        e.stopPropagation();
                        e.preventDefault();
                        setIsActiveMenu(!isActiveMenu)}}>
                        <div  className={`${isActiveMenu? 'active-menu': ''} menu-btn`}>
                            <div className='band'></div>
                        </div>
                        {isActiveMenu? <MobileMenu/> : ''} 
                    </div>
                    <div className="logo-main">
                        <div className="logo"><Logo/></div>
                        <div className="logo-text">
                            <TI18n keyStr="headerTitle" default="Спасение животных в Харькове"/>
                        </div>
                    </div>
                </div>
                    <div className="contacts">
                        <div className="icon-phone"><Phone/></div>
                        <div className="phone">
                            <a className="number" href='tel:+38 095 497 81 95'>+38 095 497 81 95</a>
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
        {isActivePopup ? <PopupInfo
            boxImages={[counterImage5,counterImage9,counterImage6,counterImage10]}
            title={<TI18n keyStr="popupInfoBlockTitle" default="Помощь животным" />}
            card={<TI18n keyStr="popupInfoCard" default="5169 3305 1022 8304" />}
            cardName={<TI18n keyStr="popupInfoCardName" default="Волкова Галина" />}
            textFirst={<TI18n 
                keyStr="popupBlockFirstText" 
                default="Если Вы хотите помочь нам и нашим подопечным, переведите любую сумму на карту Приватбанка:" />}
            textSecond={<TI18n 
                keyStr="popupBlockSecondText" 
                default="Также нам нужны:" />}
            textThird={<TI18n 
                keyStr="popupBlockThirdText" 
                default="люди, у которых есть потребность и возможность передерживать у себя животное (от малыша до взрослой особи) до момента усыновления;" />}
            textThirdTwo={<TI18n 
                    keyStr="popupBlockThirdTextTwo" 
                    default="специалисты с нестандартными и интересными вариантами фото и видеосъемки наших животных для сайта." />}
            />: ''}
        </header>
    )
};

export default AppHeader;

