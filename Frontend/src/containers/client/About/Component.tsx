import React, { useEffect } from 'react';
import { TI18n } from '../../../i18n';
import { IAnimalsResponse } from '../../../api/animals';
import { HelpBlock } from '../../../components/HelpBlock';
import './index.scss';
import { Breadcrumbs } from '../../../components/Breadcrumbs';
import { IBreadcrumbProps } from '../../../components/Breadcrumbs/item';
import Banner from '../../../img/bg-banner-02.jpg';
import {
  IOrganizationDocumentsResponse,
  IDocument,
  fetchDocumentById,
} from '../../../api/organizationDocuments';

interface IPropTypes {
  fetchSickAnimals: () => void;
  clearAnimalsState: () => void;
  fetchOrganizationDocuments: () => void;
  sickAnimalsList: IAnimalsResponse;
  organizationDocumentsList: IOrganizationDocumentsResponse;
}

export const AboutServices: React.FC<IPropTypes> = ({
  fetchSickAnimals,
  clearAnimalsState,
  fetchOrganizationDocuments,
  sickAnimalsList,
  organizationDocumentsList,
}) => {
  useEffect(() => {
    fetchSickAnimals();
    fetchOrganizationDocuments();
    return () => {
      clearAnimalsState();
    };
  }, []);

  const breadCrumbs: IBreadcrumbProps[] = [
    {
      text: (
        <TI18n
          keyStr="breadcrumbRules"
          default="Дізнатися про правила взаємодії зі службою"
        />
      ),
      href: '/about/rules',
    },
    {
      text: (
        <TI18n
          keyStr="breadcrumbFinanceReports"
          default="Подивитися фінансову звітність"
        />
      ),
      href: 'about/financial-reports',
    },
  ];

  function openPdfFile(item: IDocument) {
    fetchDocumentById(item.id)
      .then(resp => {
        const file = new Blob([resp.data], { type: 'application/pdf' });
        const fileURL = URL.createObjectURL(file);

        const strWindowFeatures =
          'menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=yes';
        window.open(fileURL, 'pdf-report', strWindowFeatures);
      })
      .catch(error => {
        console.log(error);
      });
  }

  return (
    <React.Fragment>
      <div className="about-page-holder">
        <div className="container">
          <h2 className="title">
            <TI18n keyStr="aboutPageTitle" default="Про службу порятунку" />
          </h2>
          <div
            className="banner"
            style={{ backgroundImage: `URL(${Banner})` }}
          ></div>
          <div className="about-content">
            <div className="page-description section-margin">
              <p>
                <TI18n
                  keyStr="aboutMainText"
                  default="Хочемо щоб кожен з Вас повірив, що нема нічого неможливого! Хід історії змінити може кожен. Вплинути на суспільні процеси також. Для цього потрібні прості маленькі кроки. Ми прагнемо рятувати безнадійних, рятувати тих, про кого нема кому подбати."
                />
              </p>
            </div>
            <div className="block-holder">
              <h3>
                <TI18n keyStr="aboutOurGoalTitle" default="Хто ми" />
              </h3>
              <p>
                <TI18n
                  keyStr="aboutOurGoalText"
                  default="Порятунок тварин Харків це громадська організація, яка працює за принципом МНС або швидкої допомоги для тварин. Виникла у 2015 році. За цей час спільними зусиллями надана допомога більше 4000 тваринам з яких знайдено домівки 2748 тваринам. Наш напрямок – це порятунок тварин у надзвичайних ситуаціях, де є пряма загроза життю. Наша мета – звернути увагу людей до проблеми безпритульних тварин та обєднати для знаходження ефективних рішень."
                />
              </p>
              <ul className="list-docs">
                {organizationDocumentsList.data.map((item, i: number) => (
                  <li
                    className="item-docs"
                    key={i}
                    onClick={() => {
                      openPdfFile(item);
                    }}
                  >
                    <i className="icon-pdf">icon</i>
                    <span className="file-title">{item.fileName}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="block-holder">
              <h3>
                <TI18n
                  keyStr="aboutServiceHistoryTitle"
                  default="Яким тваринам ми допомогаємо"
                />
              </h3>
              <ul className="dots-list">
                <li>
                  <TI18n keyStr="aboutReason1" default="збитим" />
                </li>
                <li>
                  <TI18n keyStr="aboutReason2" default="травмованим" />
                </li>
                <li>
                  <TI18n keyStr="aboutReason3" default="хворим" />
                </li>
                <li>
                  <TI18n
                    keyStr="aboutReason4"
                    default="застряглим у труднодоступному місці"
                  />
                </li>
                <li>
                  <TI18n keyStr="aboutReason5" default="отруєним" />
                </li>
                <li>
                  <TI18n
                    keyStr="aboutReason6"
                    default="тваринам, які зазнали жорстокого поводження від людини"
                  />
                </li>
              </ul>
            </div>
            <div className="block-holder">
              <h3>
                <TI18n
                  keyStr="aboutServiceHowWeWorkTitle"
                  default="Як ми працюємо"
                />
              </h3>
              <p>
                <TI18n
                  keyStr="aboutServiceHowWeWorkText"
                  default="Цілодобово. Всі виклики приймаються виключно через гарячу лінію +38 095 478 88 78"
                />
              </p>
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
