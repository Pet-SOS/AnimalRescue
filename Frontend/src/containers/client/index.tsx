import React from 'react';
import {Route, Switch, RouteComponentProps} from 'react-router';
import AppHeader from './Header';
import {AppFooter} from './Footer';
import {HomePage} from './Home';
import { RulesPage } from './Rules';

interface IPropTypes extends RouteComponentProps {

}

export const Client: React.FC<IPropTypes> = (props: IPropTypes) => {
    return (
      <React.Fragment>
        <AppHeader/>
        <div className="main">
          <Switch>
            <Route path='/rules' component={RulesPage} exact/>
            <Route path={props.match.path} component={HomePage} exact/>
          </Switch>
        </div>
        <AppFooter/>
      </React.Fragment>
    )
};
