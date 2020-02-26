import React from 'react';
import {Route, Switch, RouteComponentProps} from 'react-router';
import { AppHeader } from './Header';
import {HomePage} from './Home';
import {FinancialReports} from './FinancialReports';
import { RulesPage, RULES_PAGE_LINK } from './Rules';
import { HowToHelpPage, HELP_PAGE_LINKS } from './HowToHelp';
import { AppFooter }  from './Footer';
import { Contacts } from './ContactsPage';
import { AboutPage } from './About';
import { Blog } from './Blog';
import { BlogItemPage } from './Blog/BlogItemPage';
import { LookingForAFriend } from './LookingForAFriend';
import { AnimalItemPage } from './Animals/AnimalItemPage';
import { NotFound } from '../../components/NotFound';

interface IPropTypes extends RouteComponentProps {}

export const Client: React.FC<IPropTypes> = (props: IPropTypes) => {
    return (
      <React.Fragment>
        <AppHeader/>
        <div className="main">
          <Switch>
            <Route path='/about' component={AboutPage} exact />
            <Route path={`/about${RULES_PAGE_LINK}`} component={RulesPage} exact />
            <Route path='/about/financial-reports' component={FinancialReports} exact />
            <Route path={HELP_PAGE_LINKS.default} component={HowToHelpPage} exact />
            <Route path='/contacts' component={Contacts} exact />
            <Route path='/blog/:blogId' component={BlogItemPage} exact />
            <Route path='/blog/page/:page' component={Blog} exact/>
            <Route path='/animals/page/:page' component={LookingForAFriend} exact/>
            <Route path='/animals/:animalId' component={AnimalItemPage} exact />
            <Route path={props.match.path} component={HomePage} exact />
            <Route component={NotFound}></Route>
          </Switch>
        </div>
        <AppFooter/>
      </React.Fragment>
    )
};
