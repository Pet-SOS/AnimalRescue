import React from "react";
import {AdminMenu} from "../../AdminMenu";

interface IBlogContainerPage {
    children?: any;
}

export const BlogContainerPage: React.FC<IBlogContainerPage> = ({children}) => {
    return (
        <div className='boxAdmin'>
            <AdminMenu selectedKey={'blog'} openKeys={['sub1','sub2']}/>
            <main>
                <div className="container">
                    <section>
                        {children}
                    </section>
                </div>
            </main>
        </div>
    );
};
