import React, { useState } from "react";
import {TI18n} from "../../../../i18n";
import { Button } from "../../../../components/Button";
import {PhotoSlide} from'./PhotoSlide';
import { actionIsActivePopup } from "../../Home/store/actions";
import {store} from '../../../../store/index';
import { BlockLink } from "../../../../components/BlockLink";
import { HELP_PAGE_LINKS } from "../../HowToHelp";
import cn from 'classnames';
import "../styles/help-block.scss"

export const HelpBlock: React.FC<any> = ({animalsList, backgroundColor, title, color, text, btn, story}) => {
    const [indexPost, setIndexPost] = useState(0);
    const updatePostInfo =(i: number) => {
        setIndexPost(i);
    }
    return (
        <div className={cn("header-bottom", {story: story})} style={{backgroundColor}}>
            <div className="content">
                <div className="left-block">
                  <div className='block-row'>
                    <div className="title" style={{ color }}>{title}</div>
                    <div className="order-center">
                      <PhotoSlide
                        sliders={animalsList.data.slice(0, 3)}
                        updatePostInfo={updatePostInfo}
                        slideIndex={indexPost}
                        story={story}
                      />
                    </div>
                    <p className="text" style={{ color: text.color }}>
                      { story ? animalsList.data[indexPost] ? animalsList.data[indexPost].description : 'need some description for this animal' : text.content }                  
                    </p>
                  </div>
                  <div className='block-row'>
                    <Button 
                      onClick={() => store.dispatch(actionIsActivePopup(true))}
                      styleType={btn.style} className="btn-give"
                    >
                      {btn.content}
                    </Button>
                    <div className="block-more">
                      {story ? (
                        <BlockLink
                          title={<TI18n keyStr="btnHelp" default="Посмотреть, куда уйдут мои деньги" />}
                          href={'/about/financial-reports'}
                          isButtonHidden
                        />
                      ) : (
                          <BlockLink
                            title={<TI18n keyStr="headerBottomMore" default="Хочу помочь иначе" />}
                            href={HELP_PAGE_LINKS.default}
                          />
                        )}
                    </div>
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