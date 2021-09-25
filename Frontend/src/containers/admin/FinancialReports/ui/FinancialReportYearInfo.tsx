import React, { useEffect } from 'react';
import { connect, Provider } from 'react-redux';
import { message, Tabs } from 'antd';

import { TI18n } from '../../../../i18n';
import { store } from '../../../../store';
import { HtmlEditor, styleCard } from '../../../../components/HtmlEditor';
import {
  IFinancialReportYearInfo,
  fetchFinancialReportYearInfo,
  addFinancialReportYearInfo,
  updateFinancialReportYearInfo,
  fetchAboutFinancialReports,
  updateAboutFinancialReports,
  DEFAULT_FINANCIAL_REPORT_YEAR_INFO,
  DEFAULT_FINANCIAL_REPORTS_PAGE_TEXT,
} from '../../../../api/financialReport';

const { TabPane } = Tabs;

interface IPropTypes {
  year?: number;
}

const configWithYear = {
  tabs: [
      {
          label: 'Укр',
          key: '1',
          lang: 'ua'
      }, {
          label: 'Eng',
          key: '2',
          lang: 'en'
      }, {
          label: 'Deu',
          key: '3',
          lang: 'de'
      }, {
          label: 'Рус',
          key: '4',
          lang: 'ru'
      }
  ],
  controls: [
    {
        label: 'Заголовок',
        tag: 'input',
        key: 'title'
    }, {
        label: 'Передмова',
        tag: 'HtmlEditor',
        key: 'body'
    },
  ],
}

const configWithoutYear = {
  tabs: [
    {
      label: 'Укр',
      key: '1',
      lang: 'ua'
    }, {
        label: 'Eng',
        key: '2',
        lang: 'en'
    }, {
        label: 'Deu',
        key: '3',
        lang: 'de'
    }, {
        label: 'Рус',
        key: '4',
        lang: 'ru'
    }
  ],
  controls: [
    {
      label: 'Заголовок',
        tag: 'input',
        key: 'title',
    }, {
      label: 'Передмова',
        tag: 'HtmlEditor',
        key: 'financialReportsPageText',
    }
  ],
}

export class FinancialReportYearInfo extends React.Component<IPropTypes, IFinancialReportYearInfo> {
  constructor(props: IPropTypes){
    super(props);

    const paragraphs = this.props.year
      ? [...DEFAULT_FINANCIAL_REPORT_YEAR_INFO.paragraphs]
      : [...DEFAULT_FINANCIAL_REPORTS_PAGE_TEXT.paragraphs];

    this.props.year
    ? this.state = { paragraphs, year: this.props.year }
    : this.state = { paragraphs } 
    
}

  componentDidMount() {
    if (this.props.year) {
      fetchFinancialReportYearInfo(this.props.year)
        .then((res) => {
          this.setState({ ...res.data });
        })
        .catch((err) => console.log(err));
    } else {
      fetchAboutFinancialReports()
        .then((res) => {
          this.setState({ ...res.data });
        })
        .catch((err) => console.log(err));
    }
  }

  componentWillUnmount() {
    this.state = {
      year: this.props.year,
      paragraphs: [...DEFAULT_FINANCIAL_REPORT_YEAR_INFO.paragraphs],
    }
  }

  handleYearInfo = (value: string, key: string, lang: string) => {
    const paragraphs = [...this.state.paragraphs];
    const paragraphIndex = paragraphs.findIndex(p => p.name === key);
    const valueIndex = paragraphs[paragraphIndex].values.findIndex(v => v.lang === lang);
    paragraphs[paragraphIndex].values[valueIndex].value = value;     

    this.setState({ paragraphs });
};

post = () => {
  const paragraphs = [...this.state.paragraphs];
  for (let paragraph of paragraphs) {
    let emptyVal = paragraph.values.find(obj => obj.value === '');
    if (emptyVal) {
      message.error({
        content: (
          <Provider store={store}>
            <TI18n
              keyStr="noEmptyFields"
              default="Усі поля мають бути заповнені"
            />
          </Provider>
        ),
      });
      return;
    }
  }
  if (this.state.year) {
    addFinancialReportYearInfo({...this.state});
  } else {
    updateAboutFinancialReports({...this.state});
  }
}

put = () => {
  if (this.state.year) {
    updateFinancialReportYearInfo({id: this.state.id, yearInfo: {...this.state}})
  } else {
    updateAboutFinancialReports({...this.state});
  }
}

handleSubmit = (e: React.SyntheticEvent<EventTarget>) => {
  e.preventDefault();
  if (this.state.id) {
    this.put();
  } else {
    this.post();
  }
};

  render () {
    const { paragraphs } = this.state;
    let config = configWithoutYear;
    if (this.state.year) {
      config = configWithYear;
    }
    return (
      <Tabs defaultActiveKey="1">
        {config.tabs.map(tab => <TabPane tab={tab.label} key={tab.key}>
          {config.controls.map(control => <div className="form-row" key={control.key}>
            <label htmlFor={control.key + tab.key}>{control.label}</label>
              {
                control.tag === 'input'
                ?
                  <input
                    id={control.key + tab.key}
                    type="text"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>)=>this.handleYearInfo(e.target.value, control.key, tab.lang)}
                    value={`${paragraphs.filter(p => p.name === control.key)[0].values.filter(v => v.lang === tab.lang)[0].value}` || ''}/>
                :
                  <HtmlEditor
                    editorState={`${paragraphs.filter(p => p.name === control.key)[0].values.filter(v => v.lang === tab.lang)[0].value}` || ''}
                    onChange={(value: string)=>this.handleYearInfo(value, control.key, tab.lang)}
                    classList={styleCard}
                  />
              }                            
            </div>)}
  
            <button className="btn btn-blue" onClick={(e)=>this.handleSubmit(e)}>Зберегти зміни</button>
          </TabPane>)}
      </Tabs>
    );
  }
}