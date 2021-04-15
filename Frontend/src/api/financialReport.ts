import { IParagraph } from './contacts';
import API from './index';
import { IRequestParams } from './requestOptions';

export interface IInfoFile {
  title: string;
  body: string;
  fileId: string;
  date: Date;
  createdAt: string;
  modifiedAt: null | string;
  createdBy: null | string;
  modifiedBy: null | string;
  id: string;
}

export interface IFinancialReport {
  date: string;
  reports: IInfoFile[];
}

export interface IFinancialReportYearInfo {
  id?: string;
  year?: number;
  paragraphs: IParagraph[];
}

export interface IAboutFinancialReports {
  paragraphs: IParagraph[];
}

export const DEFAULT_FINANCIAL_REPORTS_PAGE_TEXT = {
  paragraphs: [
    {
      name: 'title',
      values: [
          {
              lang: 'ua',
              value: ''
          },
          {
              lang: 'en',
              value: ''
          },
          {
              lang: 'de',
              value: ''
          },
          {
              lang: 'ru',
              value: ''
          }
      ]
    }, {
      name: "financialReportsPageText",
      values: [
        {
            lang: 'ua',
            value: ''
        },
        {
            lang: 'en',
            value: ''
        },
        {
            lang: 'de',
            value: ''
        },
        {
            lang: 'ru',
            value: ''
        },
      ],
    },
  ],
}

export const DEFAULT_FINANCIAL_REPORT_YEAR_INFO = {
  year: 0,
  paragraphs: [
    {
        name: 'title',
        values: [
            {
                lang: 'ua',
                value: ''
            },
            {
                lang: 'en',
                value: ''
            },
            {
                lang: 'de',
                value: ''
            },
            {
                lang: 'ru',
                value: ''
            }
        ]
    },
    {
        name: 'body',
        values: [
            {
                lang: 'ua',
                value: ''
            },
            {
                lang: 'en',
                value: ''
            },
            {
                lang: 'de',
                value: ''
            },
            {
                lang: 'ru',
                value: ''
            }
        ]
    },
  ],
}

export async function fetchFinancialReport(
  requestParams?: IRequestParams,
): Promise<IFinancialReport[]> {
  const res = await API.get(`FinancialReport/years`);
  return res.data;
}
export async function fetchFinancialReporDocument(id: string): Promise<any> {
  const res = await API.get(`Documents/${id}`, { responseType: 'arraybuffer' });
  return res;
}
export async function deleteFinancialReporDocument(id: string): Promise<any> {
  const res = await API.delete(`FinancialReport/${id}`);
  return res;
}
export async function addFinancialReporDocument(report?: any): Promise<any> {
  const res = await API.post(`FinancialReport`, report);
  return res.data;
}

export async function fetchFinancialReportYearInfo(year: number): Promise<any> {
  const res = await API.get(`FinancialReportYearInfo/${year}`);
  return res.data;
}

export async function addFinancialReportYearInfo(yearInfo: IFinancialReportYearInfo): Promise<any> {
  const res = await API.post('FinancialReportYearInfo', yearInfo);
  return res.data;
}

export async function updateFinancialReportYearInfo(params: {
  id?: string;
  yearInfo: IFinancialReportYearInfo;
}): Promise<any> {
  const { yearInfo, id } = params;
  const res = await API.put(`FinancialReportYearInfo/${id}`, yearInfo);
  return res.data;
}

export async function fetchAboutFinancialReports(): Promise<any> {
  const res = await API.get('Configurations/about-financial-reports');
  return res.data;
}

export async function updateAboutFinancialReports(financialInfo: IAboutFinancialReports): Promise<any> {
  const res = await API.put('Configurations/about-financial-reports', financialInfo);
  console.log(res);
  return res.data;
}