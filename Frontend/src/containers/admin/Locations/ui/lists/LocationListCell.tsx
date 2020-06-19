import React from "react";
import {LocationCellForm} from "./LocationForm";
import {ILocation, LocationsCode} from "../../../../../api/admin";
import {bindActionCreators, Dispatch} from "redux";
import {connect} from "react-redux";
import {
    actionAdminCreateLocationRequest,
    actionAdminDeleteLocationRequest,
    actionAdminUpdateLocationRequest
} from "../../store/actions";
import customConfirm from "../../../../../components/Confirm";
import {ELocales} from "../../../../../i18n/store/state";


interface ILocationCellProps {
    className: string;
    type: LocationsCode;
    children?: any;
    location?: ILocation;
}

interface ILocationCellOwnProps {
    updateLocation: (location: ILocation) => void;
    createLocation: (location: ILocation) => void;
    deleteLocation: (location: ILocation) => void;
}

interface ILocationCellState {
    inEdit: boolean
}

class LocationListCell extends React.Component<ILocationCellProps & ILocationCellOwnProps, ILocationCellState> {

    constructor(props: ILocationCellProps & ILocationCellOwnProps) {
        super(props);
        this.state = {
            inEdit: false
        }
    }

    shouldComponentUpdate(nextProps: Readonly<ILocationCellProps & ILocationCellOwnProps>, nextState: Readonly<ILocationCellState>, nextContext: any): boolean {
        if (this.props.location !== nextProps.location && this.state.inEdit) {
            this.setState({inEdit: false});
        }
        return true;
    }


    onDeleteClick = async () => {
        const confirm = await customConfirm(
            `Видалити локацію '${this.props.location!.title}'?`,
            'Видалити',
            'Скасувати'
        );
        if (confirm) {
            this.props.deleteLocation(this.props.location!)
        }

    };

    onEditClick = () => {
        this.setState({inEdit: true});
    };

    onCancelForm = () => {
        this.setState({inEdit: false});
    };

    onSubmitForm = (location: ILocation) => {
        if (location && location.id) {
            this.props.updateLocation(location);
        } else {
            this.props.createLocation(location);
        }
    };

    renderEditForm = () => {
        let {location} = this.props;
        if (location && !location.id) {
            location = undefined;
        }
        return (
            <>
                <LocationCellForm
                    locationType={this.props.type}
                    onCancel={this.onCancelForm}
                    onSubmit={this.onSubmitForm}
                    location={location}
                />
            </>
        )
    };

    renderButton = () => this.props.location && !!this.props.location.id;

    renderView = () => {
        return (
            <>
                {this.props.children && this.props.children}
                <div className="col col-icon">
                    {this.renderButton() && (
                        <i onClick={this.onEditClick} className="icon-edit"></i>)}
                </div>
                <div className="col col-icon">
                    {this.renderButton() && (
                        <i onClick={this.onDeleteClick} className="icon-delete"></i>)}
                </div>
            </>
        )
    };

    handleCellClick = () => {
        if (!this.state.inEdit && (!this.props.location || !this.props.location.id)) {
            this.onEditClick();
        }
    };

    render() {
        const {className} = this.props;
        return (
            <>
                {this.state.inEdit
                    ? this.renderEditForm()
                    : <div className={`row ${className || ''}`} onClick={this.handleCellClick}>
                        {this.renderView()}
                      </div>}
            </>
        );
    }
}


const mapDispatchToProps = (dispatch: Dispatch) => {
    return bindActionCreators({
        updateLocation: actionAdminUpdateLocationRequest,
        createLocation: actionAdminCreateLocationRequest,
        deleteLocation: actionAdminDeleteLocationRequest
    }, dispatch);
};

const mapStateToProps = () => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(LocationListCell);
