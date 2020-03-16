import { IAPIConfig } from '../../api/config';

export interface IConfigState {
  isLoading: boolean;
  isLoaded: boolean;
  data: IAPIConfig;
}

export const DEFAULT_CONFIG_STATE: IConfigState = {
  data: {
    API_URL: '',
    YOUTUBE_URL: '',
    YOUTUBE_API_KEY: '',
    YOUTUBE_CHANEL_ID: '',
  },
  isLoaded: false,
  isLoading: false,
}