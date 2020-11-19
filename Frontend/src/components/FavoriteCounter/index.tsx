import React from 'react';
import { ReactComponent as HeartLogo } from '../../assets/header/heart-count.svg';
import './index.scss';
import cn from 'classnames';

interface IPropTypes {
  count: number;
}

export const FavoriteCounter: React.FC<IPropTypes> = ({
  count,
}: IPropTypes) => (
  <i className={cn('favorite-counter', { active: !!count })}>
    <HeartLogo />
    {!!count && <span className="count">{count}</span>}
  </i>
);
