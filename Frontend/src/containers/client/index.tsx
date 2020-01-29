import React from 'react';
import {Route, Switch, RouteComponentProps} from 'react-router';
import { AppHeader } from './Header';
import {HomePage} from './Home';
import {FinancialReports} from './FinancialReports';
import { RulesPage, RULES_PAGE_LINK } from './Rules';
import { HowToHelpPage, HOW_TO_HELP_PAGE_LINK } from './HowToHelp';
import  { AppFooter }  from './Footer';

interface IPropTypes extends RouteComponentProps {

}

export const Client: React.FC<IPropTypes> = (props: IPropTypes) => {
    return (
      <React.Fragment>
        <AppHeader/>
        <div className="main">
          <Switch>
            <Route path='/financial-reports' component={FinancialReports} exact/>
            <Route path={HOW_TO_HELP_PAGE_LINK} component={HowToHelpPage} exact />
            <Route path={RULES_PAGE_LINK} component={RulesPage} exact/>
            <Route path={props.match.path} component={HomePage} exact/>
          </Switch>
        </div>
        <AppFooter/>
      </React.Fragment>
    )
};
