import React from "react";
import {LocationListContainer} from "./LocationList";
import {ILocation, LocationsCode} from "../../../../api/admin";

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
            </>
        );
    };


    renderListItem = (key: string, location: ILocation) => {
        const {title, address, phoneNumber, price} = location;
        return (
            <div key={key} className={`location-item ${this.CLASS_NAME}`}>
                <div className="col col-contact">{title}</div>
                <div className="col col-phone">{phoneNumber}</div>
                <div className="col col-address">{address}</div>
                <div className="col col-price">{price}</div>
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
