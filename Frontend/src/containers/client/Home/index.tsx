import React from 'react';
import {RouteComponentProps} from "react-router";
import {Link} from "react-router-dom";
import {TI18n} from '../../../i18n';

interface IPropTypes extends RouteComponentProps<any>{

}

const Home: React.FC<IPropTypes> = (props: IPropTypes) => {

    return (
        <div>
            Home
            <Link to="/admin"><TI18n keyStr="admin" default="Admin"/></Link>
        </div>
    )
};

export default Home;