import React from 'react';
import {Route, Switch} from 'react-router';
import {Client} from "./containers/client";
import Admin from "./containers/admin";


interface IPropTypes {

}

export const App: React.FC<IPropTypes> = () => (
  <Switch>
      <Route exact={false} path="/admin" component={Admin}/>
      <Route exact={false} path="/" component={Client}/>
  </Switch>
);


