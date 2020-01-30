import React from 'react';
import {Route, Switch, RouteComponentProps} from 'react-router';
import { AppHeader } from './Header';
import {HomePage} from './Home';
import {FinancialReports} from './FinancialReports';
import { RulesPage, RULES_PAGE_LINK } from './Rules';
import { HowToHelpPage, HOW_TO_HELP_PAGE_LINK } from './HowToHelp';
import  { AppFooter }  from './Footer';
import { Contacts } from './ContactsPage';
import { AboutPage } from './About';
import { HelpTypes } from './HowToHelp/Component';

interface IPropTypes extends RouteComponentProps {}

export const Client: React.FC<IPropTypes> = (props: IPropTypes) => {
    return (
      <React.Fragment>
        <AppHeader/>
        <div className="main">
          <Switch>
            <Route path='/about/financial-reports' component={FinancialReports} exact/>
            <Route path={HOW_TO_HELP_PAGE_LINK} component={HowToHelpPage} exact />
            <Route path={`${HOW_TO_HELP_PAGE_LINK}/${HelpTypes.FINANCE}`} component={HowToHelpPage} exact />
            <Route path={`${HOW_TO_HELP_PAGE_LINK}/${HelpTypes.STUFF}`} component={HowToHelpPage} exact />
            <Route path={`${HOW_TO_HELP_PAGE_LINK}/${HelpTypes.VOLUNTEERING}`} component={HowToHelpPage} exact />
            <Route path='/about' component={AboutPage} exact/>
            <Route path='/about/help' component={AboutPage} exact/>
            <Route path={`/about${RULES_PAGE_LINK}`} component={RulesPage} exact/>
            <Route path={props.match.path} component={HomePage} exact/>
            <Route path='/contacts' component={Contacts} exact/>
          </Switch>
        </div>
        <AppFooter/>
      </React.Fragment>
    )
};
