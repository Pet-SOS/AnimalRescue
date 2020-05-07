import React from "react";
import {LocationListContainer} from "./LocationList";
import {ILocation, LocationsCode} from "../../../../api/admin";

export class ShelterList extends React.PureComponent {
    private CLASS_NAME = 'shelter';
    private TYPE = LocationsCode.SHELTER;


    renderHeader = () => {
        return (
            <>
                <div className="col col-contact">Контакт</div>
                <div className="col col-phone">Телефон</div>
                <div className="col col-address">Адреса</div>
            </>
        );
    };

    renderListItem = (key: string, location: ILocation) => {
        const {title, address, phoneNumber} = location;
        return (
            <div key={key} className={`location-item ${this.CLASS_NAME}`}>
                <div className="col col-contact">{title}</div>
                <div className="col col-phone">{phoneNumber}</div>
                <div className="col col-address">{address}</div>
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
