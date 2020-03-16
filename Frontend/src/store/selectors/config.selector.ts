import { IConfigState } from './../state/config.state';
import { ICustomAppState } from "../state";
import { CONFIG_KEY } from '../reducers/config.reducer';
import { IAPIConfig } from '../../api/config';

export const selectConfigState = (state: ICustomAppState): IConfigState => state[CONFIG_KEY];
export const selectConfigData = (state: ICustomAppState): IAPIConfig => state[CONFIG_KEY].data;
export const selectIsConfigLoaded = (state: ICustomAppState): boolean => state[CONFIG_KEY].isLoaded;
export const selectIsConfigLoading = (state: ICustomAppState): boolean => state[CONFIG_KEY].isLoading;
export const selectApiUrl = (state: ICustomAppState): string => state[CONFIG_KEY].data.API_URL;