import React from 'react';
import {Route, Switch, RouteComponentProps} from 'react-router';
import {HomePage} from "./Home";

import { Tabs } from 'antd';
import { FinancialReports } from './FinancialReports';
import { Login } from './Login';
import { AdminHomePage } from './AdminHomePage';


const { TabPane } = Tabs;

interface IPropTypes extends RouteComponentProps {}

// domain /account/signIn
// domain /account/singUp
// domain /account/forgot-password
// domain /account/reset-password
// account/unlock-account
const Admin: React.FC<IPropTypes> = (props: IPropTypes) => {
  console.log('==>',props.match.path);
  return  (
    <React.Fragment>
      <Switch>
      <Route path={`${props.match.path}/signIn`} component={Login} exact/>
        <Tabs defaultActiveKey="1"  tabPosition='left' onChange={()=>{}}>
            <TabPane  tab="admin" key="1">
              <Route path={`${props.match.path}`} component={AdminHomePage} exact/>
            </TabPane> 
            <TabPane tab="animals" key="2">
              <Route path={`${props.match.path}/animals`} component={HomePage} exact/>
            </TabPane>
            <TabPane tab="reports" key="3">
              <Route path={`${props.match.path}/reports`} component={FinancialReports} exact/>
            </TabPane>
            <TabPane tab="Tab 3" key="4">
              Content of Tab Pane 3
            </TabPane>
      </Tabs>
      </Switch>
    </React.Fragment>
  )
}

export default Admin
