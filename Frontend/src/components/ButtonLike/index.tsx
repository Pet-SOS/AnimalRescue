import React from 'react';
import './index.scss';
import { Button } from '../Button';
import { store } from './../../store/index';
import cn from 'classnames';
import { onAnimalFavoriteButtonClicked } from '../../containers/client/Animals/store/actions';
import { useSelector, shallowEqual } from 'react-redux';
import { selectFavoriteAnimalsIds } from '../../containers/client/Animals/store/selectors';

interface IPropTypes {
  id?: string;
}

export const ButtonLike: React.FC<IPropTypes> = ({ id }: IPropTypes) => {
  const favoriteAnimalsIds: string[] = useSelector(
    () => selectFavoriteAnimalsIds(store.getState()),
    shallowEqual,
  );
  const onLikeClick = () => {
    if (!!id) {
      store.dispatch(onAnimalFavoriteButtonClicked(id));
    }
  };
  const isActive = (): boolean => {
    return !!id && favoriteAnimalsIds.includes(id);
  };
  return (
    <Button
      className={cn('btn-circle like', { active: isActive() })}
      onClick={onLikeClick}
    />
  );
};
