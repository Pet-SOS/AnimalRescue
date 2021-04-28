import React, { useEffect } from 'react';
import DOMPurify from 'dompurify';
import { TI18n } from '../../../i18n';
import './index.scss';
import { HelpBlock } from '../../../components/HelpBlock';
import { useSelector, shallowEqual } from 'react-redux';
import { store } from '../../../store';
import { selectInfoContacts } from '../Home/store/selectors';
import { sickAnimalsCheckAndLoadDefault } from '../Animals/store/selectors';
import { IAnimalsListState } from '../Animals/store/state';
import { IBreadcrumbProps } from '../../../components/Breadcrumbs/item';
import { Breadcrumbs } from '../../../components/Breadcrumbs';
import Banner from '../../../img/bg-banner-01.jpg';
import { IContentPageState } from '../../../store/state/contentPages.state';
import { IHowToAdoptState } from '../Home/store/state';
import { IParagraphValue } from '../../../api/howToAdopt';

interface IPropTypes {
  fetchContentPage: (pageName: string) => void;
  clearContentPage: () => void;
  clearAnimalsState: () => void;
  fetchHowToAdopt: () => void;
  clearHowToAdopt: () => void; 
  sickAnimalsList: IAnimalsListState;
  contentPage: IContentPageState;
  appLanguage: string;
  howToAdopt: IHowToAdoptState;
}

export const ServiceWorkRules: React.FC<IPropTypes> = ({
  clearAnimalsState,
  fetchContentPage,
  clearContentPage,
  fetchHowToAdopt,
  clearHowToAdopt,
  sickAnimalsList,
  appLanguage,
  contentPage,
  howToAdopt,
}) => {
  useEffect(() => {
    fetchContentPage('about-rules');
    sickAnimalsCheckAndLoadDefault();
    fetchHowToAdopt();
    return () => {
      clearAnimalsState();
      clearContentPage();
      clearHowToAdopt();
    };
  }, []);
  const contactPhones: string[] = useSelector(
    () => selectInfoContacts(store.getState()).data.phones,
    shallowEqual,
  );
  const breadCrumbs: IBreadcrumbProps[] = [
    {
      text: (
        <TI18n
          keyStr="breadcrumbAbout"
          default="Дізнатися більше про службу порятунку"
        />
      ),
      href: '/about',
    },
    {
      text: (
        <TI18n
          keyStr="breadcrumbFinanceReports"
          default="Подивитися фінансову звітність"
        />
      ),
      href: '/about/financial-reports',
    },
  ];

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
        <p
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(
            howToAdopt.data.paragraphs
              .find((p) => p.name === "rulesHowToAdoptListItemText1")?.values
                .find((v: IParagraphValue) => v.lang === appLanguage)?.value
            || 'Зустрітися з твариною. Це допоможе зрозуміти, чи підходить воно вам за темпераментом. У деяких випадках рекомендується приїжджати до тварини кілька разів.'
          )}}
        >
        </p>
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

  return (
    <React.Fragment>
      <div className="rules-page-holder">
        <div className="container">
          <h1 className="title">
            {
              contentPage.data.paragraphs.filter((p) => p.name === 'title')[0]
              ? contentPage.data.paragraphs.filter((p) => p.name === 'title')[0].values
                .filter((v) => v.lang === appLanguage)[0]
                  ? contentPage.data.paragraphs.filter((p) => p.name === 'title')[0].values
                    .filter((v) => v.lang === appLanguage)[0].value
                  : ''
              : ''  
            }
          </h1>
          <div
            className="banner"
            style={{ backgroundImage: `URL(${Banner})` }}
          />
          <div className="rules-content">
            <div
              className="page-description section-margin"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(contentPage.data.paragraphs.filter((p) => p.name === 'foreword')[0]
                ? contentPage.data.paragraphs.filter((p) => p.name === 'foreword')[0].values
                  .filter((v) => v.lang === appLanguage)[0]
                    ? contentPage.data.paragraphs.filter((p) => p.name === 'foreword')[0].values
                      .filter((v) => v.lang === appLanguage)[0].value
                    : ''
                : '' )
              }}
            >
            </div>
            <div className="block-holder">
              <h3 className="title">
                <TI18n
                  keyStr="rulesWhatShouldIDoTitle"
                  default="Что делать, если я вижу, что животному нужна помощь?"
                />
              </h3>
              <p>
                <TI18n
                  keyStr="rulesWhatShouldIDoText1"
                  default="Если вы увидели, как маленького котенка выбросили на помойку, ежика с переломанной лапкой, скулящего в канализационном люке щенка, кошку, забравшуюся в вентиляционную шахту и не сумевшую оттуда выбраться, или любое другое животное нуждающееся в помощи – немедленно набирайте наш номер"
                />
                {!!contactPhones && !!contactPhones[0] && (
                  <a className="number" href={`tel:${contactPhones[0]}`}>
                    {' '}
                    {contactPhones[0]}
                  </a>
                )}
              </p>
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(contentPage.data.paragraphs.filter((p) => p.name === 'body1')[0]
                  ? contentPage.data.paragraphs.filter((p) => p.name === 'body1')[0].values
                    .filter((v) => v.lang === appLanguage)[0]
                      ? contentPage.data.paragraphs.filter((p) => p.name === 'body1')[0].values
                        .filter((v) => v.lang === appLanguage)[0].value
                      : ''
                  : '' )
                }}
              >
              </div>
              <div className="warning">
                <h4>
                  <TI18n keyStr="important" default="Важно" />!
                </h4>
                <p>
                  <TI18n
                    keyStr="rulesWarningText"
                    default="Перед тем, как привозить животное в «Порятунок тварин Харків» обязательно позвоните на «горячую линию»! Мы не принимаем животных без предварительного согласования в телефонном режиме."
                  />
                </p>
              </div>
            </div>
            <div className="block-holder">
              <h3 className="title">
                <TI18n
                  keyStr="rulesAdoptionRulesTitle"
                  default="Правила адопции"
                />
              </h3>
              <div
                className={"adoption-rules"}
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(contentPage.data.paragraphs.filter((p) => p.name === 'body2')[0]
                  ? contentPage.data.paragraphs.filter((p) => p.name === 'body2')[0].values
                    .filter((v) => v.lang === appLanguage)[0]
                      ? contentPage.data.paragraphs.filter((p) => p.name === 'body2')[0].values
                        .filter((v) => v.lang === appLanguage)[0].value
                      : ''
                  : '' )
                }}
              ></div>
            </div>
            <section className="instructions section-padding">
              <h3
                className="title"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(
                    howToAdopt.data.paragraphs
                      .find((p) => p.name === "rulesHowToAdoptTitle")?.values
                        .find((v: IParagraphValue) => v.lang === appLanguage)?.value
                    || 'Як усиновити тварину?'
                  )}}
                >
              </h3>
              <ul
                className="numbered-list"
              >
                {instructionsList.map((item, index) => (
                  <li key={index}>
                    <h4>{item.title}</h4>
                    {item.text}
                  </li>
                ))}
              </ul>
            </section>
            <div className="block-holder">
              <Breadcrumbs data={breadCrumbs} />
            </div>
          </div>
        </div>
        <HelpBlock
          animalsList={sickAnimalsList.data}
          title={
            <TI18n keyStr="canHelpBlockTitle" default="Кому ты можешь помочь" />
          }
        />
      </div>
    </React.Fragment>
  );
};
