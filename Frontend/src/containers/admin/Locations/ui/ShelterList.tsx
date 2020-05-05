import React from "react";
import {LocationList} from "./LocationList";

export class ShelterList extends React.PureComponent {

    renderHeader = () => {
        return (
            <>
                <div className="col col-contact">Контакт</div>
                <div className="col col-phone">Телефон</div>
                <div className="col col-address">Адреса</div>
            </>
        );
    };


    render() {
        return (
            <LocationList
                className="shelter"
                renderHeader={this.renderHeader}
            />
        )
    }
}
