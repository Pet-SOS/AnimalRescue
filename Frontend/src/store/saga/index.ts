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

export function* appSaga() {
    try {
        yield all([
          watchAdminHomePage(),
          watchHomePage(),
          watchAnimals(),
          watchBlogs(),
          watchBlogItem(),
          watchArticles(),
          watchVacancies(),
          watchAnimalItem(),
          watchFinancialReport(),
          watchYouTubeVideosActions(),
          watchLoginRequestHomePage()
        ]);
    } catch (e) {
        logger.error(e);
    }
}
