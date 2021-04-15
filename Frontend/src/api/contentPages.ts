import { API } from './index';
import { IParagraph } from './contacts';

export interface IContentPage {
  paragraphs: IParagraph[];
}

export interface IContentPageResponse {
  data: IContentPage;
  self: string;
}

export async function fetchContentPage(pageName: string): Promise<IContentPageResponse> {
  const res = await API.get(`Configurations/${pageName}`);
  return res.data;
}

export async function updateContentPage(params: {
  pageName: string,
  contentPage: IContentPage
}): Promise<IContentPageResponse> {
  const {pageName, contentPage} = params;
  const res = await API.put(`Configurations/${pageName}`, contentPage);
  return res.data;
} 