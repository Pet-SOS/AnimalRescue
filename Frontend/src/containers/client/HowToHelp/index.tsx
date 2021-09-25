import { connect } from 'react-redux';
import { Dispatch } from 'react';
import { AnyAction } from 'redux';
import { selectSickAnimals } from '../Animals/store/selectors';
import { ICustomAppState } from '../../../store/state';
import { actionClearEntireAnimalsState } from '../Animals/store/actions';
import { HowToHelp, HOW_TO_HELP_QUERY_NAME, HelpTypes } from './Component';
import { actionClearInfoCard } from '../Home/store/actions';
import { selectSavedInfoCard } from '../Home/store/selectors';
import { IRequestParams } from '../../../api/requestOptions';
import {
  actionFetchVacanciesRequest,
  actionClearVacanciesState,
} from '../../../store/actions/vacancies.actions';
import { selectVacancies } from '../../../store/selectors/vacancies.selector';
import { actionClearContentPageState, actionFetchContentPageRequest } from '../../../store/actions/contentPages.actions';
import { selectContentPage } from '../../../store/selectors/contentPages.selector';
import { selectAppLanguage } from '../../../i18n/store/selectors';

const mapStateToProps = (state: ICustomAppState) => ({
  sickAnimalsList: selectSickAnimals(state),
  infoCard: selectSavedInfoCard(state),
  vacancies: selectVacancies(state),
  contentPage: selectContentPage(state),
  appLanguage: selectAppLanguage(state),
});
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
  fetchVacancies: (requestParams?: IRequestParams) =>
    dispatch(actionFetchVacanciesRequest(requestParams)),
  clearVacancies: () => dispatch(actionClearVacanciesState()),
  clearAnimalsState: () => dispatch(actionClearEntireAnimalsState()),
  clearInfoCard: () => dispatch(actionClearInfoCard()),
  fetchContentPage: (pageName: string) => dispatch(actionFetchContentPageRequest(pageName)),
  clearContentPage: () => dispatch(actionClearContentPageState()),
});

export const HowToHelpPage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(HowToHelp);
export const HELP_PAGE_LINKS = {
  default: '/how-to-help',
  finance: `/how-to-help?${HOW_TO_HELP_QUERY_NAME}=${HelpTypes.FINANCE}`,
  stuff: `/how-to-help?${HOW_TO_HELP_QUERY_NAME}=${HelpTypes.STUFF}`,
  volunteering: `/how-to-help?${HOW_TO_HELP_QUERY_NAME}=${HelpTypes.VOLUNTEERING}`,
};
