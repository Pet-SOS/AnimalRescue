import React from "react";
import { IDataSignIn, IResponceSignIn } from "../../../../api/login";
import { getJwt } from "../../helpers/jwt";

interface IPropTypes {
    fetchLoginRequest: (body: IDataSignIn) => {}
    history: any;
    location:any;
    accountSignIn: IResponceSignIn;
}

interface IState  {
    email: string; //admin@animalrescue.com
    password: string; //TestPassword123#
    rememberMe: boolean;
}

export class LoginComponent extends React.Component <IPropTypes, IState>{
    constructor(props:any) {
      super(props);
      this.state = {
        email: '',
        password: '',
        rememberMe:true
      };
    }

    componentDidMount(){
    }
    handleSubmit(e: any) {
        e.preventDefault();
        this.props.fetchLoginRequest(this.state);
        const jwt = getJwt();
       
        if(!!jwt){
            console.log('jwt', !!jwt);
            console.log( this.props)
            this.props.history.push(`${this.props.location.state}`)
        }
    }

    handleChangeInField(e:any, key:string) {
        e.preventDefault();
        this.setState({
            ...this.state,
            [key]: e.target.value
        })
    }
    render(){
        return(
            <React.Fragment>
                <form onSubmit={(e)=>this.handleSubmit(e)}>
                    <label><div>Username</div>
                        <input onChange={(e)=>this.handleChangeInField(e, 'email')} type="text" placeholder="" name="uname" required/>
                    </label>
                    <label><div>Password</div>
                        <input onChange={(e)=>this.handleChangeInField(e, 'password')}  type="password" placeholder="" name="psw" required/>
                    </label>
                    <button type="submit" onSubmit={(e)=>this.handleSubmit(e)}>Login</button>
                </form>
            </React.Fragment>
        )
    }
}