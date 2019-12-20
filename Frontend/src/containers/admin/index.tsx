import React from 'react';
import {Route, Switch, RouteComponentProps} from 'react-router';
import {AdminHome} from "./Home";
import AppHeader from "./Header";

interface IPropTypes extends RouteComponentProps {

}

const Admin: React.FC<IPropTypes> = (props: IPropTypes) => {

    return (
        <div>
            <AppHeader/>
            <Switch>
                <Route path={props.match.path} component={AdminHome}/>
            </Switch>
        </div>
    )
};

export default Admin
