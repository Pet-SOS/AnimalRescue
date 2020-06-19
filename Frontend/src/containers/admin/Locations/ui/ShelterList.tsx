import React from "react";
import {LocationListContainer} from "./lists/LocationList";
import {ILocation, LocationsCode} from "../../../../api/admin";
import LocationListCell from "./lists/LocationListCell";

export class ShelterList extends React.PureComponent {
    private CLASS_NAME = 'shelter';
    private TYPE = LocationsCode.SHELTER;

    renderHeader = () => {
        return (
            <>
                <div className="col col-title">Назва</div>
                <div className="col col-address">Адреса</div>
                <div className="col">&nbsp;</div>
                <div className="col">&nbsp;</div>
            </>
        );
    };

    renderListItem = (key: string, location: ILocation) => {
        return (
            <LocationListCell
                className={this.CLASS_NAME}
                key={key}
                type={this.TYPE}
                location={location}>
                <div className="col col-title">{location.title}</div>
                <div className="col col-address">{location.address}</div>
            </LocationListCell>
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
