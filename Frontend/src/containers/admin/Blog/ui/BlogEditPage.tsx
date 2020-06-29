import {ICustomAppState} from "../../../../store/state";
import {bindActionCreators, Dispatch} from "redux";
import {connect} from "react-redux";
import {BlogEditItem} from "./BlogEditItem";
import {
    actionClearBlogItemState,
    actionFetchBlogItemRequest
} from "../../../client/Blog/store/actions/blogitem.actions";
import {isLoadedBlogItem, selectBlogItem} from "../store/selectors";

const mapStateToProps = (state: ICustomAppState) => {
    return {
        blog: selectBlogItem(state),
        isLoaded: isLoadedBlogItem(state)
    };
};
const mapDispatchToProps = (dispatch: Dispatch) => {
    return bindActionCreators(
        {
            fetchBlogItem: actionFetchBlogItemRequest,
            reset: actionClearBlogItemState,
        },
        dispatch
    )
};

export const BlogEditPage = connect(mapStateToProps, mapDispatchToProps)(BlogEditItem);
