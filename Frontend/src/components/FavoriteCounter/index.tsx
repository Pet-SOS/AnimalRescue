import React from 'react';
import './index.scss';
import cn from 'classnames';

interface IPropTypes {
  count: number;
}

export const FavoriteCounter: React.FC<IPropTypes> = ({ count }: IPropTypes) => (
  <i className={cn('favorite-counter', { 'active': !!count })}>
      <svg xmlns="http://www.w3.org/2000/svg" width="26" height="24" viewBox="0 0 26 24" data-livestyle-extension="available">
          <path d="M19.2609 0.999998C16.6522 0.999998 14.5652 3.14634 13 5.29268C11.4348 3.14634 9.34783 0.999998 6.73913 0.999998C3.6087 0.999998 1 3.24024 1 6.90244C1 11.8323 5.5 16.5 13 23C20.5 16.5 25 11.8323 25 6.90244C25 3.24024 22.3913 0.999998 19.2609 0.999998Z"  stroke-width="1.5" stroke-linecap="round"/>
      </svg>
    {!!count && (
      <span>{count}</span>
    )}
  </i>
)