import React, { useEffect } from 'react';
import DOMPurify from 'dompurify';
import { TI18n } from '../../../i18n';
import './index.scss';
import { HelpBlock } from '../../../components/HelpBlock';
import queryString from 'query-string';
import { Location } from 'history';
import { ExpandedList } from '../../../components/ExpandedList';
import { IAnimalsListState } from '../Animals/store/state';
import { sickAnimalsCheckAndLoadDefault } from '../Animals/store/selectors';
import { IInfoCard } from '../Home/store/state';
import { infoCardCheckAndLoad } from '../Home/store/selectors';
import { IVacanciesState } from '../../../store/state/vacancies.state';
import { IExpandedListItemProps } from '../../../components/ExpandedList/item';
import { RegularNeedsList } from './goods/RegularNeeds';
import { MedicinesList } from './goods/MedicinesList';
import { AntiparasiticNeedsList } from './goods/AntiparasiticList';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Breadcrumbs } from '../../../components/Breadcrumbs';
import { IBreadcrumbProps } from '../../../components/Breadcrumbs/item';
import Banner from '../../../img/bg-banner-03.jpg';
import { IContentPageState } from '../../../store/state/contentPages.state';

export enum HelpTypes {
  FINANCE = 'finance',
  STUFF = 'stuff',
  VOLUNTEERING = 'volunteering',
}
export const HOW_TO_HELP_QUERY_NAME: string = 'helpType';

interface IPropTypes {
  clearAnimalsState: () => void;
  clearInfoCard: () => void;
  fetchVacancies: () => void;
  clearVacancies: () => void;
  fetchContentPage: (pageName: string) => void;
  clearContentPage: () => void;
  sickAnimalsList: IAnimalsListState;
  infoCard: IInfoCard;
  vacancies: IVacanciesState;
  location: Location;
  contentPage: IContentPageState;
  appLanguage: string;
}

export const HowToHelp: React.FC<IPropTypes> = ({
  fetchVacancies,
  clearVacancies,
  clearAnimalsState,
  clearInfoCard,
  fetchContentPage,
  clearContentPage,
  sickAnimalsList,
  infoCard,
  vacancies,
  location,
  contentPage,
  appLanguage,
}) => {
  const scrollToBlock = () => {
    const helpType = queryString.parse(location.search)[HOW_TO_HELP_QUERY_NAME];
    const el =
      !!helpType && typeof helpType === 'string'
        ? document.getElementById(`${helpType}`)
        : null;
    if (!!el) {
      el.scrollIntoView({
        behavior: 'smooth',
      });
    }
  };
  useEffect(() => {
    sickAnimalsCheckAndLoadDefault();
    infoCardCheckAndLoad();
    fetchVacancies();
    fetchContentPage('how-to-help');
    return () => {
      clearInfoCard();
      clearAnimalsState();
      clearVacancies();
      clearContentPage();
    };
  }, []);
  useEffect(() => {
    scrollToBlock();
  }, [window.location.href]);

  const stuffListData: IExpandedListItemProps[] = [
    {
      title: (
        <TI18n keyStr="helpPageStuffListTitle1" default="Постійні потреби" />
      ),
      body: [<RegularNeedsList />],
    },
    {
      title: <TI18n keyStr="helpPageStuffListTitle2" default="Медикаменти" />,
      body: [<MedicinesList />],
    },
    {
      title: (
        <TI18n
          keyStr="helpPageStuffListTitle3"
          default="Протипаразитарні засоби"
        />
      ),
      body: [<AntiparasiticNeedsList />],
    },
  ];

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
          keyStr="breadcrumbRules"
          default="Дізнатися про правила взаємодії зі службою"
        />
      ),
      href: '/about/rules',
    },
  ];

  return (
    <React.Fragment>
      <div className="help-page-holder">
        <div className="container">
          <h2>
            <TI18n keyStr="helpPageTitle" default="Как я могу помочь" />
          </h2>
          <div
            className="banner"
            style={{ backgroundImage: `URL(${Banner})` }}
          />
          <div className="help-page-content">
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
            ></div>
            <div id={HelpTypes.FINANCE} className="block-holder">
              <h3>
                <TI18n keyStr="helpPageFinanceTitle" default="Финансово" />
              </h3>
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
              ></div>
              {!!infoCard?.data && (
                <div className="bank-card">
                  <div className="bank-card-info">
                    <p
                      className="card"
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(infoCard.data.body),
                      }}
                    ></p>
                  </div>
                  <CopyToClipboard
                    text={infoCard.data.body.replace(/\D+/g, '')}
                    className="copy-to-clipboard"
                  >
                    <button>
                      <i className="icon-copy">
                        <span className="path1">icon</span>
                        <span className="path2">icon</span>
                        <span className="path3">icon</span>
                        <span className="path4">icon</span>
                      </i>
                    </button>
                  </CopyToClipboard>
                </div>
              )}
            </div>
            <div id={HelpTypes.STUFF} className="block-holder">
              <h3>
                <TI18n keyStr="helpPageStuffTitle" default="Вещами" />
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
            <div id={HelpTypes.VOLUNTEERING} className="block-holder">
              <h3>
                <TI18n
                  keyStr="helpPageVolunteeringTitle"
                  default="Волонтерством"
                />
              </h3>
              <div
                className="innerHtml"
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
              {!!vacancies && !!vacancies.data && !!vacancies.data.length && (
                <React.Fragment>
                  <h4>
                    <TI18n
                      keyStr="helpPageVolunteeringListTitle"
                      default="Какую работу могут выполнять волонтеры?"
                    />
                  </h4>
                  <div className="vacations-list">
                    <ExpandedList
                      data={vacancies.data.map(vacancy => ({
                        title: vacancy.name,
                        body: [vacancy.description],
                      }))}
                    />
                  </div>
                </React.Fragment>
              )}
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
