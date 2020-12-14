import { combineReducers } from 'redux';
import {
  HOME_PAGE_KEY,
  homePageReducer,
} from '../../containers/client/Home/store/reducer';
import {
  ADMIN_HOME_PAGE_KEY,
  AdminHomePageReducer,
} from '../../containers/admin/Home/store/reducer';
import {
  ANIMALS_KEY,
  animalsReducer,
} from '../../containers/client/Animals/store/reducer';
import {
  BLOGS_KEY,
  blogsReducer,
} from '../../containers/client/Blog/store/reducer';
import { APP_LANGUAGE_KEY, i18nReducer } from '../../i18n/store/reducer';
import {
  ARTICLES_KEY,
  articlesReducer,
} from '../../containers/client/Articles/store/reducer';
import {
  BLOG_ITEM_KEY,
  blogItemReducer,
} from '../../containers/client/Blog/store/reducer/blogitem.reducer';
import { VACANCIES_KEY, vacanciesReducer } from './vacancies.reducer';
import {
  ANIMAL_ITEM_KEY,
  animalItemReducer,
} from '../../containers/client/Animals/store/reducer/animal.reducer';
import {
  financialReportReducer,
  REPORT_KEY,
} from '../../containers/client/FinancialReports/store/reducer';
import {
  ADMIN_LOGIN_KEY,
  AdminLoginReducer,
} from '../../containers/admin/Login/store/reducer';
import {
  YOUTUBE_VIDEOS_KEY,
  youtubeVideosReducer,
} from './youtube-videos.reducer';
import { CONFIG_KEY, configReducer } from './config.reducer';
import { TAGS_KEY, tagsReducer } from './tags.reducer';
import { SNACKBAR_KEY, snackbarReducer } from './snackbar.reducer';
import {
  ORGANIZATION_DOCUMENTS_KEY,
  organizationDocumentsReducer,
} from './organizationDocuments.reducer';
import {
  ADMIN_LOCATIONS_KEY,
  adminLocationsReducer,
} from '../../containers/admin/Locations/store/reducer';

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
    [SNACKBAR_KEY]: snackbarReducer,
    [TAGS_KEY]: tagsReducer,
    [ORGANIZATION_DOCUMENTS_KEY]: organizationDocumentsReducer,
    [YOUTUBE_VIDEOS_KEY]: youtubeVideosReducer,
    [ADMIN_LOCATIONS_KEY]: adminLocationsReducer,
  });
};
