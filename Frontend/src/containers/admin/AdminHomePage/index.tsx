import React from "react";
import { AdminMenu } from "../AdminMenu";

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

    }

    render(){
        return(
        <div className='boxAdmin'>
            <AdminMenu
                selectedKey={'admin'}
                openKeys={['sub2', 'sub1']}
            />
            <main>
                <div className="container">
                    <h2>ADMIN HOME PAGE</h2>
                </div>
            </main>
        </div>
        )
    }
}