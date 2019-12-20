import React from 'react';
import {SocialLinks} from "../../../../components/SocialLinks";
import {Button, ButtonTypes} from "../../../../components/Button";
import {ChangeLocale, TI18n} from '../../../../i18n';
import '../styles/footer.scss';

export const AppFooter: React.FC = () => {

    return (
        <div className="app-footer">
            <div className="content">
                <div className="links">
                    <div className="column-1">
                        <div className="item-main"><TI18n keyStr="footerColumn1Item1" default="О приюте"/></div>
                        <div className="item"></div>
                        <div className="item"></div>
                        <div className="item"></div>
                        <div className="item"></div>
                    </div>
                    <div className="column-1">
                        <div className="item-main"><TI18n keyStr="footerColumn2Item1" default="Животные"/></div>
                        <div className="item"></div>
                        <div className="item"></div>
                        <div className="item"></div>
                    </div>
                    <div className="column-1">
                        <div className="item-main"><TI18n keyStr="footerColumn3Item1" default="Как помочь"/></div>
                        <div className="item"></div>
                        <div className="item"></div>
                        <div className="item"></div>
                    </div>
                    <div className="column-1">
                        <div className="item-main"><TI18n keyStr="footerColumn4Item1" default="Блог"/></div>
                    </div>
                    <div className="column-1">
                        <div className="item-main"><TI18n keyStr="footerColumn5Item1" default="Контакты"/></div>
                    </div>
                </div>
                <div className="right">
                    <Button content="Помочь" onClick={() => {}} styleType={ButtonTypes.Green}>
                        <TI18n keyStr="footerRightBtn" default="Помочь"/>
                    </Button>
                    <SocialLinks />
                </div>
            </div>
            <div className="bottom">
                <div className="info">
                    <span><TI18n keyStr="footerBottomRightsReserved" default="Все права защищены"/></span>
                    <span className="use-site">&nbsp;<TI18n keyStr="termsOfUseOfSite" default="Условия использования сайта"/></span>
                </div>
                <div className="locales">
                   <span><TI18n keyStr="language" default="Язык"/>:&nbsp;</span><ChangeLocale/>
                </div>
            </div>

        </div>
    )
};