import React from 'react';
import {Route, Switch, RouteComponentProps} from 'react-router';
import {HomePage} from "./Home";
import { AdminHeader } from "./Header";
import { AdminFooter } from "./Footer";
import { Tabs } from 'antd';
import { FinancialReports } from './FinancialReports';


const { TabPane } = Tabs;

interface IPropTypes extends RouteComponentProps {}
const nextAdminstep=(key:any)=>{
  console.log(key);
}



    // <Switch>t of Tab Pane 1
    //   <Route path={props.match.path} component={HomePage}  exact/>
    //   <Route path={props.match.path} component={HomePage}  exact/>
    // </Switch>

        //   <Tabs defaultActiveKey="1"  tabPosition='left' onChange={()=>{}}>
    //   <TabPane tab="animals" key="1">
    //     <Route path={props.match.path} component={HomePage}  exact/>
    //   </TabPane>
    //   <TabPane tab="reports" key="2">
    //     <Route path={`admin/reports`} component={FinancialReports}  exact/>
    //   </TabPane>
    //   <TabPane tab="Tab 3" key="3">
    //     Content of Tab Pane 3
    //   </TabPane>
    // </Tabs>,
const Admin: React.FC<IPropTypes> = (props: IPropTypes) => {
  console.log('==>',props.match.path);
  return(
    <React.Fragment>
      <AdminHeader />
      <Switch>
        <Route path={props.match.path} component={HomePage}  exact/>
        <Route path={`${props.match.path}/reports`} component={FinancialReports}  exact/>
      </Switch>
      <AdminFooter />
    </React.Fragment>
  )
}

export default Admin
