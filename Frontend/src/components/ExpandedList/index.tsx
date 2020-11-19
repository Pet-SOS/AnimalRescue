import React from 'react';
import './index.scss';
import { ExpandedListItem, IExpandedListItemProps } from './item';

export interface IExpandedListPropTypes {
  data: IExpandedListItemProps[];
}

export const ExpandedList: React.FC<IExpandedListPropTypes> = ({ data }) => (
  <ul>
    {data.map((item, index) => (
      <ExpandedListItem key={index} title={item.title} body={item.body} />
    ))}
  </ul>
);
