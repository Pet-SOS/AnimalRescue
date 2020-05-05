import {connect} from "react-redux";
import {LocationTabs} from "./LocationTabs";
import {ICustomAppState} from "../../../../store/state";
import {bindActionCreators, Dispatch} from "redux";
import {actionAdminFetchLocationsRequest} from "../store/actions";


const mapStateToProps =  (state : ICustomAppState) => {
    return {

    }
};

const mapDispatchToProps = (dispatch : Dispatch) => {
    return bindActionCreators({
            loadLocations : actionAdminFetchLocationsRequest
        },
        dispatch
    )
};

const LocationContainer = connect(mapStateToProps, mapDispatchToProps)(LocationTabs);
export default LocationContainer
