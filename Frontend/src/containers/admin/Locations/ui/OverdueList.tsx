import React from "react";
import {LocationListContainer} from "./lists/LocationList";
import {ILocation, LocationsCode} from "../../../../api/admin";
import LocationListCell from "./lists/LocationListCell";

export class OverdueList extends React.PureComponent {

    private CLASS_NAME = 'overdue';
    private TYPE = LocationsCode.OVEREXPOSURE;

    renderHeader = () => {
        return (
            <>
                <div className="col col-contact">Контакт</div>
                <div className="col col-phone">Телефон</div>
                <div className="col col-address">Адреса</div>
                <div className="col col-price">Ціна</div>
                <div className="col">&nbsp;</div>
                <div className="col">&nbsp;</div>
            </>
        );
    };

    renderListItem = (key: string, location: ILocation) => {
        const {title, address, phoneNumber, price} = location;
        return (
            <LocationListCell
                className={this.CLASS_NAME}
                key={key}
                type={this.TYPE}
                location={location}>
                <div className="col col-contact">{title}</div>
                <div className="col col-phone">{phoneNumber}</div>
                <div className="col col-address">{address}</div>
                <div className="col col-price">{price}</div>
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
