import { connect } from 'react-redux';
import { selectSickAnimals } from '../Animals/store/selectors';
import { ICustomAppState } from '../../../store/state';
import { Dispatch } from 'react';
import { AnyAction } from 'redux';
import {
  actionFetchSickAnimals,
  actionClearEntireAnimalsState,
} from '../Animals/store/actions';
import { AboutServices } from './Component';
import { actionFetchOrganizationDocumentsRequest } from '../../../store/actions/organizationDocuments.actions';
import { selectOrganizationDocuments } from '../../../store/selectors/organizationDocuments.selector';

const mapStateToProps = (state: ICustomAppState) => ({
  sickAnimalsList: selectSickAnimals(state),
  organizationDocumentsList: selectOrganizationDocuments(state),
});
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
  fetchSickAnimals: () => dispatch(actionFetchSickAnimals()),
  clearAnimalsState: () => dispatch(actionClearEntireAnimalsState()),
  fetchOrganizationDocuments: () =>
    dispatch(actionFetchOrganizationDocumentsRequest()),
});

export const AboutPage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AboutServices);
