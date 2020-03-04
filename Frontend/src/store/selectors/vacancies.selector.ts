import { IVacanciesState } from './../state/vacancies.state';
import { ICustomAppState } from "../state";
import { VACANCIES_KEY } from "../reducers/vacancies.reducer";

export const selectVacancies = (state: ICustomAppState): IVacanciesState => state[VACANCIES_KEY];