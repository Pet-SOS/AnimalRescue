import React from 'react';
import { IAnimal, Gender } from '../../api/animals';
import './index.scss';
import { BASE_URL } from '../../api';
import noPhotoImage from './../../img/nophoto.jpg';
import { TI18n } from '../../i18n';
import { Button, ButtonTypes } from '../Button';

interface IPropTypes {
  animal: IAnimal;
}

export const AnimalListItem: React.FC<IPropTypes> = ({ animal }) => {
  return (
    <div className="animal-item">
      <div className="like-holder">
        <Button styleType={ButtonTypes.Like} />
      </div>
      <div className="img-holder" style={{ backgroundImage: `url(${animal.imageIds[0] ? `${BASE_URL}documents/${animal.imageIds[0]}` : `${noPhotoImage}`})` }}></div>
      <div className="animal-name">{animal.name}</div>
      <div className="description">        
        <TI18n keyStr={
          !!animal.gender && (animal.gender.toLowerCase() === Gender.MALE || animal.gender.toLowerCase() === Gender.FEMALE) ?
          animal.gender.toLowerCase() : 'unknownGender'} default="Пол неизвестен" />, {
          (!!animal.age || animal.age === 0) && <React.Fragment>{animal.age} <TI18n keyStr='month' default="месяцев" /></React.Fragment>}
      </div>
    </div>
  )
};