import React from "react";


interface ILocationCellProps {
    className: string;
    children?: any;
}

export class LocationListCell extends React.PureComponent<ILocationCellProps> {

    onDeleteClick = () => {

    };

    onEditClick = () => {

    };

    render() {
        const {children, className} = this.props;
        return (
            <div className={`location-item ${className || ''}`}>
                {children && children}
                <div className="col col-btn"><i onClick={this.onEditClick} className="icon-edit">Edit</i></div>
                <div className="col col-btn"><i onClick={this.onDeleteClick} className="icon-delete">Delete</i></div>
            </div>
        );
    }

}
