import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router';
import { bindActionCreators, Dispatch, AnyAction } from 'redux';
import { ContentPagesEditItem } from './ContentPagesEditItem';
import { ICustomAppState } from '../../../../store/state';
import {
  actionFetchContentPageRequest,
  actionClearContentPageState,
} from '../../../../store/actions/contentPages.actions';
import { selectContentPage } from '../../../../store/selectors/contentPages.selector';
import { actionUpdateContentPageRequest } from '../store/actions';
import { actionFetchOrganizationDocumentsRequest } from '../../../../store/actions/organizationDocuments.actions';
import { selectOrganizationDocuments } from '../../../../store/selectors/organizationDocuments.selector';

const mapStateToProps = (state: ICustomAppState) => {
  return {
    contentPage: selectContentPage(state),
    organizationDocumentsList: selectOrganizationDocuments(state),
  };
};
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return bindActionCreators(
    {
      fetchContentPage: actionFetchContentPageRequest,
      updateContentPage: actionUpdateContentPageRequest,
      clearContentPage: actionClearContentPageState,
      fetchOrganizationDocuments: () =>
        dispatch(actionFetchOrganizationDocumentsRequest()),
    },
    dispatch,
  );
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ContentPagesEditItem));
