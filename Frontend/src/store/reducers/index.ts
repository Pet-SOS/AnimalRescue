import {combineReducers} from "redux";
import {homePageReducer, HOME_PAGE_KEY} from "../../containers/client/Home/store/reducer";
import {AdminHomePageReducer, ADMIN_HOME_PAGE_KEY} from "../../containers/admin/Home/store/reducer";
import { ANIMALS_KEY, animalsReducer } from './../../containers/client/Animals/store/reducer/index';
import { BLOGS_KEY, blogsReducer } from './../../containers/client/Blog/store/reducer/index';
import {i18nReducer} from "../../i18n/store/reducer";
import { ARTICLES_KEY, articlesReducer } from "../../containers/client/Articles/store/reducer";
import { blogItemReducer, BLOG_ITEM_KEY } from './../../containers/client/Blog/store/reducer/blogitem.reducer';
import { VACANCIES_KEY, vacanciesReducer } from './vacancies.reducer';
import { ANIMAL_ITEM_KEY, animalItemReducer } from './../../containers/client/Animals/store/reducer/animal.reducer';
import { REPORT_KEY, financialReportReducer } from "../../containers/client/FinancialReports/store/reducer";
import { ADMIN_LOGIN_KEY, AdminLoginReducer } from "../../containers/admin/Login/store/reducer";
import { youtubeVideosReducer, YOUTUBE_VIDEOS_KEY } from "./youtube-videos.reducer";
import { CONFIG_KEY, configReducer } from './config.reducer';
import { APP_LANGUAGE_KEY } from './../../i18n/store/reducer/index';

export const createReducers = () => {
  return combineReducers({
    [APP_LANGUAGE_KEY]: i18nReducer,
    [ADMIN_LOGIN_KEY]: AdminLoginReducer,
    [HOME_PAGE_KEY]: homePageReducer,
    [ADMIN_HOME_PAGE_KEY]: AdminHomePageReducer,
    [ANIMAL_ITEM_KEY]: animalItemReducer,
    [ANIMALS_KEY]: animalsReducer,
    [ARTICLES_KEY]: articlesReducer,
    [BLOGS_KEY]: blogsReducer,
    [BLOG_ITEM_KEY]: blogItemReducer,
    [CONFIG_KEY]: configReducer,
    [VACANCIES_KEY]: vacanciesReducer,
    [REPORT_KEY]: financialReportReducer,
    [YOUTUBE_VIDEOS_KEY]: youtubeVideosReducer
  })
}
