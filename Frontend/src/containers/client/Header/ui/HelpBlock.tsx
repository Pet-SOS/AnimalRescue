import React from "react";
import {TI18n} from "../../../../i18n";
import {Button, ButtonTypes} from "../../../../components/Button";
import {PhotoSlide} from'./PhotoSlide';
import "../styles/help-block.scss"
import { actionIsActivePopup } from "../../Home/store/actions";
import {store} from '../../../../store/index';

export const HelpBlock: React.FC<any> = (props:any, {backgroundColor, title, color, text, btn, story}) => {
    return (
        <div className="header-bottom" style={{backgroundColor}}>
            <div className="content">
                <div className="left-block">
                    <div className="title" style={{color}}>{title}</div>
                    <div className="order-center">
                        <PhotoSlide
                            sliders={props.data.slice(0, 3)}
                        />
                    </div>
                    <div className="box-text">
                        <p className="text" style={{color: text.color}}>
                            {text.content}
                        </p>
                        <Button onClick={() => {store.dispatch(actionIsActivePopup(true))
                        }} styleType={btn.style} className="btn-give">
                           {btn.content}
                        </Button>
                       {story?
                        <div className="block-more">
                            <a href='financial-reports'><TI18n keyStr="btnHelp" default="Посмотреть, куда уйдут мои деньги"/></a>
                        </div>:
                            <div className="block-more">
                                <p><TI18n keyStr="headerBottomMore" default="Хочу помочь иначе"/></p>
                                <Button styleType={ButtonTypes.BlueCircle} onClick={() => {
                                }}/>
                            </div>
                        }
                    </div>
                </div>
                <div className='right-block'>
                    <PhotoSlide
                        sliders={props.data.slice(0, 3)}
                    />
                </div>
            </div>
        </div>
    )
};