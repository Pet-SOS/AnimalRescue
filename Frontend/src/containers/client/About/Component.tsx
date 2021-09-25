import React, { useEffect } from 'react';
import DOMPurify from 'dompurify';

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
import { IContentPageState } from '../../../store/state/contentPages.state';

interface IPropTypes {
  fetchSickAnimals: () => void;
  clearAnimalsState: () => void;
  fetchOrganizationDocuments: () => void;
  fetchContentPage: (pageName: string) => void;
  clearContentPage: () => void;
  sickAnimalsList: IAnimalsResponse;
  organizationDocumentsList: IOrganizationDocumentsResponse;
  contentPage: IContentPageState;
  appLanguage: string;
}

export const AboutServices: React.FC<IPropTypes> = ({
  fetchSickAnimals,
  clearAnimalsState,
  fetchOrganizationDocuments,
  fetchContentPage,
  clearContentPage,
  sickAnimalsList,
  organizationDocumentsList,
  contentPage,
  appLanguage,
}) => {
  useEffect(() => {
    fetchSickAnimals();
    fetchOrganizationDocuments();
    fetchContentPage('about');
    return () => {
      clearAnimalsState();
      clearContentPage();
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
          {
            contentPage.data.paragraphs.filter((p) => p.name === 'title')[0]
            ?
            contentPage.data.paragraphs.filter((p) => p.name === 'title')[0].values
              .filter((v) => v.lang === appLanguage)[0]
              ? contentPage.data.paragraphs.filter((p) => p.name === 'title')[0].values
                .filter((v) => v.lang === appLanguage)[0].value
              : '' 
            : ''
            }
          </h2>
          <div
            className="banner"
            style={{ backgroundImage: `URL(${Banner})` }}
          ></div>
          <div className="about-content">
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
            <div className="block-holder">
              <h3>
                <TI18n keyStr="aboutOurGoalTitle" default="Хто ми" />
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
              <div
                className="innerHtml"
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
              <h3>
                <TI18n
                  keyStr="aboutServiceHowWeWorkTitle"
                  default="Як ми працюємо"
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
