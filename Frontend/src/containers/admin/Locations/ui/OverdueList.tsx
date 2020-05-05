import React from "react";
import {LocationList} from "./LocationList";

export class OverdueList extends React.PureComponent {

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


    render() {
        return (
            <LocationList
                className="overdue"
                renderHeader={this.renderHeader}
            />
        )
    }
}
