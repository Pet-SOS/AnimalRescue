import { AdminMenu, IPropTypes } from './index';
import React from 'react';

export interface IWrapperPropsType extends IPropTypes {
  children?: any;
}

export class AdminMenuWrapper extends React.PureComponent<IWrapperPropsType> {
  render() {
    return (
      <div className="boxAdmin">
        <AdminMenu {...this.props} />
        <main>
          <div className="container">{this.props.children}</div>
        </main>
      </div>
    );
  }
}
