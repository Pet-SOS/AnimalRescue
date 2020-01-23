import React, { useState } from "react";
import {TI18n} from "../../../../i18n";
import {Button, ButtonTypes} from "../../../../components/Button";
import {PhotoSlide} from'./PhotoSlide';
import "../styles/help-block.scss"
import { actionIsActivePopup } from "../../Home/store/actions";
import {store} from '../../../../store/index';

export const HelpBlock: React.FC<any> = ({animalsList, backgroundColor, title, color, text, btn, story}) => {
    const [indexPost, setIndexPost] = useState(0);

    const updatePostInfo =(i: number) => {
        setIndexPost(i);
    }
    return (
        <div className="header-bottom" style={{backgroundColor}}>
            <div className="content">
                <div className="left-block">
                    <div className="title" style={{color}}>{title}</div>
                    <div className="order-center">
                        <PhotoSlide
                            sliders={animalsList.data.slice(0, 3)}
                            updatePostInfo ={updatePostInfo}
                            slideIndex = {indexPost}
                            story={story}
                        />
                    </div>
                    <div className="box-text">
                    {story?
                        <p className="text" style={{color: text.color}}>
                            { animalsList.data[indexPost] ?  animalsList.data[indexPost].description: 'need some description for this animal'}
                        </p>: 
                        <p className="text" style={{color: text.color}}>
                            {text.content}
                        </p>
                    }
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
                        sliders={animalsList.data.slice(0, 3)}
                        updatePostInfo ={updatePostInfo}
                        slideIndex = {indexPost}
                        story={story}
                    />
                </div>
            </div>
        </div>
    )
};