import React from 'react';
import {Route, Switch, RouteComponentProps} from 'react-router';
import {HomePage} from "./Home";
import { AdminHeader } from "./Header";
import { AdminFooter } from "./Footer";

interface IPropTypes extends RouteComponentProps {}

const Admin: React.FC<IPropTypes> = (props: IPropTypes) => (
  <React.Fragment>
    <AdminHeader />
    <Switch>
      <Route path={props.match.path} component={HomePage} />
    </Switch>
    <AdminFooter />
  </React.Fragment>
)

export default Admin
