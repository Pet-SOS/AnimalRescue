import { connect } from 'react-redux';
import { selectSickAnimals } from '../Animals/store/selectors';
import { ICustomAppState } from '../../../store/state';
import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import { actionClearEntireAnimalsState } from '../Animals/store/actions';
import {
  actionFetchContentPageRequest,
  actionClearContentPageState,
} from '../../../store/actions/contentPages.actions';
import { ServiceWorkRules } from './Component';
import { selectContentPage } from '../../../store/selectors/contentPages.selector';
import { selectAppLanguage } from '../../../i18n/store/selectors';

const mapStateToProps = (state: ICustomAppState) => ({
  sickAnimalsList: selectSickAnimals(state),
  contentPage: selectContentPage(state),
  appLanguage: selectAppLanguage(state),
});
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return bindActionCreators(
    {
      fetchContentPage: actionFetchContentPageRequest,
      clearContentPage: actionClearContentPageState,
      clearAnimalsState: () => dispatch(actionClearEntireAnimalsState()),
    },
    dispatch,
  );
};

export const RulesPage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ServiceWorkRules);
export const RULES_PAGE_LINK: string = '/rules';
