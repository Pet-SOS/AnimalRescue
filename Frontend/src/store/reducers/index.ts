import {combineReducers} from "redux";
import {homePageReducer, HOME_PAGE_KEY} from "../../containers/client/Home/store/reducer";
import {AdminHomePageReducer, ADMIN_HOME_PAGE_KEY} from "../../containers/admin/Home/store/reducer";
import { ANIMALS_KEY, animalsReducer } from './../../containers/client/Animals/store/reducer/index';
import { BLOGS_KEY, blogsReducer } from './../../containers/client/Blog/store/reducer/index';

import {i18nReducer} from "../../i18n/store/reducer";

export const createReducers = () => {
    return combineReducers({
        i18n: i18nReducer,
        [HOME_PAGE_KEY]: homePageReducer,
        [ADMIN_HOME_PAGE_KEY]: AdminHomePageReducer,
        [ANIMALS_KEY]: animalsReducer,
        [BLOGS_KEY]: blogsReducer
    })
};
