import React from "react";
import {ICustomAppState} from "../../../../../store/state";
import {connect} from "react-redux";
import {bindActionCreators, Dispatch} from "redux";
import {actionAdminFetchLocationsRequest} from "../../store/actions";
import {ILocation, ILocationsResponse, LocationsCode} from "../../../../../api/admin";
import {IRequestParams} from "../../../../../api/requestOptions";
import {isLoadingAdminLocations, selectAdminLocationsList} from "../../store/selectors";


interface ILocationListProps {
    type: LocationsCode
    className?: string;
    renderHeader: () => any;
    renderItem?: (key: string, item: ILocation) => any;
}

interface ILocationListOwnProps {
    loadLocations: (code: LocationsCode, p ?: IRequestParams) => void;
    listResponse?: ILocationsResponse;
    isLoading: boolean;
}

export class LocationList extends React.PureComponent<ILocationListProps & ILocationListOwnProps> {

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
                <section className='section-table location-table'>
                    <header>
                        <div className={`row ${this.props.className}`}>
                            {this.props.renderHeader()}
                        </div>
                    </header>
                    {!this.props.isLoading && this.renderList()}
                </section>
            </div>
        );
    }
}


const mapStateToProps = (state: ICustomAppState, ownProps ?: ILocationListProps) => {
    const type = ownProps && ownProps.type;
    return {
        listResponse: selectAdminLocationsList(state, type),
        isLoading: isLoadingAdminLocations(state, type)
    }
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return bindActionCreators({
        loadLocations: actionAdminFetchLocationsRequest
    }, dispatch);
};


export const LocationListContainer = connect(mapStateToProps, mapDispatchToProps)(LocationList);

