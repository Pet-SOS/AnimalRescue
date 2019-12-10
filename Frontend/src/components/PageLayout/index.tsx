import React from 'react';
import './pageLayout.scss'

interface IPropTypes {
    children: React.ReactNode
}

const PageLayout: React.FC<IPropTypes> = (props: IPropTypes) => {
    return(
        <div className="page-layout">
            {props.children}
        </div>
    )
};
export {PageLayout}