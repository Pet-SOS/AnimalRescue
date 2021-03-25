import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { TI18n } from '../../i18n';
import { Button, ButtonTypes } from '../Button';
import { PhotoSlider } from '../PhotoSlider';
import { actionIsActivePopup } from '../../containers/client/Home/store/actions';
import { store } from '../../store/index';
import { BlockLink } from '../BlockLink';
import cn from 'classnames';
import './index.scss';
import { IAnimal } from '../../api/animals';
import { ICustomAppState } from '../../store/state';

export interface IPropTypes {
  animalsList: IAnimal[];
  title: string | React.ReactNode;
  isLightMode?: boolean;
}

export const HelpBlock: React.FC<IPropTypes> = ({
  animalsList,
  isLightMode,
  title,
}) => {
  const [indexPost, setIndexPost] = useState(0);
  const appLanguage: string = useSelector(
    (store: ICustomAppState) => store.appLanguage,
  );
  let commonLang = '';
  switch (appLanguage) {
    case 'ua':
    case 'ru':
      commonLang = 'ua';
      break;
    case 'en':
    case 'de':
      commonLang = 'en';
      break;
  }
  return (
    <section className={cn('section-help', { dark: !isLightMode })}>
      <div className="container">
        <div className="inner-content">
          <div className="column">
            <div className="visual">
              <h2>{title}</h2>
              <PhotoSlider
                sliders={animalsList}
                updatePostInfo={setIndexPost}
                slideIndex={indexPost}
              />
            </div>
          </div>
          <div className="column">
            <div className="text">
              <h2>{title}</h2>
              <div className="description-holder">
                {!!animalsList[indexPost] && !!animalsList[indexPost].names.length && (
                  <span className="description-title">
                    <TI18n keyStr="hiIAm" default="Привет, я" />
                    &nbsp;{
                      animalsList[indexPost].names.length > 1
                        ? animalsList[indexPost].names.filter((n) => n.lang === commonLang)[0].value
                        : animalsList[indexPost].names[0].value
                    }
                  </span>
                )}
                <p>
                  {!!animalsList[indexPost] &&
                  !!animalsList[indexPost].bannerText
                    ? animalsList[indexPost].bannerText
                    : 'need some text for this animal'}
                </p>
                <div className="wrap-btn">
                  <Button
                    onClick={() => store.dispatch(actionIsActivePopup(true))}
                    styleType={
                      isLightMode ? ButtonTypes.Blue : ButtonTypes.Yellow
                    }
                    className="btn-give"
                  >
                    {<TI18n keyStr="wantToHelp" default="Хочу допомогти" />}
                  </Button>
                </div>
              </div>
              <div className="wrap-link">
                <BlockLink
                  title={
                    <TI18n
                      keyStr="whereMoneyGo"
                      default="Посмотреть, куда уйдут деньги"
                    />
                  }
                  href={'/about/financial-reports'}
                  isButtonHidden
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
