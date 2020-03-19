import'./index.scss';


import { Menu, Button } from 'antd';
import {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
} from '@ant-design/icons';
import React from 'react';
import { NavLink } from 'react-router-dom';

interface IPropTypes{
    selectedKey:string;
    openKeys:string
}
interface IState{
    collapsed: boolean;
}
const { SubMenu } = Menu;

export class AdminMenu extends React.Component <IPropTypes, IState>{
    constructor(props:IPropTypes){
        super(props);
        this.state ={
            collapsed: false,
        }
    }   


  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <div style={{ width: 256 }}>
        <Button type="primary" onClick={this.toggleCollapsed} style={{ marginBottom: 16 }}>
          {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
        </Button>
        <Menu
        selectedKeys={[this.props.selectedKey]}
        openKeys={[this.props.openKeys]}
          mode="inline"
          theme="light"
          inlineCollapsed={this.state.collapsed}
        >
        <SubMenu
            key="sub-1"
            title={
            <span>
                <MailOutlined />
                <span>Сайт</span>
            </span>
            }>
            <Menu.Item key="admin">
                <NavLink to={`/admin`}>Admin</NavLink>
            </Menu.Item>
            <Menu.Item key="reports" >
                <NavLink to={`/admin/reports`}>Фінансові звіти</NavLink>
            </Menu.Item>
            <Menu.Item key="animals">
                <NavLink to={`/admin/animals`}>Тварини</NavLink>
            </Menu.Item>
        </SubMenu>
          <SubMenu
            key="sub-2"
            title={
              <span>
                <MailOutlined />
                <span>Navigation One</span>
              </span>
            }>
            <Menu.Item key="5">Option 5</Menu.Item>
            <Menu.Item key="6">Option 6</Menu.Item>
            <Menu.Item key="7">Option 7</Menu.Item>
            <Menu.Item key="8">Option 8</Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub-3"
            title={
              <span>
                <AppstoreOutlined />
                <span>Navigation Two</span>
              </span>
            }>
            <Menu.Item key="9">Option 9</Menu.Item>
            <Menu.Item key="10">Option 10</Menu.Item>
            <SubMenu key="sub4" title="Submenu">
              <Menu.Item key="11">Option 11</Menu.Item>
              <Menu.Item key="12">Option 12</Menu.Item>
            </SubMenu>
          </SubMenu>
        </Menu>
      </div>
    );
  }
}

