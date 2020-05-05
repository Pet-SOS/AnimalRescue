import React from "react";
import {LocationList} from "./LocationList";

export class ClinicList extends React.PureComponent {

    renderHeader = () => {
        return (
            <>
                <div className="col col-title">Назва</div>
                <div className="col col-address">Адреса</div>
            </>
        );
    };


    render() {
        return (
            <LocationList
                className="clinic"
                renderHeader={this.renderHeader}
            />
        )
    }
}
