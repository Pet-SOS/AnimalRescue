import React from "react";
import { getJwt } from "../helpers/jwt";

interface IPropTypes{
    history:any
}

interface IState {
    [key:string]:any
}
export class AdminHomePage extends React.Component <IPropTypes, IState>{
    constructor(props:IPropTypes){
        super(props);
        this.state ={}
    }

    componentDidMount(){
        console.log(this.props.history)
        const jwt: string|null = getJwt();
        if(!jwt){
            this.props.history.push(`${this.props.history.location.pathname}/signIn`);
        }
    }

    render(){
        return(
            <React.Fragment>
                <div>Main page for login user</div>
            </React.Fragment>
        )
    }
}