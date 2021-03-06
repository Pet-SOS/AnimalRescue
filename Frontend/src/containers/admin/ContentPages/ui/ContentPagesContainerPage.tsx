import React from 'react';
import { AdminMenu } from '../../AdminMenu';

interface IBlogContainerPage {
  children?: any;
}

export const ContentPagesContainerPage: React.FC<IBlogContainerPage> = ({
  children,
}) => {
  return (
    <div className="boxAdmin">
      <AdminMenu selectedKey={'contentPages'} openKeys={['sub1']} />
      <main>
        <div className="container">
          <section>{children}</section>
        </div>
      </main>
    </div>
  );
};
