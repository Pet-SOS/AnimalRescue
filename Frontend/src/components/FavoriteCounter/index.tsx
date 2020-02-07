import React from 'react';
import './index.scss';
import cn from 'classnames';

interface IPropTypes {
  count: number;
}

export const FavoriteCounter: React.FC<IPropTypes> = ({ count }: IPropTypes) => (
  <div className={cn('favorite-counter', { 'active': !!count })}>
    {!!count && (
      <span>{count}</span>
    )}
  </div>
)