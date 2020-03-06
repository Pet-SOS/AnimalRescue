import React, { useState } from "react";
import { TI18n } from "../../i18n";
import { Button, ButtonTypes } from "../Button";
import { PhotoSlider } from '../PhotoSlider';
import { actionIsActivePopup } from "../../containers/client/Home/store/actions";
import { store } from '../../store/index';
import { BlockLink } from "../BlockLink";
import cn from 'classnames';
import "./index.scss"
import { IAnimal } from "../../api/animals";

export interface IPropTypes {
  animalsList: IAnimal[];
  title: string | React.ReactNode;
  text: string | React.ReactNode;
  buttonText: string | React.ReactNode;
  isLightMode?: boolean;
}

export const HelpBlock: React.FC<IPropTypes> = ({ animalsList, title, text, buttonText, isLightMode }) => {
  const [indexPost, setIndexPost] = useState(0);
  const updatePostInfo = (i: number) => {
    setIndexPost(i);
  }
  return (
    <div className={cn('help-block-holder', { dark: !isLightMode })}>
      <div className="content">
        <div className="column">
          <h2 className="title mobile">{title}</h2>
          <PhotoSlider
            sliders={animalsList.slice(0, 3)}
            updatePostInfo={updatePostInfo}
            slideIndex={indexPost}
          />
        </div>
        <div className='column'>
          <h2 className="title desktop">{title}</h2>
          <div className='description-wrapper'>
            <div className='description-holder'>
              {!!animalsList[indexPost] && !!animalsList[indexPost].name && (
                <span className='description-title'>
                  <TI18n keyStr="hiIAm" default="Привет, я" />&nbsp;{animalsList[indexPost].name}.
                </span>
              )}
              <p>
                {!!animalsList[indexPost] && !!animalsList[indexPost].description ? animalsList[indexPost].description : 'need some description for this animal'}
              </p>
            </div>
            <Button
              onClick={() => store.dispatch(actionIsActivePopup(true))}
              styleType={isLightMode ? ButtonTypes.Blue : ButtonTypes.Yellow } className="btn-give"
            >
              {buttonText}
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