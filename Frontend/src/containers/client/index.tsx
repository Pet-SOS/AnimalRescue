import React from 'react';
import {Route, Switch, RouteComponentProps} from 'react-router';
import AppHeader from './Header';
import {AppFooter} from './Footer';
import {HomePage} from './Home';

interface IPropTypes extends RouteComponentProps {

}

export const Client: React.FC<IPropTypes> = (props: IPropTypes) => {
    return (
      <>
        <AppHeader/>
        <div className="main">
          <Switch>
            <Route path={props.match.path} component={HomePage} />
          </Switch>
        </div>
        <AppFooter/>
      </>
    )
};
