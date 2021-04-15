import { IRequestState, DEFAULT_REQUEST_STATE } from '../../api';
import { IContentPageResponse } from '../../api/contentPages';

export interface IContentPageState extends IContentPageResponse {
  isLoading: boolean;
  isLoaded: boolean;
  requestState: IRequestState;
}

export const DEFAULT_CONTENT_PAGE_STATE: IContentPageState = {
  data: {
    paragraphs: [
      {
        name: 'title',
        values: [
          {
            lang: 'ua',
            value: '',
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
      {
        name: 'foreword',
        values: [
          {
            lang: 'ua',
            value: '',
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
      {
        name: 'body1',
        values: [
          {
            lang: 'ua',
            value: '',
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
      {
        name: 'body2',
        values: [
          {
            lang: 'ua',
            value: '',
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
      {
        name: 'body3',
        values: [
          {
            lang: 'ua',
            value: '',
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
  },
  self: '',
  isLoaded: false,
  isLoading: false,
  requestState: { ...DEFAULT_REQUEST_STATE },
}