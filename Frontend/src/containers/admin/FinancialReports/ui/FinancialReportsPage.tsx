import React from 'react';
import { Tabs } from 'antd';
import '../style/FinancialReportsPage.scss';
import {
  IFinancialReport,
  deleteFinancialReporDocument,
  addFinancialReporDocument,
  IInfoFile,
  fetchFinancialReporDocument,
  fetchFinancialReportYearInfo,
  addFinancialReportYearInfo,
} from '../../../../api/financialReport';
import { ReactComponent as Pdf } from '../../../../img/pdf.svg';
import moment from 'moment';
import { TI18n } from '../../../../i18n';
import { Button, ButtonTypes } from '../../../../components/Button';
import { DatePicker } from 'antd';
import { AdminMenu } from '../../AdminMenu';
import { FinancialReportYearInfo } from './FinancialReportYearInfo';

const { TabPane } = Tabs;
const { RangePicker } = DatePicker;

interface IState {
  [key: string]: any;
}

interface IPropTypes {
  financeReports: IFinancialReport[];
  fetchFinancialReport: () => {};
}

export class FinancialReportsPage extends React.Component<IPropTypes, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      file: '',
      title: '',
      body: '',
      date: '',
    };
  }

  componentDidMount() {
    this.props.fetchFinancialReport();
  }

  handleSubmit(e: any) {
    e.preventDefault();
    const { file, title, body, date } = this.state;
    if (!file) {
      return;
    }

    let localDate = moment(date).format('L');
    const formData = new FormData();
    formData.append('title', title);
    formData.append('body', body);
    formData.append('date', localDate);
    formData.append('file', file, file.name);
    addFinancialReporDocument(formData)
      .then(resp => {
        this.props.fetchFinancialReport();
      })
      .then(() =>
        this.setState({
          file: '',
        }),
      );
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

  async uploadFile(e: any) {
    e.preventDefault();
    await this.setState({ file: e.target.files[0] });
  }

  handleFileInfo(field: string, e: any) {
    switch (field) {
      case 'title':
      case 'body':
        this.setState({ [field]: e.target.value });
        break;
      case 'date':
        this.setState({ [field]: e.toDate() });
        break;
    }
  }

  async deleteReport(id: string, title: string): Promise<any> {
    await deleteFinancialReporDocument(id)
      .then(resp => {
        console.log(resp);
        if (resp.status === 200) {
          this.props.fetchFinancialReport();
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const reversedFinanceReports = this.props.financeReports.slice().reverse();
    return (
      <div className="boxAdmin">
        <AdminMenu selectedKey={'reports'} openKeys={['sub1']} />
        <main>
          <div className="container">
            <section className="section-reports">
              <header>
                <h3>Фінансові звіти</h3>
              </header>
              <div className="page-content">
                <div className="inner-top section-margin">
                  <FinancialReportYearInfo />
                </div>
                <section className="section-new-report">
                  <h4> Завантажити новий звiт</h4>
                    <form onSubmit={e => this.handleSubmit(e)}>
                    <div className="field">
                      <label>Виберіть документ у pdf форматі</label>
                      <br />
                      <input
                        id="downloadReport"
                        className="custom-file-input"
                        type="file"
                        onChange={e => this.uploadFile(e)}
                      />
                      <label htmlFor="downloadReport">
                        <span>{this.state.file.name}</span>
                      </label>
                    </div>
                    <div className="field">
                      <label>Виберіть період звіту</label>
                      <br />
                      {/*TODO: Changed to datePicker due to the absent support of date range on the BE*/}
                      {/*<RangePicker*/}
                      {/*    placeholder={["Початок", "Кінець"]}*/}
                      {/*    // defaultValue={moment('YYYY-MM-DD')}*/}
                      {/*    // onChange={(e) => this.handleFileInfo('date', e)}*/}
                      {/*/>*/}
                      <DatePicker
                        placeholder=""
                        onChange={e => this.handleFileInfo('date', e)}
                      />
                    </div>
                  </form>
                  <Button
                    onClick={e => this.handleSubmit(e)}
                    styleType={ButtonTypes.BlueOutlineSmall}
                  >
                    <TI18n keyStr="addReport" />
                  </Button>
                </section>
                <section className="section-all-reports">
                  <h4>Звiти за всi роки</h4>
                    {reversedFinanceReports.length > 0 && (
                      <div className="inner-all-reports">
                        <Tabs defaultActiveKey="1" tabPosition="top">
                          {reversedFinanceReports.map(
                            (report: IFinancialReport, i: number) => (
                              <TabPane
                                tab={report.date}
                                key={report.date + 1}
                              >
                                <FinancialReportYearInfo
                                  year={parseInt(report.date)}
                                />
                                <span className="title-uploaded-reports">
                                  Завантажені документи
                                </span>
                                <div className="list-reports">
                                  {report.reports.map(infoFile => (
                                    <div key={infoFile.id} className="report">
                                      <i className="icon-pdf" />
                                        <div
                                          onClick={() =>
                                            this.openPdfFile(infoFile)
                                          }
                                          className="title-item"
                                        >
                                          <TI18n
                                            keyStr={`dateText${moment(
                                              infoFile.date,
                                            ).month()}`}
                                          />
                                          <span className="year-report">
                                            {moment(infoFile.date).year()}
                                          </span>
                                        </div>
                                        <button
                                          onClick={() => {
                                            this.deleteReport(
                                              infoFile.id,
                                              infoFile.title,
                                            );
                                          }}
                                          className="delete icon-close"
                                        />
                                      </div>
                                    ))}
                                  </div>
                              </TabPane>
                            ),
                          )}
                        </Tabs>
                      </div>
                    )}
                </section>
              </div>
            </section>
          </div>
        </main>
      </div>
    );
  }
}
