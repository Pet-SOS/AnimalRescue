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
import { ICustomAppState } from '../../../../store/state';

interface IPropTypes {
  animal: IAnimal;
}

export const AnimalCard: React.FC<IPropTypes> = ({ animal }) => {
  const baseUrl: string = useSelector(() => selectApiUrl(store.getState()));
  const coverImageId = animal.coverImage ? animal.coverImage : 0;
  const coverImage = animal.imageIds[coverImageId];
  const appLanguage: string = useSelector(
    (store: ICustomAppState) => store.appLanguage,
  );
  let commonLang = '';
  switch (appLanguage) {
    case 'ua':
    case 'ru':
      commonLang = 'ua';
      break;
    case 'en':
    case 'de':
      commonLang = 'en';
      break;
  }
  return (
    <div className="animal-card">
      <ButtonLike id={animal.id} />
      <Link to={`/animals/${animal.id}`}>
        <div
          className="img-holder"
          style={{
            backgroundImage: `url(${
              coverImage
                ? `${baseUrl}documents/${coverImage}/type/medium`
                : `${noPhotoImage}`
            })`,
          }}
        ></div>
        <strong className="animal-name">
          {
            !!animal.names.length
            && (animal.names.length > 1
              ? animal.names.filter((name) => name.lang === commonLang)[0].value
              : animal.names[0].value)
          }
        </strong>
        <div className="description">
          <TI18n
            keyStr={
              !!animal.gender &&
              (animal.gender.toLowerCase() === Gender.MALE ||
                animal.gender.toLowerCase() === Gender.FEMALE)
                ? animal.gender.toLowerCase()
                : 'unknownGender'
            }
            default="Пол неизвестен"
          />
          ,{' '}
          {(!!animal.birthday || animal.birthday === '') && (
            <Age birthday={animal.birthday} />
          )}
        </div>
      </Link>
    </div>
  );
};
