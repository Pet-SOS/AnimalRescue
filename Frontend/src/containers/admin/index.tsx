import React from 'react';
import {Route, Switch, RouteComponentProps} from 'react-router';
import {HomePage} from "./Home";

import { Tabs } from 'antd';
import { FinancialReports } from './FinancialReports';
import { Login } from './Login';


const { TabPane } = Tabs;

interface IPropTypes extends RouteComponentProps {}


const Admin: React.FC<IPropTypes> = (props: IPropTypes) => {
  console.log('==>',props.match.path);
  return(
    <React.Fragment>
      <Switch>
      <Route path={props.match.path} component={Login} exact/>
        <Tabs defaultActiveKey="1"  tabPosition='left' onChange={()=>{}}>
        <TabPane>
          <div>Logo</div>
          <div>Logo</div>
          <div>Logo</div>
          <div>Logo</div>
        </TabPane> 
          <TabPane tab="animals" key="1">
            <Route path={`${props.match.path}/animals`} component={HomePage} exact/>
          </TabPane>
          <TabPane tab="reports" key="2">
            <Route path={`${props.match.path}/reports`} component={FinancialReports} exact/>
          </TabPane>
          <TabPane tab="Tab 3" key="3">
            Content of Tab Pane 3
          </TabPane>
      </Tabs>
      </Switch>
    </React.Fragment>
  )
}

export default Admin
