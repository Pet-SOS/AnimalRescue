import React from "react";
import { IDataSignIn } from "../../../../api/login";

interface IPropTypes {
    fetchLoginRequest: (body: IDataSignIn) => {}
}

interface IState  {
    email: string; //admin@animalrescue.com
    phoneNumber?: string;
    password: string; //TestPassword123#
    rememberMe?: boolean;
}

export class LoginComponent extends React.Component <IPropTypes, IState>{
    constructor(props:any) {
      super(props);
      this.state = {
        email: '',
        password: '',
        phoneNumber: '',
        rememberMe:true
      };
    }

    componentDidMount(){
    }
    handleSubmit(e: any) {
        e.preventDefault();
        // TODO: do something with -> this.state.file
        console.log('handle uploading-', this.state);
        this.props.fetchLoginRequest(this.state)
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