import React from "react";
import {Button, ButtonTypes} from "../../../../components/Button";
import {ICustomAppState} from "../../../../store/state";
import {connect} from "react-redux";
import {bindActionCreators, Dispatch} from "redux";
import {actionAdminFetchLocationsRequest} from "../store/actions";
import {ILocation, ILocationsResponse, LocationsCode} from "../../../../api/admin";
import {IRequestParams} from "../../../../api/requestOptions";
import {selectAdminLocationsList} from "../store/selectors";


interface ILocationListProps {
    type: LocationsCode
    className?: string;
    renderHeader: () => any;
    renderItem?: (key: string, item: ILocation) => any;
}

interface ILocationListOwnProps {
    loadLocations: (code: LocationsCode, p ?: IRequestParams) => void;
    listResponse?: ILocationsResponse;
}

export class LocationList extends React.PureComponent<ILocationListProps & ILocationListOwnProps> {

    handleAddAnimalClick = () => {
        window.console.log("Add location clicked")
    };

    componentDidMount(): void {
        if (!this.props.listResponse?.data) {
            this.props.loadLocations(this.props.type);
        }
    }

    renderList = () => {
        const {listResponse, renderItem} = this.props;
        const list = (listResponse || {}).data;
        return (
            <div className="location-list">
                {renderItem && list && list.map((item, index) => renderItem(String(index), item))}
            </div>
        )
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
                    {this.renderList()}
                </section>
            </div>
        );
    }
}


const mapStateToProps = (state: ICustomAppState, ownProps ?: ILocationListProps) => {
    return {
        listResponse: selectAdminLocationsList(state, ownProps && ownProps.type),
    }
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return bindActionCreators({
        loadLocations: actionAdminFetchLocationsRequest
    }, dispatch);
};


export const LocationListContainer = connect(mapStateToProps, mapDispatchToProps)(LocationList);

