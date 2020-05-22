import {connect} from "react-redux";
import {BlogList} from "./BlogList";
import {ICustomAppState} from "../../../../store/state";
import {bindActionCreators, Dispatch} from "redux";
import {actionClearBlogListState, actionFetchBlogListRequest} from "../../../client/Blog/store/actions";


const mapStateToProps = (state: ICustomAppState) => {
    return {
        blogList: state.blogs.blogList,
    };
};
const mapDispatchToProps = (dispatch: Dispatch) => {
    return bindActionCreators(
        {
            fetchBlogList: actionFetchBlogListRequest,
            clearList : actionClearBlogListState
        },
        dispatch
    )
};

export const BlogListPage = connect(mapStateToProps, mapDispatchToProps)(BlogList);
