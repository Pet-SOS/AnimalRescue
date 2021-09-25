import React, { useEffect, Dispatch } from 'react';
import { Route, Switch } from 'react-router';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';

import { Client } from './containers/client';
import Admin from './containers/admin';
import { actionGetApiConfig } from './store/actions/config.actions';
import {
  selectIsConfigLoaded,
  selectIsConfigLoading,
} from './store/selectors/config.selector';
import { Loader } from './components/Loader';
import Snackbar from './components/Snackbar';
import { selectIsSnackbarActive } from './store/selectors/snackbar.selector';
import { ICustomAppState } from './store/state';
import { actionGetAllTags } from './store/actions/tags.actions';
import {
  selectIsTagsListLoading,
  selectIsTagsListLoaded,
} from './store/selectors/tags.selector';

interface IPropTypes {
  getApiConfig: () => void;
  getTagsList: (pageSize: number) => void;
  isConfigLoaded: boolean;
  isConfigLoading: boolean;
  isSnackbarActive: boolean;
  isTagsListLoaded: boolean;
  isTagListLoading: boolean;
}

const App: React.FC<IPropTypes> = ({
  getApiConfig,
  getTagsList,
  isConfigLoaded,
  isConfigLoading,
  isSnackbarActive,
  isTagsListLoaded,
  isTagListLoading,
}) => {
  useEffect(() => {
    getApiConfig();
  }, []);
  useEffect(() => {
    if (!isTagsListLoaded && !isTagListLoading && isConfigLoaded) {
      getTagsList(99);
    }
  }, [isConfigLoaded]);

  return isConfigLoaded && !isConfigLoading ? (
    <React.Fragment>
      {!!isSnackbarActive && <Snackbar />}
      <Switch>
        <Route exact={false} path="/admin" component={Admin} />
        <Route exact={false} path="/" component={Client} />
      </Switch>
    </React.Fragment>
  ) : (
    <Loader />
  );
};

const mapStateToProps = (state: ICustomAppState) => ({
  isConfigLoaded: selectIsConfigLoaded(state),
  isConfigLoading: selectIsConfigLoading(state),
  isSnackbarActive: selectIsSnackbarActive(state),
  isTagsListLoaded: selectIsTagsListLoaded(state),
  isTagListLoading: selectIsTagsListLoading(state),
});
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
  getApiConfig: () => dispatch(actionGetApiConfig()),
  getTagsList: (size: number) => dispatch(actionGetAllTags({ size })),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
