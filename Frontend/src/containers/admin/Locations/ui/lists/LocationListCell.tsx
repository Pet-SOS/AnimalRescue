import React from "react";
import {LocationCellForm} from "./LocationForm";
import {ILocation, LocationsCode} from "../../../../../api/admin";
import {bindActionCreators, Dispatch} from "redux";
import {connect} from "react-redux";
import {actionAdminUpdateLocationRequest} from "../../store/actions";


interface ILocationCellProps {
    className: string;
    type: LocationsCode;
    children?: any;
    location?: ILocation;
}

interface ILocationCellOwnProps {
    updateLocation: (location: ILocation) => void;
}

interface ILocationCellState {
    inEdit: boolean
}

class LocationListCell extends React.PureComponent<ILocationCellProps & ILocationCellOwnProps, ILocationCellState> {

    constructor(props: ILocationCellProps & ILocationCellOwnProps) {
        super(props);
        this.state = {
            inEdit: false
        }
    }

    shouldComponentUpdate(nextProps: Readonly<ILocationCellProps & ILocationCellOwnProps>, nextState: Readonly<ILocationCellState>, nextContext: any): boolean {
        if (this.props.location !== nextProps.location && this.state.inEdit) {
            this.setState({inEdit: false});
            return true;
        }
        return super.shouldComponentUpdate ? super.shouldComponentUpdate(nextProps, nextState, nextContext) : true;
    }


    onDeleteClick = () => {

    };

    onEditClick = () => {
        this.setState({inEdit: true});
    };

    onCancelForm = () => {
        this.setState({inEdit: false});
    };

    onSubmitForm = (location: ILocation) => {
        this.props.updateLocation(location);
    };

    renderEditForm = () => {
        return (
            <>
                <LocationCellForm
                    type={this.props.type}
                    onCancel={this.onCancelForm}
                    onSubmit={this.onSubmitForm}
                    location={this.props.location}
                />
            </>
        )
    };

    renderView = () => {
        return (
            <>
                {this.props.children && this.props.children}
                <div className="col col-btn"><i onClick={this.onEditClick} className="icon-edit">Edit</i></div>
                <div className="col col-btn"><i onClick={this.onDeleteClick} className="icon-delete">Delete</i></div>
            </>
        )
    };

    render() {
        const {className} = this.props;
        return (
            <div className={`location-item ${className || ''}`}>
                {this.state.inEdit ? this.renderEditForm() : this.renderView()}
            </div>
        );
    }
}


const mapDispatchToProps = (dispatch: Dispatch) => {
    return bindActionCreators({
        updateLocation: (location) => dispatch(actionAdminUpdateLocationRequest(location))
    }, dispatch);
};

const mapStateToProps = () => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(LocationListCell);
