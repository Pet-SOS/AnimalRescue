import React, { useEffect } from 'react';
import {Route, Switch} from 'react-router';
import {Client} from "./containers/client";
import Admin from "./containers/admin";
import { store } from './store';
import { actionGetApiConfig } from './store/actions/config.actions';
import { useSelector } from 'react-redux';
import { selectIsConfigLoaded, selectIsConfigLoading } from './store/selectors/config.selector';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  useEffect(() => {
    store.dispatch(actionGetApiConfig());
  }, []);
  const isConfigLoaded: boolean = useSelector(() => selectIsConfigLoaded(store.getState()));
  const isConfigLoading: boolean = useSelector(() => selectIsConfigLoading(store.getState()));
  return (isConfigLoaded && !isConfigLoading
    ? (
      <Switch>
        <Route exact={false} path="/admin" component={Admin} />
        <Route exact={false} path="/" component={Client} />
      </Switch>
    )
    : (
      <Loader/>
    )
  )
};


