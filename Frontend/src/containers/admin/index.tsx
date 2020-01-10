import React from 'react';
import {Route, Switch, RouteComponentProps} from 'react-router';
import {HomePage} from "./Home";
import AppHeader from "./Header";

interface IPropTypes extends RouteComponentProps {

}

const Admin: React.FC<IPropTypes> = (props: IPropTypes) => {

    return (
        <div>
            <AppHeader/>
            <Switch>
                <Route path={props.match.path} component={HomePage}/>
            </Switch>
        </div>
    )
};

export default Admin
