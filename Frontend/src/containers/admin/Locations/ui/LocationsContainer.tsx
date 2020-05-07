import {connect} from "react-redux";
import {LocationTabs} from "./LocationTabs";
import {ICustomAppState} from "../../../../store/state";
import {bindActionCreators, Dispatch} from "redux";


const mapStateToProps = (state: ICustomAppState) => {
    return {}
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return bindActionCreators({},
        dispatch
    )
};

const LocationContainer = connect(mapStateToProps, mapDispatchToProps)(LocationTabs);
export default LocationContainer
