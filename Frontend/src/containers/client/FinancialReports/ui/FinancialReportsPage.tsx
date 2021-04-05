import React from 'react';
import DOMPurify from 'dompurify';
import { TI18n } from '../../../../i18n';
import { store } from '../../../../store';
import { HelpBlock } from '../../../../components/HelpBlock';
import { IAnimalsListState } from '../../Animals/store/state';
import '../styles/financialReportsPage.scss';
import { IInfoCard, IInfoContacts } from '../../Home/store/state';
import { 
  IFinancialReport,
  IFinancialReportYearInfo,
  fetchAboutFinancialReports,
  DEFAULT_FINANCIAL_REPORT_YEAR_INFO,
} from '../../../../api/financialReport';
import { NavLink } from 'react-router-dom';
import { IBreadcrumbProps } from '../../../../components/Breadcrumbs/item';
import { Breadcrumbs } from '../../../../components/Breadcrumbs';

interface IPropTypes {
  sickAnimalsList: IAnimalsListState;
  infoCard: IInfoCard;
  infoContacts: IInfoContacts;
  financeReports: IFinancialReport[];
  appLanguage: string;
  fetchSickAnimals: () => void;
  fetchInfoCard: () => void;
  fetchInfoContacts: () => void;
  fetchFinancialReport: () => void;
}

interface IState {
  financialReportInfo: IFinancialReportYearInfo;
}

export class FinancialReportsPage extends React.Component<IPropTypes, IState> {
  private breadCrumbs: IBreadcrumbProps[] = [
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

  constructor(props: IPropTypes) {
    super(props);
    this.state = {
      financialReportInfo: DEFAULT_FINANCIAL_REPORT_YEAR_INFO,
    };
  }

  componentDidMount() {
    this.props.fetchFinancialReport();
    if (store.getState().animals.sickAnimalsList.totalCount === 0) {
      this.props.fetchSickAnimals();
      this.props.fetchInfoCard();
      this.props.fetchInfoContacts();
    }
    fetchAboutFinancialReports()
      .then((res) => this.setState({financialReportInfo: res.data}))
      .catch((err) => console.log(err));
  }
  render() {
    const { financialReportInfo } = this.state;
    const { appLanguage } = this.props;
    const pTitle = financialReportInfo.paragraphs
                    .find((p) => p.name === 'title')?.values.find((v) => v.lang === appLanguage)?.value || '';
    const pBody = financialReportInfo.paragraphs
                    .find((p) => p.name === 'financialReportsPageText')?.values
                    .find((v) => v.lang === appLanguage)?.value || '';
    return (
      <React.Fragment>
        <div className="financial-report-block section-margin">
          <div className="container">
            <h2>{pTitle}</h2>
            <div className="page-description">
              <p 
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(pBody),
                }}
              >
              </p>
            </div>
            <ul className="box-reports section-padding">
              {this.props.financeReports.map((item, i: number) => (
                <li key={i}>
                  <NavLink
                    to={`/about/financial-reports/${item.date}`}
                    className="report"
                    href={`/${item.date}`}
                  >
                    <span className="title-report">
                      {<TI18n keyStr="financialReportsPageTitle" />}
                    </span>
                    <strong className="date-report">{item.date}</strong>
                  </NavLink>
                </li>
              ))}
            </ul>
            <Breadcrumbs data={this.breadCrumbs} />
          </div>
        </div>
        {this.props.sickAnimalsList.totalCount > 0 && (
          <HelpBlock
            animalsList={this.props.sickAnimalsList.data}
            title={
              <TI18n
                keyStr="canHelpBlockTitle"
                default="Кому ты можешь помочь"
              />
            }
          />
        )}
      </React.Fragment>
    );
  }
}
