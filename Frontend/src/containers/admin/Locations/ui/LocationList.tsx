import React from "react";
import {Button, ButtonTypes} from "../../../../components/Button";


interface ILocationListProps {
    className?: string;
    renderHeader: () => any;

}

export class LocationList extends React.PureComponent<ILocationListProps> {

    handleAddAnimalClick = () => {
        window.console.log("Add location clicked")
    };

    render() {
        return (
            <div>
                <div className="locations-header">
                    <Button
                        className="add-location-btn"
                        onClick={this.handleAddAnimalClick}
                        styleType={ButtonTypes.BlueOutlineSmall}>
                        Додати нову локацію
                    </Button>
                </div>
                <section className='section-table location-table'>
                    <header>
                        <div className={`row ${this.props.className}`}>
                            {this.props.renderHeader()}
                        </div>
                    </header>
                </section>
            </div>
        );
    }
}
