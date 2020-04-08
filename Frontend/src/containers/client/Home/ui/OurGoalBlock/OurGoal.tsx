import React from 'react';
import { IBlockLinkPropTypes, BlockLink } from '../../../../../components/BlockLink';

import './OurGoal.scss';

interface IPropTypes {
    title: string | React.ReactNode;
    text1?: string | React.ReactNode;
    link?: IBlockLinkPropTypes
  }

export const OurGoalBlock: React.FC<IPropTypes> = ({ title, link, text1}) => (
  <section className="our-goal-container section-padding">
      <div className="container">
        <h2 className="title">{title}</h2>
        <div className="text">{text1}</div>
        {!!link && !!link.href && <BlockLink {...link}/>}
      </div>
  </section>
)