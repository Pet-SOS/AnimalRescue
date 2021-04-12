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

interface IPropTypes {
  fetchContentPage: (pageName: string) => void;
  clearContentPage: () => void;
  clearAnimalsState: () => void;
  sickAnimalsList: IAnimalsListState;
  contentPage: IContentPageState;
  appLanguage: string;
}

export const ServiceWorkRules: React.FC<IPropTypes> = ({
  appLanguage,
  contentPage,
  clearAnimalsState,
  sickAnimalsList,
  fetchContentPage,
  clearContentPage,
}) => {
  useEffect(() => {
    fetchContentPage('about-rules');
    sickAnimalsCheckAndLoadDefault();
    return () => {
      clearAnimalsState();
      clearContentPage();
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
            <div className="block-holder">
              <h3 className="title">
                <TI18n
                  keyStr="rulesHowToAdoptTitle"
                  default="Как усыновить животное?"
                />
              </h3>
              <div
                 dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(contentPage.data.paragraphs.filter((p) => p.name === 'body3')[0]
                  ? contentPage.data.paragraphs.filter((p) => p.name === 'body3')[0].values
                    .filter((v) => v.lang === appLanguage)[0]
                      ? contentPage.data.paragraphs.filter((p) => p.name === 'body3')[0].values
                        .filter((v) => v.lang === appLanguage)[0].value
                      : ''
                  : '' )
                }}
              ></div>
            </div>
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
