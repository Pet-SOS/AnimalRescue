import React, { useEffect } from 'react';
import {Route, Switch} from 'react-router';
import {Client} from "./containers/client";
import Admin from "./containers/admin";
import { store } from './store';
import { actionGetApiConfig } from './store/actions/config.actions';
import { useSelector } from 'react-redux';
import { selectIsConfigLoaded, selectIsConfigLoading } from './store/selectors/config.selector';
import { Loader } from './components/Loader';
import Snackbar from './components/Snackbar';
import { selectIsSnackbarActive } from './store/selectors/snackbar.selector';

export const App: React.FC = () => {
  useEffect(() => {
    store.dispatch(actionGetApiConfig());
  }, []);
  const isConfigLoaded: boolean = useSelector(() => selectIsConfigLoaded(store.getState()));
  const isConfigLoading: boolean = useSelector(() => selectIsConfigLoading(store.getState()));
  const isSnackbarActive: boolean = useSelector(() => selectIsSnackbarActive(store.getState()));
  return (isConfigLoaded && !isConfigLoading
    ? (
      <React.Fragment>
        {!!isSnackbarActive && <Snackbar/>}
        <Switch>
          <Route exact={false} path="/admin" component={Admin} />
          <Route exact={false} path="/" component={Client} />
        </Switch>
      </React.Fragment>
    )
    : (
      <Loader/>
    )
  )
};


