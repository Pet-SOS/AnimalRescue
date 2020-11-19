import { connect } from 'react-redux';
import { selectSickAnimals } from '../Animals/store/selectors';
import { ICustomAppState } from '../../../store/state';
import { Dispatch } from 'react';
import { AnyAction } from 'redux';
import { actionClearEntireAnimalsState } from '../Animals/store/actions';
import { ServiceWorkRules } from './Component';

const mapStateToProps = (state: ICustomAppState) => ({
  sickAnimalsList: selectSickAnimals(state),
});
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
  clearAnimalsState: () => dispatch(actionClearEntireAnimalsState()),
});

export const RulesPage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ServiceWorkRules);
export const RULES_PAGE_LINK: string = '/rules';
