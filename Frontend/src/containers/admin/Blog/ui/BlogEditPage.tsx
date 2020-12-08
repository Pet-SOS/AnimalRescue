import {ICustomAppState} from "../../../../store/state";
import {bindActionCreators, Dispatch} from "redux";
import {connect} from "react-redux";
import {BlogEditItem} from "./BlogEditItem";
import {
    actionClearBlogItemState,
    actionFetchBlogItemRequest
} from "../../../client/Blog/store/actions/blogitem.actions";
import {isLoadedBlogItem, isLoadingBlogItem, selectBlogItem} from "../store/selectors";
import {actionUpdateBlogItemRequest} from "../store/actions";
import {selectApiUrl} from "../../../../store/selectors/config.selector";

const mapStateToProps = (state: ICustomAppState) => {
    return {
        blog: selectBlogItem(state),
        isLoaded: isLoadedBlogItem(state),
        isLoading: isLoadingBlogItem(state),
        baseUrl: selectApiUrl(state),
    };
};
const mapDispatchToProps = (dispatch: Dispatch) => {
    return bindActionCreators(
        {
            fetchBlogItem: actionFetchBlogItemRequest,
            reset: actionClearBlogItemState,
            update : actionUpdateBlogItemRequest
        },
        dispatch
    )
};

export const BlogEditPage = connect(mapStateToProps, mapDispatchToProps)(BlogEditItem);
