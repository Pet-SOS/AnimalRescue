import'./index.scss';


import { Menu } from 'antd';
import {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  MailOutlined,
} from '@ant-design/icons';
import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import { Button, ButtonTypes} from "../../../components/Button";
import {TI18n} from "../../../i18n";
import {ReactComponent as Logo} from "../../../assets/header/logo.svg";

interface IPropTypes{
    selectedKey:string;
    openKeys:string
}
interface IState{
    collapsed: boolean;
    selectedKey:string;
    openKeys?:string;

}
const { SubMenu } = Menu;

export class AdminMenu extends React.Component <IPropTypes, IState>{
    constructor(props:IPropTypes){
        super(props);
        this.state ={
            collapsed: false,
            selectedKey: this.props.selectedKey,
            // openKeys: this.props.openKeys
        }
    }


  toggleCollapsed = () => {
    console.log()
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  handleClick=(e:any)=> {
    console.log(e);
  }
  render() {
    let {selectedKey, openKeys} = this.state;
    return (
      <aside>
          <div className="logo-main">
              <Link className="logo" to="/"><Logo/></Link>
              <div className="logo-text">
                  <span>Порятунок тварин Харків</span>
              </div>
          </div>
          <div className="wrap-btn">
              <Button styleType={ButtonTypes.Blue}>
                  <span>Нова заявка</span><i className="icon-close">icon</i>
              </Button>
          </div>

        {/*<Button type="primary" onClick={this.toggleCollapsed} style={{ marginBottom: 16 }}>*/}
        {/*  {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}*/}
        {/*</Button>*/}
        <nav>
            <Menu
                onClick={this.handleClick}
                selectedKeys={[selectedKey]}
                mode="inline"
                theme="light"
                inlineCollapsed={this.state.collapsed}
                className="main-admin-nav"
            >
                <Menu.Item key="animals"><NavLink to={`/admin/animals`}><i className="icon-step-1">icon</i>Тварини</NavLink></Menu.Item>
                <Menu.Item><NavLink to={`/admin/animals`}><i className="icon-tag">icon</i>Теги</NavLink></Menu.Item>
                <SubMenu
                    key="sub1"
                    title={
                        <span>
                        <i className="icon-website">icon</i>
                        <span>Сайт</span>
                    </span>
                    }>
                    <Menu.Item key="common"><NavLink to={`/admin/common`}>Загальні налаштування</NavLink></Menu.Item>
                    <Menu.Item><NavLink to={`/admin`}>Контентні сторінки</NavLink></Menu.Item>
                    <Menu.Item key="reports"><NavLink to={`/admin/reports`}>Фінансові звіти</NavLink></Menu.Item>
                    <Menu.Item key="blog" ><NavLink to={`/admin/blog`}>Блог</NavLink></Menu.Item>
                </SubMenu>
                <SubMenu className="etc-sub-menu"
                    key="sub2"
                    title={
                        <span>
                        <i className="icon-more">icon</i>
                        <span>Інше</span>
                    </span>
                    }>
                    <Menu.Item disabled><NavLink to={`/admin`}><i className="icon-request">icon</i>Заявки</NavLink></Menu.Item>
                    <Menu.Item disabled><NavLink to={`/admin`}><i className="icon-people">icon</i>Працівники</NavLink></Menu.Item>
                    <Menu.Item disabled><NavLink to={`/admin`}><i className="icon-date">icon</i>Графік чергувань</NavLink></Menu.Item>
                    <Menu.Item disabled><NavLink to={`/admin`}><i className="icon-location">icon</i>Перетримки</NavLink></Menu.Item>
                    <Menu.Item><NavLink to={`/admin`}><i className="icon-person">icon</i>Профіль</NavLink></Menu.Item>
                </SubMenu>
                {/*<SubMenu*/}
                {/*    key="sub2"*/}
                {/*    title={"Navigation One"}>*/}

                {/*    <Menu.Item key="admin">*/}
                {/*        <NavLink to={`/admin`}>Admin</NavLink>*/}
                {/*    </Menu.Item>*/}
                {/*    <Menu.Item disabled key="5">Option 5</Menu.Item>*/}
                {/*    <Menu.Item disabled key="6">Option 6</Menu.Item>*/}
                {/*    <Menu.Item key="7">Option 7</Menu.Item>*/}
                {/*    <Menu.Item key="8">Option 8</Menu.Item>*/}
                {/*</SubMenu>*/}
                {/*<SubMenu*/}
                {/*  key="sub3"*/}
                {/*  title={*/}
                {/*    <span>*/}
                {/*      <AppstoreOutlined />*/}
                {/*      <span>Navigation Two</span>*/}
                {/*    </span>*/}
                {/*  }>*/}
                {/*  <Menu.Item key="9">Option 9</Menu.Item>*/}
                {/*  <Menu.Item key="10">Option 10</Menu.Item>*/}
                {/*  <SubMenu key="sub4" title="Submenu">*/}
                {/*    <Menu.Item key="11">Option 11</Menu.Item>*/}
                {/*    <Menu.Item key="12">Option 12</Menu.Item>*/}
                {/*  </SubMenu>*/}
                {/*</SubMenu>*/}
            </Menu>
        </nav>
      </aside>
    );
  }
}

