import React from 'react';
import {Button, ButtonTypes} from "../../../../components/Button";
import '../styles/OurGoal.scss';

interface IPropTypes {
    title: string | React.ReactNode;
    text1?: string | React.ReactNode;
    text2?: string | React.ReactNode;
    linkText: string | React.ReactNode;
  }

  export const OurGoalBlock: React.FC<IPropTypes> = ({ title, linkText, text1, text2}) => {
    return (
      <div className="our-goal-container">
          <div className="content">
            <div className="title">{title}</div>
            <div className="column-container">
                <div className="left-block text">{text1}</div> 
                <div className="right-block text">{text2}</div>  
            </div>    
            <div className="block-more">
                <p>{linkText}</p>   
                <Button styleType={ButtonTypes.GreenCircle} onClick={() => {
                }}/>
            </div>
          </div>
      </div>
    )
  }