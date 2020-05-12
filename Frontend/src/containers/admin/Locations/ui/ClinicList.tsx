import React from "react";
import {LocationListContainer} from "./LocationList";
import {ILocation, LocationsCode} from "../../../../api/admin";
import {LocationListCell} from "./LocationListCell";

export class ClinicList extends React.PureComponent {

    private CLASS_NAME = 'clinic';
    private TYPE = LocationsCode.CLINIC;


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
            <LocationListCell key={key} className={this.CLASS_NAME}>
                <div className="col col-contact">{title}</div>
                <div className="col col-phone">{phoneNumber}</div>
                <div className="col col-address">{address}</div>
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
