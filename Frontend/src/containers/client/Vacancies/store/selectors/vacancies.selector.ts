import { IVacanciesState } from './../state/vacancies.state';
import { ICustomAppState } from "../../../../../store/state";
import { VACANCIES_KEY } from "../reducer/vacancies.reducer";

export const selectVacancies = (state: ICustomAppState): IVacanciesState => state[VACANCIES_KEY];