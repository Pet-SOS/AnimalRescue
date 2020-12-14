import './index.scss';
import React from 'react';
import { Menu } from 'antd';
import { Link, NavLink } from 'react-router-dom';
import { Button, ButtonTypes } from '../../../components/Button';
import { ReactComponent as Logo } from '../../../assets/header/logo.svg';
export * from './AdminMenuWrapper';

export interface IPropTypes {
  selectedKey: string;
  openKeys: string[];
}
interface IState {
  collapsed: boolean;
  selectedKey: string;
  openKeys: string[];
}
const { SubMenu } = Menu;

export class AdminMenu extends React.Component<IPropTypes, IState> {
  rootSubmenuKeys = ['sub1', 'sub2'];
  constructor(props: IPropTypes) {
    super(props);
    this.state = {
      collapsed: false,
      selectedKey: this.props.selectedKey,
      openKeys: [...this.props.openKeys, 'sub2'],
    };
  }

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  handleClick = (e: Event) => {
    console.log(e);
  };

  onOpenChange = (openKeys: any) => {
    const latestOpenKey = openKeys.find(
      (key: string) => this.state.openKeys.indexOf(key) === -1,
    );
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  };

  render() {
    let { selectedKey, openKeys } = this.state;

    return (
      <aside>
        <div className="logo-main">
          <Link className="logo" to="/">
            <Logo />
          </Link>
          <div className="logo-text">
            <span>Порятунок тварин Харків</span>
          </div>
        </div>
        <div className="wrap-btn">
          <Button
            styleType={ButtonTypes.BlueSmall}
            onClick={e => this.handleClick}
          >
            <span>Нова заявка</span>
            <i className="icon-close">icon</i>
          </Button>
        </div>
        <nav>
          <Menu
            selectedKeys={[selectedKey]}
            openKeys={openKeys}
            onOpenChange={this.onOpenChange}
            mode="inline"
            theme="light"
            inlineCollapsed={this.state.collapsed}
            className="main-admin-nav"
          >
            <Menu.Item key="animals-list">
              <NavLink to={`/admin/animals-list/page/1`}>
                <i className="icon-step-1">icon</i>Тварини
              </NavLink>
            </Menu.Item>
            <Menu.Item key="tags">
              <NavLink to={`/admin/tags`}>
                <i className="icon-tag">icon</i>Теги
              </NavLink>
            </Menu.Item>
            <SubMenu
              key="sub1"
              title={
                <span>
                  <i className="icon-website">icon</i>
                  <span>Сайт</span>
                </span>
              }
            >
              <Menu.Item key="common">
                <NavLink to={`/admin/common`}>Загальні налаштування</NavLink>
              </Menu.Item>
              <Menu.Item>
                <NavLink to={`/admin`}>Контентні сторінки</NavLink>
              </Menu.Item>
              <Menu.Item key="reports">
                <NavLink to={`/admin/reports`}>Фінансові звіти</NavLink>
              </Menu.Item>
              <Menu.Item key="blog">
                <NavLink to={`/admin/blog`}>Блог</NavLink>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              className="etc-sub-menu"
              key="sub2"
              title={
                <span>
                  <i className="icon-more">icon</i>
                  <span>Інше</span>
                </span>
              }
            >
              <Menu.Item disabled>
                <NavLink to={`/admin/`}>
                  <i className="icon-request">icon</i>Заявки
                </NavLink>
              </Menu.Item>
              <Menu.Item disabled>
                <NavLink to={`/admin`}>
                  <i className="icon-people">icon</i>Працівники
                </NavLink>
              </Menu.Item>
              <Menu.Item disabled>
                <NavLink to={`/admin`}>
                  <i className="icon-date">icon</i>Графік чергувань
                </NavLink>
              </Menu.Item>
              <Menu.Item key="locations">
                <NavLink to={`/admin/locations`}>
                  <i className="icon-location">icon</i>Локація
                </NavLink>
              </Menu.Item>
              <Menu.Item>
                <NavLink to={`/admin`}>
                  <i className="icon-person">icon</i>Профіль
                </NavLink>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </nav>
      </aside>
    );
  }
}
