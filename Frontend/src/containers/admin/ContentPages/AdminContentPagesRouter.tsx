import { Redirect, Switch, useRouteMatch } from 'react-router';
import React from 'react';
import { guardLogin } from '../guards/guardLogin';
import { GuardedRoute, GuardProvider } from 'react-router-guards';
import { ContentPagesList } from './ui/ContentPagesList';
import ContentPagesEditPage from './ui/ContentPagesEditPage';
import {
  configHome,
  configAbout,
  configAboutRules,
  configHowToHelp,
} from './utils/configs';


export const AdminContentPagesRouter: React.FC = () => {
  const match = useRouteMatch();
  return (
    <Switch>
      <GuardProvider guards={[guardLogin]}>
        <GuardedRoute path={`${match.path}`} exact>
          <ContentPagesList />
        </GuardedRoute>
        <GuardedRoute path={`${match.path}/home`}>
          <ContentPagesEditPage config={configHome} />
        </GuardedRoute>
        <GuardedRoute path={`${match.path}/about`}>
          <ContentPagesEditPage config={configAbout} withDocs={true} />
        </GuardedRoute>
        <GuardedRoute path={`${match.path}/about-rules`}>
          <ContentPagesEditPage config={configAboutRules} />
        </GuardedRoute>
        <GuardedRoute path={`${match.path}/how-to-help`}>
          <ContentPagesEditPage config={configHowToHelp} />
        </GuardedRoute>
      </GuardProvider>
    </Switch>
  );
};
