import { API } from './index';

export interface IOrganizationDocumentsResponse {
  data: IDocument[];
  pageCount: number;
  pageNumber: number;
  pageSize: number;
  self: string;
  totalCount: number;
}

export interface IDocument {
  id: string;
  fileName: string;
}

export async function fetchOrganizationDocuments(): Promise<
  IOrganizationDocumentsResponse[]
> {
  const res = await API.get('Organization/documents');
  return res.data;
}
export async function fetchDocumentById(id: string): Promise<any> {
  const res = await API.get(`Documents/${id}`, { responseType: 'arraybuffer' });
  return res;
}
