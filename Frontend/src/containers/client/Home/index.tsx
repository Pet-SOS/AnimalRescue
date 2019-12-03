import React from 'react';
import {RouteComponentProps} from "react-router";
import {Link} from "react-router-dom";

interface IPropTypes extends RouteComponentProps<any>{

}

const Home: React.FC<IPropTypes> = (props: IPropTypes) => {

    return (
        <div>
            Home
            <Link to="/admin">Admin</Link>
        </div>
    )
};

export default Home;