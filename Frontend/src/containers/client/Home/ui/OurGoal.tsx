import React from 'react';
import { IBlockLinkPropTypes, BlockLink } from '../../../../components/BlockLink';

import '../styles/OurGoal.scss';

interface IPropTypes {
    title: string | React.ReactNode;
    text1?: string | React.ReactNode;
    text2?: string | React.ReactNode;
    link?: IBlockLinkPropTypes
  }

  export const OurGoalBlock: React.FC<IPropTypes> = ({ title, link, text1, text2}) => {
    return (
      <div className="our-goal-container">
          <div className="content">
            <div className="title">{title}</div>
            <div className="column-container">
                <div className="left-block text">{text1}</div> 
                <div className="right-block text">{text2}</div>  
            </div>    
            {!!link && !!link.href && <BlockLink {...link}/>}
          </div>
      </div>
    )
  }