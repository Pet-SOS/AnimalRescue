import React, { useState } from "react";
import {TI18n} from "../../../../i18n";
import { Button } from "../../../../components/Button";
import {PhotoSlide} from'./PhotoSlide';
import { actionIsActivePopup } from "../../Home/store/actions";
import {store} from '../../../../store/index';
import { BlockLink } from "../../../../components/BlockLink";
import "../styles/help-block.scss"

export const HelpBlock: React.FC<any> = ({ animalsList, backgroundColor, title, color, text, btn }) => {
  const [indexPost, setIndexPost] = useState(0);
  const updatePostInfo =(i: number) => {
    setIndexPost(i);
  }
  return (
    <div className='header-bottom' style={{backgroundColor}}>
      <div className="content">
        <div className="column">
          <h2 className="title mobile" style={{ color }}>{title}</h2>
          <PhotoSlide
            sliders={animalsList.data.slice(0, 3)}
            updatePostInfo={updatePostInfo}
            slideIndex={indexPost}
          />
        </div>
        <div className='column'>
          <h2 className="title desktop" style={{ color }}>{title}</h2>
          <div className='description-wrapper'>
            <div className='description-holder'>
              {!!animalsList.data[indexPost] && !!animalsList.data[indexPost].name &&(
                <span className='description-title'>
                  <TI18n keyStr="hiIAm" default="Привет, я" />&nbsp;{animalsList.data[indexPost].name}.
                </span>
              )}
              <p style={{ color: text.color }}>
                {!!animalsList.data[indexPost] && !!animalsList.data[indexPost].description ? animalsList.data[indexPost].description : 'need some description for this animal'}
              </p>
            </div>
            <Button
              onClick={() => store.dispatch(actionIsActivePopup(true))}
              styleType={btn.style} className="btn-give"
            >
              {btn.content}
            </Button>
          </div>
          <BlockLink
            title={<TI18n keyStr="whereMoneyGo" default="Посмотреть, куда уйдут деньги" />}
            href={'/about/financial-reports'}
            isButtonHidden
          />
        </div>                  
      </div>
    </div>
  )
};