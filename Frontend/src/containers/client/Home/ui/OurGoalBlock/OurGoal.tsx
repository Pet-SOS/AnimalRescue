import React from 'react';
import { IBlockLinkPropTypes, BlockLink } from '../../../../../components/BlockLink';

import './OurGoal.scss';

interface IPropTypes {
    title: string | React.ReactNode;
    text1?: string | React.ReactNode;
    text2?: string | React.ReactNode;
    link?: IBlockLinkPropTypes
  }

export const OurGoalBlock: React.FC<IPropTypes> = ({ title, link, text1, text2}) => (
  <div className="our-goal-container">
      <div className="content">
        <div className="title">{title}</div>
        <div className="text">{text1}</div>
        {!!link && !!link.href && <BlockLink {...link}/>}
      </div>
  </div>
)