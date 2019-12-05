import React from 'react';
import {Route, Switch, RouteComponentProps} from 'react-router';
import AdminHome from "./Home";

interface IPropTypes extends RouteComponentProps{

}

const Client: React.FC<IPropTypes> = (props: IPropTypes) => {

    return (
        <div>
            <Switch>
                <Route path={props.match.path} component={AdminHome}/>
            </Switch>
        </div>
    )
};

export default Client