import React from 'react';
import {Route, Switch, RouteComponentProps} from 'react-router';
import AppHeader from './Header';
import {AppFooter} from './Footer';
import {HomePage} from './Home';
import {FinancialReports} from './FinancialReports';
import { RulesPage } from './Rules';
import { Contacts } from './ContactsPage';
import { AboutPage } from './About';

interface IPropTypes extends RouteComponentProps {

}

export const Client: React.FC<IPropTypes> = (props: IPropTypes) => {
    return (
      <React.Fragment>
        <AppHeader/>
        <div className="main">
          <Switch>
            <Route path='/financial-reports' component={FinancialReports} exact/>
            <Route path='/about' component={AboutPage} exact/>
            <Route path='/rules' component={RulesPage} exact/>
            <Route path={props.match.path} component={HomePage} exact/>
            <Route path='/contacts' component={Contacts} exact/>
          </Switch>
        </div>
        <AppFooter/>
      </React.Fragment>
    )
};
