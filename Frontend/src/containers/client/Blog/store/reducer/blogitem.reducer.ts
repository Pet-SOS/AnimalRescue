import {AnyAction} from "redux";
import {getType} from "typesafe-actions";
import {
    actionClearBlogItemState,
    actionFetchBlogItemFailure,
    actionFetchBlogItemRequest,
    actionFetchBlogItemSuccess
} from '../actions/blogitem.actions';
import {DEFAULT_BLOG_ITEM_STATE, IBlogItemState} from '../state/blogitem.state';
import {genericRequestReducer} from "../../../../../api";
import {
    actionUpdateBlogItemFailure,
    actionUpdateBlogItemRequest,
    actionUpdateBlogItemSuccess
} from "../../../../admin/Blog/store/actions";

const fetchBlogItemStateReducer = genericRequestReducer(
    actionFetchBlogItemRequest,
    actionFetchBlogItemSuccess,
    actionFetchBlogItemFailure,
);

const updateBlogItemStateReducer = genericRequestReducer(
    actionUpdateBlogItemRequest,
    actionUpdateBlogItemSuccess,
    actionUpdateBlogItemFailure,
);

export const blogItemReducer = (state: IBlogItemState = DEFAULT_BLOG_ITEM_STATE, action: AnyAction): IBlogItemState => {
    switch (action.type) {
        case getType(actionFetchBlogItemRequest): {
            return {
                ...state,
                requestState: fetchBlogItemStateReducer(state.requestState, action),
                isLoading: true
            }
        }

        case getType(actionFetchBlogItemSuccess): {
            return {
                ...state,
                ...action.payload,
                requestState: fetchBlogItemStateReducer(state.requestState, action),
                isLoading: false,
                isLoaded: true,
            }
        }

        case getType(actionFetchBlogItemFailure): {
            return {
                ...state,
                requestState: fetchBlogItemStateReducer(state.requestState, action),
                isLoading: false,
                isLoaded: false,
            }
        }

        case getType(actionClearBlogItemState): {
            return {
                ...DEFAULT_BLOG_ITEM_STATE
            }
        }

        case getType(actionUpdateBlogItemRequest): {
            return {
                ...state,
                requestState: updateBlogItemStateReducer(state.requestState, action),
                isLoading: true,
                isLoaded: false,
            }
        }
        case getType(actionUpdateBlogItemSuccess): {
            return {
                ...state,
                data : {
                    ...state.data,
                    ...action.payload
                },
                requestState: updateBlogItemStateReducer(state.requestState, action),
                isLoading: false,
                isLoaded: true,
            }
        }
        case getType(actionUpdateBlogItemFailure): {
            return {
                ...state,
                ...action.payload,
                requestState: updateBlogItemStateReducer(state.requestState, action),
                isLoading: false,
                isLoaded: false,
            }
        }


        default: {
            return state;
        }
    }
};

export const BLOG_ITEM_KEY = 'blogItem';
