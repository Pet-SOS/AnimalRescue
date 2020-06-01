export enum RequestFilterOperators { ALL = 'all', EQ = 'eq', CONTAINS = 'contains' }
export enum RequestSortOrder { ACS = 'acs', DECS = 'decs' }
export enum AllTag { TREATMENT = 'treatment', SAVED = 'saved' }
export enum BlogTags { STORY = 'story', ARTICLE = 'article' }

export interface IRequestFilterParams {
  fieldName: string;
  operator: RequestFilterOperators;
  value: string | number;
}

export interface IRequestSortParams {
  fieldName: string;
  order: RequestSortOrder;
}

export interface IRequestParams {
  page?: number;
  size?: number;
  filter?: IRequestFilterParams | string;
  sort?: IRequestSortParams;
  params?:{
    Filter: string;
  }
}

export const prepareRequestParams = (requestParams?: IRequestParams) => {
  const params: any = {
    ...requestParams
  };  
  if ((typeof requestParams?.filter != 'string') &&!!requestParams?.filter && !!requestParams?.filter?.fieldName && !!requestParams?.filter?.operator) {
    params.filter = `${requestParams?.filter?.fieldName}~${requestParams?.filter?.operator}~'${requestParams?.filter?.value}'`
  }
  if (!!requestParams?.sort && !!requestParams?.sort?.fieldName && !!requestParams?.sort?.order) {
    params.sort = `${requestParams?.sort?.fieldName}:${requestParams?.sort?.order};`
  }
  return params;
}

export const prepareReadyForAdoptionRequestParams = (requestParams?: IRequestParams) => {
  const params: any = prepareRequestParams(requestParams);
  if (params.filter !== undefined && params.filter !== "") {
    params.filter += `;status.id~eq~'READYFORADOPTION'`
  } else {
    params.filter = `status.id~eq~'READYFORADOPTION'`
  }
  return params;
}

