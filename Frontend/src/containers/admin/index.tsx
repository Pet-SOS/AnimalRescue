import React from 'react';
import {RouteComponentProps} from 'react-router';
import {HomePage} from "./Home";
import { FinancialReports } from './FinancialReports';
import { Login } from './Login';
import { AdminHomePage } from './AdminHomePage';
import { GuardProvider, GuardedRoute } from 'react-router-guards';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { guardLogin } from './guards/guardLogin';
import TagsList from './Tags/TagsList/TagsList';
import TagsCategoryList from './Tags/TagsCategory/TagsCategoryList';
import { CommonInfo } from './CommonInfo';

const history = createBrowserHistory();
interface IPropTypes extends RouteComponentProps {
  history:any
}
// To Do:
// domain /account/signIn                     = done!
// domain /account/singUp
// domain /account/forgot-password
// domain /account/reset-password
// account/unlock-account


const Admin: React.FC<IPropTypes> = (props: IPropTypes) => {
  history.location.state = props.match.path
  return  (
    <Router history={history}>
      <GuardProvider >
        <GuardedRoute path={`${props.match.path}/signIn`} exact component={Login} />
        <GuardProvider guards={[guardLogin]}>
            <GuardedRoute path={`${props.match.path}`} component={AdminHomePage} exact />
            <GuardedRoute path={`${props.match.path}/animals`} component={HomePage} exact />
            <GuardedRoute path={`${props.match.path}/reports`} component={FinancialReports} exact />
            <GuardedRoute path={`${props.match.path}/tags`} component={TagsCategoryList} exact />
            <GuardedRoute path={`${props.match.path}/tags/:tagCategoryName`} component={TagsList} exact />
            <GuardedRoute path={`${props.match.path}/common`} component={CommonInfo} exact/>
        </GuardProvider>
      </GuardProvider>
  </Router>
  )
}
export default Admin
