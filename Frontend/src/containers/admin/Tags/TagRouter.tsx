import { Switch, useRouteMatch } from 'react-router';
import { GuardedRoute, GuardProvider } from 'react-router-guards';
import TagsCategoryList from './TagsCategory/TagsCategoryList';
import TagsList from './TagsList/TagsList';
import React from 'react';
import { guardLogin } from '../guards/guardLogin';

export const AdminTagsRouter: React.FC = () => {
  let match = useRouteMatch();
  return (
    <Switch>
      <GuardProvider guards={[guardLogin]}>
        <GuardedRoute path={`${match.path}`} exact>
          <TagsCategoryList />
        </GuardedRoute>
        <GuardedRoute
          path={[
            `${match.url}/:tagCategoryName/:nested(.{0,})`,
            `${match.url}/:tagCategoryName`,
          ]}
        >
          <TagsList />
        </GuardedRoute>
      </GuardProvider>
    </Switch>
  );
};
