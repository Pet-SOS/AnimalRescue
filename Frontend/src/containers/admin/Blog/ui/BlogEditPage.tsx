import {ICustomAppState} from "../../../../store/state";
import {bindActionCreators, Dispatch} from "redux";
import {connect} from "react-redux";
import {BlogEditItem} from "./BlogEditItem";

const mapStateToProps = (state: ICustomAppState) => {
    return {};
};
const mapDispatchToProps = (dispatch: Dispatch) => {
    return bindActionCreators(
        {},
        dispatch
    )
};

export const BlogEditPage = connect(mapStateToProps, mapDispatchToProps)(BlogEditItem);
