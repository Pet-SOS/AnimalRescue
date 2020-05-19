import React from 'react';
import {RouteComponentProps} from 'react-router';
import {HomePage} from "./Home";
import {FinancialReports} from './FinancialReports';
import {Login} from './Login';
import {AdminHomePage} from './AdminHomePage';
import {GuardedRoute, GuardProvider} from 'react-router-guards';
import {Router} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import {guardLogin} from './guards/guardLogin';
import {CommonInfo} from './CommonInfo';
import {AnimalsList} from './AnimalsList';
import {AnimalAdminCard} from './AnimalEditCard';
import LocationContainer from "./Locations/ui/LocationsContainer";
import {AdminTagsRouter} from "./Tags/TagRouter";


const history = createBrowserHistory();

interface IPropTypes extends RouteComponentProps {
    history: any
}

// To Do:
// domain /account/signIn                     = done!
// domain /account/singUp
// domain /account/forgot-password
// domain /account/reset-password
// account/unlock-account


const Admin: React.FC<IPropTypes> = (props: IPropTypes) => {
    history.location.state = props.match.path;
    return (
        <Router history={history}>
            <GuardProvider>
                <GuardedRoute path={`${props.match.path}/signIn`} exact component={Login}/>
                <GuardProvider guards={[guardLogin]}>
                    <GuardedRoute path={`${props.match.path}`} component={AdminHomePage} exact/>
                    <GuardedRoute path={`${props.match.path}/animals`} component={HomePage} exact/>
                    <GuardedRoute path={`${props.match.path}/tags`}><AdminTagsRouter/></GuardedRoute>
                    <GuardedRoute path={`${props.match.path}/animals-list/page/:page`} component={AnimalsList} exact/>
                    <GuardedRoute path={`${props.match.path}/animals-list/animal`} component={AnimalAdminCard} exact/>
                    <GuardedRoute path={`${props.match.path}/animals-list/:id`} component={AnimalAdminCard} exact/>
                    <GuardedRoute path={`${props.match.path}/reports`} component={FinancialReports} exact/>
                    <GuardedRoute path={`${props.match.path}/common`} component={CommonInfo} exact/>
                    <GuardedRoute path={`${props.match.path}/locations`} component={LocationContainer} exact/>
                </GuardProvider>
            </GuardProvider>
        </Router>
    )
};
export default Admin
