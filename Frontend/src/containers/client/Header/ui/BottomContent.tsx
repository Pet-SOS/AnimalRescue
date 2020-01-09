import React from "react";
import {TI18n} from "../../../../i18n";
import {Button, ButtonTypes} from "../../../../components/Button";
import {PhotoSlide} from'./PhotoSlide';
import {IAnimalsResponse} from "../../../../api/animals";
import "../styles/bottomContent.scss"

export const BottomContent: React.FC<any> = (props:any) => {
    return (
        <div className="header-bottom">
            <div className="content">
                <div className="left-block">
                    <div className="title"><TI18n keyStr="headerBottomTitle" default="Ты можешь помочь животному в беде"/></div>
                    <div>
                        <p className="text">
                            <TI18n
                                keyStr="headerBottomContent"
                                default="Приют ежедневно заботится о сотнях животных. Самый лучший способ помочь нам и нашим хвостикам - пожертвовать любую сумму на корм, лечение и обеспечение работы приюта."
                            />
                        </p>
                        <Button onClick={() => {
                        }} styleType={ButtonTypes.Green} className="btn-give">
                            <TI18n keyStr="headerBottomBtn" default="Пожертвовать"/>
                        </Button>
                        <div className="block-more">
                            <p><TI18n keyStr="headerBottomMore" default="Хочу помочь иначе"/></p>
                            <Button styleType={ButtonTypes.GreenCircle} onClick={() => {
                            }}/>
                        </div>
                    </div>
                </div>
                <PhotoSlide
                    className='right-block'
                    sliders={props.data.slice(0, 3)}
                />
            </div>
        </div>
    )
};