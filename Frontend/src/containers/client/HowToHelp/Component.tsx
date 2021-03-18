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
  sickAnimalsList: IAnimalsListState;
  infoCard: IInfoCard;
  vacancies: IVacanciesState;
  location: Location;
}

export const HowToHelp: React.FC<IPropTypes> = ({
  fetchVacancies,
  clearVacancies,
  clearAnimalsState,
  sickAnimalsList,
  clearInfoCard,
  infoCard,
  vacancies,
  location,
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
    return () => {
      clearInfoCard();
      clearAnimalsState();
      clearVacancies();
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
            <div className="page-description section-margin">
              <p>
                <TI18n
                  keyStr="helpPageMainText"
                  default="Животных, которые либо родились бездомными, либо от них отказались их владельцы, подбирают неравнодушные граждане и волонтеры офиса «Порятунок тварин Харків». Мы помогаем пушистикам и с помощью волонтеров оплачиваем лечение и содержание животного, занимаемся адаптацией и поиском семьи, размещая объявления на своих площадках."
                />
              </p>
            </div>
            <div id={HelpTypes.FINANCE} className="block-holder">
              <h3>
                <TI18n keyStr="helpPageFinanceTitle" default="Финансово" />
              </h3>
              <p>
                <TI18n
                  keyStr="helpPageFinanceText"
                  default="Наша служба ежедневно заботится о сотнях животных. У нас есть автомобиль, благодаря которому мы можем выезжать на срочные вызовы, свой отдел лечения, адоптации и пристройства. Самый легкий способ помочь нам и нашим пушистикам - пожертвовать любую сумму на корм, лечение и обеспечение работы службы и приютов."
                />
              </p>
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
              <ExpandedList data={stuffListData} />
            </div>
            <div id={HelpTypes.VOLUNTEERING} className="block-holder">
              <h3>
                <TI18n
                  keyStr="helpPageVolunteeringTitle"
                  default="Волонтерством"
                />
              </h3>
              <p>
                <TI18n
                  keyStr="helpPageVolunteeringText"
                  default="Если вы хотите помочь руками - у нас всегда найдется работа! Вы активный человек, любите животных, у вас есть свободное время и желание совершать добрые и важные поступки — вы можете стать частью команды помощи и спасения бездомных животных."
                />
              </p>
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
