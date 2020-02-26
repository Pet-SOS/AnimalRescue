import React, { useEffect, useState } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { useParams } from 'react-router-dom';
import { TI18n } from '../../../../i18n';
import { store } from '../../../../store';
import { ERequestStatus, BASE_URL } from '../../../../api';
import { IRequestParams, RequestFilterOperators } from '../../../../api/requestOptions';
import { IAnimalItemState } from '../store/state/animal.state';
import { IAnimalsResponse, AnimalKind } from '../../../../api/animals';
import { selectAnimalItem } from '../store/selectors/animalitem.selector';
import { Slider, ThumbSlidesAlignment } from '../../../../components/Slider';
import { Button, ButtonTypes } from '../../../../components/Button';
import { AnimalsSlider } from '../AnimalsSlider';
import { sickAnimalsCheckAndLoadDefault } from '../store/selectors';
import { IAnimalsListState } from '../store/state';
import { HelpBlock } from '../../Header/ui/HelpBlock';
import { ShareLink } from '../../../../components/ShareLink';
import { ButtonLike } from '../../../../components/ButtonLike';
import { AdoptPopup } from '../../../../components/AdoptPopup';
import './index.scss';
import { Age } from '../../../../components/Age';

interface IPropTypes {
  fetchAnimalItem: (id: string) => void;
  clearAnimalItemState: () => void;
  fetchAnimalsList: (requestParams?: IRequestParams) => void;
  clearAnimalsState: () => void;
  animalItem: IAnimalItemState;
  animalsList: IAnimalsResponse;
  sickAnimalsList: IAnimalsListState;
}

enum TagTypes { DEFAULT = 'default', MEDICAL = 'medical', ADDITIONAL = 'additional' }
const defaultMedicalTags: string[] = ['sterilized', 'vaccinated'];
const defaultAdditionalTags: string[] = ['readytoabroad'];

export const AnimalItemPageComponent: React.FC<IPropTypes> = ({
  fetchAnimalItem,
  clearAnimalItemState,
  fetchAnimalsList,
  clearAnimalsState,
  animalItem,
  animalsList,
  sickAnimalsList
}) => {
  const { animalId } = useParams();
  const { isLoading, isLoaded } = useSelector(() => selectAnimalItem(store.getState()), shallowEqual);
  const { status } = useSelector(() => selectAnimalItem(store.getState()).requestState, shallowEqual);
  const [ isAdoptPopupActive, setIsAdoptPopupActive ] = useState(false)
  useEffect(() => {
    if (!!animalId) {
      fetchAnimalItem(animalId);
      sickAnimalsCheckAndLoadDefault();
    }
    return () => {
      clearAnimalItemState();
      clearAnimalsState();
    }
  }, [animalId]);
  useEffect(() => {
    if (status === ERequestStatus.SUCCESS && !!animalItem.data && !!animalItem.data.id) {
      const requsetParams: IRequestParams = !!animalItem.data.kindOfAnimal ?
        {
          filter: {
            fieldName: 'kindOfAnimal',
            opeartor: RequestFilterOperators.ALL,
            value: animalItem.data.kindOfAnimal
          }
        } :
        {}
      fetchAnimalsList(requsetParams);
    }
  }, [status])

  const instructionsList: { title: React.ReactNode , text: React.ReactNode }[] = [
    {
      title: <TI18n keyStr="rulesHowToAdoptListItemTitle1" default="Личная встреча" />,
      text: <TI18n keyStr="instructionsListItemText1" default="Познакомьтесь с животным. Это поможет понять, подходит ли оно вам по темпераметру." />
    },
    {
      title: <TI18n keyStr="rulesHowToAdoptListItemTitle2" default="Подготовьте дом к новому жильцу" />,
      text: <TI18n keyStr="instructionsListItemText2" default="Куратор вам расскажет об индивидуальных потребностях выбранного питомца. Подготовьте для животного все необходимое." />,
    },
    {
      title: <TI18n keyStr="rulesHowToAdoptListItemTitle3" default="Подписать договор" />,
      text: <TI18n keyStr="rulesHowToAdoptListItemText3" default="Обязательным этапом является подписание договора." />
    },
    {
      title: <TI18n keyStr="rulesHowToAdoptListItemTitle3" default="Подписать договор" />,
      text: <TI18n keyStr="rulesHowToAdoptListItemText4" default="Если у вас возникают сложности с питомцем, не стесняйтесь нам звонить! Мы поможем и если все же не получится подружиться, заберем животное обратно." />
    }
  ];

  const capitalizedString = (str: string): string => {
    const newStr: string = str.trim().toLowerCase();
    return !!newStr ? `${newStr[0].toUpperCase()}${newStr.slice(1)}` : newStr;
  }

  const getCurrentTags = (tagType?: TagTypes): string[] => {
    const arrToFilter: string[] = tagType === TagTypes.MEDICAL ? defaultMedicalTags : tagType === TagTypes.ADDITIONAL ? defaultAdditionalTags : [];
    return !!arrToFilter && !!arrToFilter.length
      ? arrToFilter.filter(tag => animalItem.data.tags.map(t => t.toLowerCase()).includes(tag.toLowerCase()))
      : animalItem.data.tags.filter(tag => !defaultMedicalTags.includes(tag.toLowerCase()) && !defaultAdditionalTags.includes(tag.toLowerCase()));
  }

  return (
    <div className='animal-item-page'>
      <div className='animal-info'>
        <div className='content'>
          {!isLoaded && !isLoading && status === ERequestStatus.FAILURE && <div>Not found</div>}
          {isLoaded && !isLoading && (
            <React.Fragment>
              <div className='column'>
                <Slider
                  isSwipeDisable
                  isPaginationHidden
                  slides={animalItem.data.imageIds.map(imgId => (
                    <div className="img-holder" style={{ backgroundImage: `url(${BASE_URL}documents/${imgId}/type/medium)` }}></div>
                  ))}
                  thumbSlides={animalItem.data.imageIds.map(imgId => (
                    <img src={`${BASE_URL}documents/${imgId}/type/medium`} />
                  ))}
                  thumbSlidesAlignment={ThumbSlidesAlignment.LEFT}
                />
              </div>
              <div className='column'>
                <div className='main-info'>
                  <div className='head'>
                    <h2 className='title'>{animalItem.data.name}</h2>
                    <ButtonLike id={animalItem.data.id} />
                  </div>
                  <span className='animal-number'>
                    <TI18n keyStr='number' default='Номер' />
                    &nbsp;{animalItem.data.number}
                  </span>
                  <div className='gender-age'>
                    {!!animalItem.data.gender && (
                      <span className='gender'>
                        <TI18n keyStr={animalItem.data.gender} default={animalItem.data.gender} />
                      </span>
                    )}
                    <Age birthday={animalItem.data.birthday} />
                  </div>
                  <ul className='tags-list'>
                    {getCurrentTags().map((tag, index) => <li key={index}>{capitalizedString(tag)}</li>)}
                    {getCurrentTags(TagTypes.MEDICAL).map((tag, index) => <li className='medical' key={index}><TI18n keyStr={tag} default={capitalizedString(tag)} /></li>) }
                    {getCurrentTags(TagTypes.ADDITIONAL).map((tag, index) => <li className='additional' key={index}><span><TI18n keyStr={tag} default={capitalizedString(tag)} /></span></li>)}
                  </ul>
                  <div className='block-holder'>
                    <h4 className='title'>
                      <TI18n keyStr='someHistory' default='Немного истории' />
                    </h4>
                    <p>{animalItem.data.description}</p>
                  </div>
                  <div className='block-holder'>
                    <h4 className='title'>
                      <TI18n keyStr='character' default='Характер' />
                    </h4>
                    <p>{animalItem.data.character}</p>
                  </div>
                </div>
                <div className='btn-holder'>
                  <Button styleType={ButtonTypes.Blue} onClick={() => setIsAdoptPopupActive(true)}>
                    <TI18n keyStr="wantToAdopt" default="Хочу усыновить" />
                  </Button>
                  <ShareLink
                    link={window.location.href}
                    text={<TI18n keyStr="shareAnimalText" default="Поделись историей хвостика, чтобы помочь ему быстрее найти дом" />}
                  />
                </div>
              </div>
            </React.Fragment>
          )}
        </div>
      </div>
      <div className='instructions'>
        <div className='content'>
          <h2 className='title'>
            <TI18n keyStr="howToTake" default="Как взять?" />
          </h2>
          <ul className='numbered-list' style={{ gridTemplateRows: `repeat(${Math.ceil(instructionsList.length / 2)}, auto)`}}>
            {instructionsList.map((item, index) => (
              <li key={index}>
                <strong>{item.title}</strong>
                <div className='list-body'>
                  <span>{item.text}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {!!animalsList.data.filter(animal => animal.id !== animalItem.data.id).length && (
        <AnimalsSlider
          data={animalsList.data.filter(animal => animal.id !== animalItem.data.id)}
          title={
            <React.Fragment>
              <TI18n keyStr="other" default="Другие" />&nbsp;
            <span className='animal-kind'>
                {animalItem.data.kindOfAnimal === AnimalKind.CAT ? <TI18n keyStr="footerCats" default="котики" /> :
                  animalItem.data.kindOfAnimal === AnimalKind.DOG ? <TI18n keyStr="footerDogs" default="собачки" /> : null
                }
              </span>
            </React.Fragment>
          }
        />
      )}
      <HelpBlock
        animalsList={sickAnimalsList}
        backgroundColor='#333572'
        title={<TI18n keyStr='canHelpBlockTitle' default='Кому ты можешь помочь' />}
        color='#409275'
        text={{
          color: '#ffffff',
          content: <TI18n keyStr='canHelpBlockContent' default='Маша скромная и добрая собачка. Очень терпеливая и ненавязчивая. Маша была сбита машиной, пережила стресс. Сначала была испугана, потом успокоилась и начала доверять людям. Для восстановления после аварии нужно собрать 3 500 грн.' />
        }}
        btn={{
          style: 'yellow',
          content: <TI18n keyStr='footerRightBtn' default='Помочь' />
        }}
        story={true}
      />
      { isAdoptPopupActive && (
        <AdoptPopup onClose={() => setIsAdoptPopupActive(false)}/>
      )}
    </div>
   )
}