import React, { useEffect, useState } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { useParams } from 'react-router-dom';
import { TI18n } from '../../../../i18n';
import { store } from '../../../../store';
import { ERequestStatus } from '../../../../api';
import {
  IRequestParams,
  RequestFilterOperators,
} from '../../../../api/requestOptions';
import { IAnimalItemState } from '../store/state/animal.state';
import { IAnimalsResponse, AnimalKind } from '../../../../api/animals';
import { selectAnimalItem } from '../store/selectors/animalitem.selector';
import { Slider } from '../../../../components/Slider';
import { Button, ButtonTypes } from '../../../../components/Button';
import { AnimalsSlider } from '../AnimalsSlider';
import { sickAnimalsCheckAndLoadDefault } from '../store/selectors';
import { infoCardCheckAndLoad } from '../../Home/store/selectors';
import { IAnimalsListState } from '../store/state';
import { HelpBlock } from '../../../../components/HelpBlock';
import { ShareLink } from '../../../../components/ShareLink';
import { ButtonLike } from '../../../../components/ButtonLike';
import { AdoptPopup } from '../../../../components/AdoptPopup';
import './index.scss';
import { Age } from '../../../../components/Age';
import { selectApiUrl } from '../../../../store/selectors/config.selector';
import { BlockLink } from '../../../../components/BlockLink';
import { TagTranslation } from '../../../../components/TagTranslation';
import { ICustomAppState } from '../../../../store/state';
import { IParagraph } from '../../../../api/takeHomePopup';
import { IHowToAdoptState, ITakeHomePopupState } from '../../Home/store/state';
import { IParagraphValue } from '../../../../api/howToAdopt';
import DOMPurify from 'dompurify';

interface IPropTypes {
  fetchAnimalItem: (id: string) => void;
  clearAnimalItemState: () => void;
  fetchAnimalsList: (requestParams?: IRequestParams) => void;
  clearAnimalsState: () => void;
  clearInfoCard: () => void;
  fetchTakeHomePopup: () => void;
  clearTakeHomePopup: () => void;
  fetchHowToAdopt: () => void;
  clearHowToAdopt: () => void;
  animalItem: IAnimalItemState;
  animalsList: IAnimalsResponse;
  sickAnimalsList: IAnimalsListState;
  takeHomePopup: ITakeHomePopupState;
  howToAdopt: IHowToAdoptState;
}

enum TagTypes {
  DEFAULT = 'default',
  MEDICAL = 'medical',
  ADDITIONAL = 'additional',
}
const defaultMedicalTags: string[] = ['sterilized', 'vaccinated'];
const defaultAdditionalTags: string[] = ['readytoabroad'];

export const AnimalItemPageComponent: React.FC<IPropTypes> = ({
  fetchAnimalItem,
  clearAnimalItemState,
  fetchAnimalsList,
  clearAnimalsState,
  clearInfoCard,
  fetchTakeHomePopup,
  clearTakeHomePopup,
  fetchHowToAdopt,
  clearHowToAdopt,
  animalItem,
  animalsList,
  sickAnimalsList,
  takeHomePopup,
  howToAdopt,
}) => {
  const { animalId } = useParams();
  const { isLoading, isLoaded } = useSelector(
    () => selectAnimalItem(store.getState()),
    shallowEqual,
  );
  const { status } = useSelector(
    () => selectAnimalItem(store.getState()).requestState,
    shallowEqual,
  );
  const appLanguage: string = useSelector(
    (store: ICustomAppState) => store.appLanguage,
  );
  const [isAdoptPopupActive, setIsAdoptPopupActive] = useState(false);
  const baseUrl: string = useSelector(() => selectApiUrl(store.getState()));
  useEffect(() => {
    if (!!animalId) {
      fetchAnimalItem(animalId);
      sickAnimalsCheckAndLoadDefault();
      infoCardCheckAndLoad();
      fetchTakeHomePopup();
      fetchHowToAdopt();
    }
    return () => {
      clearAnimalItemState();
      clearAnimalsState();
      clearInfoCard();
      clearTakeHomePopup();
      clearHowToAdopt();
    };
  }, [animalId]);
  useEffect(() => {
    if (
      status === ERequestStatus.SUCCESS &&
      !!animalItem.data &&
      !!animalItem.data.id
    ) {
      const requsetParams: IRequestParams = !!animalItem.data.kindOfAnimal
        ? {
            filter: {
              fieldName: 'kindOfAnimal',
              operator: RequestFilterOperators.EQ,
              value: animalItem.data.kindOfAnimal,
            },
          }
        : {};
      fetchAnimalsList(requsetParams);
    }
  }, [status]);

  const instructionsList: {
    title: React.ReactNode;
    text: React.ReactNode;
  }[] = [
    {
      title: howToAdopt.data.paragraphs
          .find((p) => p.name === "rulesHowToAdoptListItemTitle1")?.values
            .find((v: IParagraphValue) => v.lang === appLanguage)?.value
        || 'Особиста зустріч',
      text: (
        <div
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(
            howToAdopt.data.paragraphs
              .find((p) => p.name === "rulesHowToAdoptListItemText1")?.values
                .find((v: IParagraphValue) => v.lang === appLanguage)?.value
            || 'Зустрітися з твариною. Це допоможе зрозуміти, чи підходить воно вам за темпераментом. У деяких випадках рекомендується приїжджати до тварини кілька разів.'
          )}}
        >
        </div>
      )
    },
    {
      title: howToAdopt.data.paragraphs
          .find((p) => p.name === "rulesHowToAdoptListItemTitle2")?.values
            .find((v: IParagraphValue) => v.lang === appLanguage)?.value
        || 'Підготуйте будинок до нового мешканця',
      text: (
        <p
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(
            howToAdopt.data.paragraphs
              .find((p) => p.name === "rulesHowToAdoptListItemText2")?.values
                .find((v: IParagraphValue) => v.lang === appLanguage)?.value
            || 'Співробітник притулку вам розповість про індивідуальні потреби обраного вихованця. Підготуйте для тваринного все необхідне: місце для сну, корм, мисочки для їжі і води, місце для туалету і наповнювач, іграшки, сітки на вікнах і ін.'
          )}}
        >
        </p>
      ),
    },
    {
      title: howToAdopt.data.paragraphs
          .find((p) => p.name === "rulesHowToAdoptListItemTitle3")?.values
            .find((v: IParagraphValue) => v.lang === appLanguage)?.value
        || 'Підписати договір',
      text: (
        <p
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(
            howToAdopt.data.paragraphs
              .find((p) => p.name === "rulesHowToAdoptListItemText3")?.values
                .find((v: IParagraphValue) => v.lang === appLanguage)?.value
            || `Обов'язковим етапом є підписання договору.`
          )}}
        >
        </p>
      ),
    },
    {
      title: howToAdopt.data.paragraphs
          .find((p) => p.name === "rulesHowToAdoptListItemTitle4")?.values
            .find((v: IParagraphValue) => v.lang === appLanguage)?.value
        || 'Випробувальний термін',
      text: (
        <p
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(
            howToAdopt.data.paragraphs
              .find((p) => p.name === "rulesHowToAdoptListItemText4")?.values
                .find((v: IParagraphValue) => v.lang === appLanguage)?.value
            || `Якщо у вас виникають труднощі з вихованцем, не соромтеся нам дзвонити! Ми допоможемо і якщо все-таки не вийде подружитися, заберемо тварину назад.`
          )}}
        >
        </p>
      ),
    },
  ];

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

  const getCurrentTags = (tagType?: TagTypes): string[] => {
    const arrToFilter: string[] =
      tagType === TagTypes.MEDICAL
        ? defaultMedicalTags
        : tagType === TagTypes.ADDITIONAL
        ? defaultAdditionalTags
        : [];
    return !!arrToFilter && !!arrToFilter.length
      ? arrToFilter.filter(tag =>
          animalItem.data.tags
            .map(t => t.toLowerCase())
            .includes(tag.toLowerCase()),
        )
      : animalItem.data.tags.filter(
          tag =>
            !defaultMedicalTags.includes(tag.toLowerCase()) &&
            !defaultAdditionalTags.includes(tag.toLowerCase()),
        );
  };

  return (
    <div className="animal-item-page">
      <div className="container">
        <BlockLink
          title={
            <TI18n
              keyStr="backToAnimalsCatalog"
              default="Повернутися до пошуку друга"
            />
          }
          href={'/animals/page/1'}
          isBack
        />
      </div>
      <section className="animal-info section-margin">
        <div className="container">
          {!isLoaded && !isLoading && status === ERequestStatus.FAILURE && (
            <div>Not found</div>
          )}
          {isLoaded && !isLoading && (
            <React.Fragment>
              <div className="inner-content">
                <div className="visual">
                  <Slider
                    isSwipeDisable
                    isPaginationHidden
                    slides={animalItem.data.imageIds.map(imgId => (
                      <div
                        className="img-holder"
                        style={{
                          backgroundImage: `url(${baseUrl}documents/${imgId}/type/medium)`,
                        }}
                      ></div>
                    ))}
                    thumbSlides={animalItem.data.imageIds.map(imgId => (
                      <img src={`${baseUrl}documents/${imgId}/type/medium`} />
                    ))}
                  />
                </div>
                <div className="text main-info">
                  <h2>
                    {
                      !!animalItem.data.names.length
                      && (animalItem.data.names.length > 1
                        ? animalItem.data.names.filter((name) => name.lang === commonLang)[0].value
                        : animalItem.data.names[0].value)
                    }
                  </h2>
                  <ButtonLike id={animalItem.data.id} />
                  <span className="animal-number">
                    <TI18n keyStr="number" default="Номер" />
                    &nbsp;{animalItem.data.number}
                  </span>
                  <div className="gender-age">
                    {!!animalItem.data.gender && (
                      <span className="gender">
                        <TagTranslation tagId={animalItem.data.gender} />
                      </span>
                    )}
                    <Age birthday={animalItem.data.birthday} />
                  </div>
                  <ul className="tags-list">
                    {getCurrentTags().map((tag, index) => (
                      <li key={index}>
                        <TagTranslation tagId={tag} />
                      </li>
                    ))}
                    {getCurrentTags(TagTypes.MEDICAL).map((tag, index) => (
                      <li className="medical" key={index}>
                        <TagTranslation tagId={tag} />
                      </li>
                    ))}
                    {getCurrentTags(TagTypes.ADDITIONAL).map((tag, index) => (
                      <li className="additional" key={index}>
                        <span>
                          <i className="icon-footprint">icon</i>
                          <TagTranslation tagId={tag} />
                        </span>
                      </li>
                    ))}
                  </ul>
                  <h4>
                    <TI18n keyStr="someHistory" default="Немного истории" />
                  </h4>
                  <p>{
                    animalItem.data.description.filter((description) => description.lang === appLanguage)[0]
                      ? animalItem.data.description.filter((description) => description.lang === appLanguage)[0].value
                      : ''  
                  }</p>
                  <h4>
                    <TI18n keyStr="character" default="Характер" />
                  </h4>
                  <p>{
                    animalItem.data.character.filter((character) => character.lang === appLanguage)[0]
                    ? animalItem.data.character.filter((character) => character.lang === appLanguage)[0].value
                    : ''
                    }</p>
                  <Button
                    styleType={ButtonTypes.Blue}
                    onClick={() => setIsAdoptPopupActive(true)}
                  >
                    <TI18n keyStr="wantToAdopt" default="Хочу усыновить" />
                  </Button>
                  <ShareLink
                    link={window.location.href}
                    text={
                      <TI18n
                        keyStr="shareAnimalText"
                        default="Поделись историей хвостика, чтобы помочь ему быстрее найти дом"
                      />
                    }
                  />
                </div>
              </div>
            </React.Fragment>
          )}
        </div>
      </section>
      <section className="instructions section-padding">
        <div className="container">
          <h2>
            {
              howToAdopt.data.paragraphs
                .find((p) => p.name === "rulesHowToAdoptTitle")?.values
                  .find((v: IParagraphValue) => v.lang === appLanguage)?.value
              || ''
            }
          </h2>
          <ul
            className="numbered-list"
            style={{
              gridTemplateRows: `repeat(${Math.ceil(
                instructionsList.length / 2,
              )}, auto)`,
            }}
          >
            {instructionsList.map((item, index) => (
              <li key={index}>
                <h4>{item.title}</h4>
                {item.text}
              </li>
            ))}
          </ul>
        </div>
      </section>
      {!!animalsList.data.filter(animal => animal.id !== animalItem.data.id)
        .length && (
        <section className="section-slider-animals section-padding">
          <AnimalsSlider
            data={animalsList.data.filter(
              animal => animal.id !== animalItem.data.id,
            )}
            title={
              <React.Fragment>
                <TI18n keyStr="other" default="Другие" />
                &nbsp;
                <span className="animal-kind">
                  {animalItem.data.kindOfAnimal === AnimalKind.CAT ? (
                    <TI18n keyStr="footerCats" default="котики" />
                  ) : animalItem.data.kindOfAnimal === AnimalKind.DOG ? (
                    <TI18n keyStr="footerDogs" default="собачки" />
                  ) : null}
                </span>
              </React.Fragment>
            }
          />
        </section>
      )}
      <HelpBlock
        animalsList={sickAnimalsList.data}
        title={
          <TI18n keyStr="canHelpBlockTitle" default="Кому ты можешь помочь" />
        }
      />
      {isAdoptPopupActive && (
        <AdoptPopup
          onClose={() => setIsAdoptPopupActive(false)}
          AnimalName={
            !!animalItem.data.names.length
              ? (animalItem.data.names.length > 1
                ? animalItem.data.names.filter((name) => name.lang === commonLang)[0].value
                : animalItem.data.names[0].value)
              : ''
          }
          AnimalId={animalId}
          takeHomePopup={takeHomePopup}
        />
      )}
    </div>
  );
};
