import { Redirect, Switch, useRouteMatch } from 'react-router';
import React from 'react';
import { guardLogin } from '../guards/guardLogin';
import { GuardedRoute, GuardProvider } from 'react-router-guards';
import { BlogListPage } from './ui/BlogListPage';
import { BlogEditPage } from './ui/BlogEditPage';
import { BlogCreateItem } from './ui/BlogCreateItem';

export const AdminBlogRouter: React.FC = () => {
  const match = useRouteMatch();
  return (
    <Switch>
      <GuardProvider guards={[guardLogin]}>
        <GuardedRoute path={`${match.path}`} exact>
          <Redirect to={`${match.path}/page/1`} />
        </GuardedRoute>

        <GuardedRoute path={`${match.path}/create`} exact>
          <Redirect to={`${match.path}/create/article`} />
        </GuardedRoute>
        <GuardedRoute path={`${match.path}/create/article`} exact>
          <BlogCreateItem />
        </GuardedRoute>

        <GuardedRoute path={`${match.path}/:blogId`} exact>
          <BlogEditPage />
        </GuardedRoute>

        {/*<Route path='/blog/:blogId' component={BlogItemPage} exact />*/}
        <GuardedRoute path={`${match.path}/page/:page`} exact>
          <BlogListPage />
        </GuardedRoute>
      </GuardProvider>
    </Switch>
  );
};
