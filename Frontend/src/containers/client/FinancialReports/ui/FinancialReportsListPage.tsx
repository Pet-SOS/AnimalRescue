import React from 'react';
import { TI18n } from '../../../../i18n';
import { store } from '../../../../store';
import { HelpBlock } from '../../../../components/HelpBlock';
import moment from 'moment';
import { IAnimalsListState } from '../../Animals/store/state';
import '../styles/financialReportsPage.scss';
import { IInfoCard, IInfoContacts } from '../../Home/store/state';
import {
  IFinancialReport,
  IInfoFile,
  fetchFinancialReporDocument,
} from '../../../../api/financialReport';
import { ReactComponent as Pdf } from '../../../../img/pdf.svg';

interface IPropTypes {
  match: any;
  sickAnimalsList: IAnimalsListState;
  infoCard: IInfoCard;
  infoContacts: IInfoContacts;
  financeReports: IFinancialReport[];
  fetchSickAnimals: () => void;
  fetchInfoCard: () => void;
  fetchInfoContacts: () => void;
  fetchFinancialReport: () => void;
}
interface IState {
  reports: string[];
  pdfReport: {
    file: string;
    url: string;
  };
}
export class FinancialReportsListPage extends React.Component<
  IPropTypes,
  IState
> {
  year = this.props.match.params.year;
  reports: IInfoFile[] = [];

  constructor(props: IPropTypes) {
    super(props);
    this.state = {
      reports: [],
      pdfReport: {
        file: '',
        url: '',
      },
    };
  }

  componentDidMount() {
    if (store.getState().animals.sickAnimalsList.totalCount === 0) {
      this.props.fetchSickAnimals();
      this.props.fetchInfoCard();
      this.props.fetchInfoContacts();
      this.props.fetchFinancialReport();
    }
  }

  getFinanceReportsForYear() {
    this.props.financeReports.map((iter: IFinancialReport) => {
      if (iter.date == this.year) {
        this.reports = [...iter.reports];
      }
    });
  }

  openPdfFile(item: IInfoFile) {
    fetchFinancialReporDocument(item.fileId)
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

  render() {
    this.getFinanceReportsForYear();
    return (
      <React.Fragment>
        <div className="financial-report-block">
          <div className="container">
            <h2>
              <TI18n
                keyStr="financialReportsPageTitle"
                default="Финансовые отчеты"
              />
            </h2>
            <div className="page-description">
              <p>
                <TI18n keyStr="financialReportsListPageText" />
              </p>
            </div>
            <ul className="list-reports">
              {this.reports.map((item, i: number) => (
                <li
                  key={i}
                  onClick={() => {
                    this.openPdfFile(item);
                  }}
                >
                  <i className="icon-pdf">icon-pdf</i>
                  <TI18n keyStr={`dateText${moment(item.date).month()}`} />
                  <span className="year-report">
                    {moment(item.date).year()}
                  </span>
                </li>
              ))}
            </ul>
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
