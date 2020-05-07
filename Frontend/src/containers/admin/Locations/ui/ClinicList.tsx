import React from "react";
import {LocationListContainer} from "./LocationList";
import {ILocation, LocationsCode} from "../../../../api/admin";

export class ClinicList extends React.PureComponent {

    private CLASS_NAME= 'clinic';
    private TYPE = LocationsCode.CLINIC;


    renderHeader = () => {
        return (
            <>
                <div className="col col-title">Назва</div>
                <div className="col col-address">Адреса</div>
            </>
        );
    };

    renderListItem = (key: string, location: ILocation) => {
        return (
            <div key={key} className={`location-item ${this.CLASS_NAME}`}>
                <div className="col col-title">${location.title}</div>
                <div className="col col-address">{location.address}</div>
            </div>
        )
    };

    render() {
        return (
            <LocationListContainer
                type={this.TYPE}
                className={this.CLASS_NAME}
                renderHeader={this.renderHeader}
                renderItem={this.renderListItem}
            />
        )
    }
}
