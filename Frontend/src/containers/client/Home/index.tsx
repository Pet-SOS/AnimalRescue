import React from 'react';
import {RouteComponentProps} from "react-router";
import {Link} from "react-router-dom";
import {TI18n} from '../../../i18n';
import AppHeader from "../Header";

interface IPropTypes extends RouteComponentProps<any> {

}

const Home: React.FC<IPropTypes> = (props: IPropTypes) => {

    return (
        <>
            <AppHeader/>
            <Link to="/admin"><TI18n keyStr="admin" default="Admin"/></Link>
        </>
    )
};

export default Home;
