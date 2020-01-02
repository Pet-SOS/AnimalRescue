import React, {useState} from 'react';
import {Route, Switch} from 'react-router';
import Client from "./containers/client";
import Admin from "./containers/admin";

interface IPropTypes {

}

const App: React.FC<IPropTypes> = () => {

    return (
        <div className="app">
            <Switch>
                <Route exact={false} path="/admin" component={Admin}/>
                <Route exact={false} path="/" component={Client}/>
            </Switch>
        </div>
    );
};

export default App;
