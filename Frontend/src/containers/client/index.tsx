import React from 'react';
import {Route, Switch, RouteComponentProps} from 'react-router';
import AppHeader from "./Header";
import Home from './Home';

interface IPropTypes extends RouteComponentProps {

}

const Client: React.FC<IPropTypes> = (props: IPropTypes) => {

    return (
        <Switch>
            <Route path={props.match.path} component={Home}/>
        </Switch>
    )
};

export default Client