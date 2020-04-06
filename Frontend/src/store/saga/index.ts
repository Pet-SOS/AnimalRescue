import {all} from 'redux-saga/effects';
import logger from '../logger';
import {watchHomePage} from "../../containers/client/Home/store/saga";
import {watchAdminHomePage} from "../../containers/admin/Home/store/saga";
import { watchAnimals } from '../../containers/client/Animals/store/saga';
import { watchBlogs } from '../../containers/client/Blog/store/saga';
import { watchArticles } from '../../containers/client/Articles/store/saga';
import { watchBlogItem } from '../../containers/client/Blog/store/saga/blogitem.saga';
import { watchVacancies } from './vacancies.saga';
import { watchAnimalItem } from '../../containers/client/Animals/store/saga/animalitem.saga';
import { watchFinancialReport } from '../../containers/client/FinancialReports/store/saga';
import { watchYouTubeVideosActions } from './youtube-videos.saga';
import { watchLoginRequestHomePage } from '../../containers/admin/Login/store/saga';
import { watchConfig } from './config.saga';
import { watchTags } from './tags.saga';
import { watchSnackbar } from './snackbar.saga';
import { watchOrganizationDocuments } from './organizationDocuments.saga';

export function* appSaga() {
    try {
        yield all([
          watchConfig(),
          watchAdminHomePage(),
          watchHomePage(),
          watchAnimals(),
          watchBlogs(),
          watchBlogItem(),
          watchArticles(),
          watchVacancies(),
          watchAnimalItem(),
          watchFinancialReport(),
          watchOrganizationDocuments(),
          watchYouTubeVideosActions(),
          watchLoginRequestHomePage(),
          watchTags(),
          watchSnackbar(),
        ]);
    } catch (e) {
        logger.error(e);
    }
}
