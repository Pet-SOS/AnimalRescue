import React from 'react';
import { IAnimal, Gender } from '../../../../api/animals';
import './index.scss';
import noPhotoImage from './../../../../img/nophoto.jpg';
import { TI18n } from '../../../../i18n';
import { Link } from 'react-router-dom';
import { ButtonLike } from '../../../../components/ButtonLike';
import { Age } from '../../../../components/Age';
import { useSelector } from 'react-redux';
import { selectApiUrl } from '../../../../store/selectors/config.selector';
import { store } from '../../../../store';

interface IPropTypes {
  animal: IAnimal;
}

export const AnimalCard: React.FC<IPropTypes> = ({ animal }) => {
  const baseUrl: string = useSelector(() => selectApiUrl(store.getState()));
  return (
    <div className="animal-card">
      <ButtonLike id={animal.id} />
      <Link to={`/animals/${animal.id}`}>
        <div className="img-holder" style={{ backgroundImage: `url(${animal.imageIds[0] ? `${baseUrl}documents/${animal.imageIds[0]}/type/medium` : `${noPhotoImage}`})` }}>
        </div>
        <strong className="animal-name">{animal.name}</strong>
        <div className="description">
          <TI18n keyStr={
            !!animal.gender && (animal.gender.toLowerCase() === Gender.MALE || animal.gender.toLowerCase() === Gender.FEMALE) ?
              animal.gender.toLowerCase() : 'unknownGender'} default="Пол неизвестен" />, {
              (!!animal.birthday || animal.birthday === '') && <Age birthday={animal.birthday} />                
            }            
        </div>
      </Link>
    </div>    
  )
};