import {combineReducers} from "redux";
import {homePageReducer, HOME_PAGE_KEY} from "../../containers/client/Home/store/reducer";
import {AdminHomePageReducer, ADMIN_HOME_PAGE_KEY} from "../../containers/admin/Home/store/reducer";
import { ANIMALS_KEY, animalsReducer } from './../../containers/client/Animals/store/reducer/index';
import { BLOGS_KEY, blogsReducer } from './../../containers/client/Blog/store/reducer/index';
import {i18nReducer} from "../../i18n/store/reducer";
import { ARTICLES_KEY, articlesReducer } from "../../containers/client/Articles/store/reducer";
import { blogItemReducer, BLOG_ITEM_KEY } from './../../containers/client/Blog/store/reducer/blogitem.reducer';
import { VACANCIES_KEY, vacanciesReducer } from './../../containers/client/Vacancies/store/reducer/vacancies.reducer';
import { ANIMAL_ITEM_KEY, animalItemReducer } from './../../containers/client/Animals/store/reducer/animal.reducer';

export const createReducers = () => {
    return combineReducers({
        i18n: i18nReducer,
        [HOME_PAGE_KEY]: homePageReducer,
        [ADMIN_HOME_PAGE_KEY]: AdminHomePageReducer,
        [ANIMALS_KEY]: animalsReducer,
        [ANIMAL_ITEM_KEY]: animalItemReducer,
        [BLOGS_KEY]: blogsReducer,
        [BLOG_ITEM_KEY]: blogItemReducer,
        [ARTICLES_KEY]: articlesReducer,
        [VACANCIES_KEY]: vacanciesReducer
    })
};
