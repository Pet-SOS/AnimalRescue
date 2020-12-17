import { connect } from 'react-redux';
import { HomePageMain } from './ui/Component';
import { ICustomAppState } from '../../../store/state';
import { IRequestParams, AllTag } from '../../../api/requestOptions';
import { AnimalKind } from '../../../api/animals';
import { Dispatch } from 'react';
import { AnyAction } from 'redux';
import { actionFetchInfoCard, actionClearInfoCard } from './store/actions';
import {
  selectAnimalsList,
  selectCatsList,
  selectDogsList,
  selectSickAnimals,
  selectSavedAnimalsCount,
} from '../Animals/store/selectors';
import {
  actionFetchCatsRequest,
  actionFetchDogsRequest,
  actionFetchAnimalsRequest,
  actionFetchSavedAnimalsCount,
  actionClearEntireAnimalsState,
} from '../Animals/store/actions';
import { selectBlogListSaved } from '../Blog/store/selectors';
import {
  actionFetchBlogListSavedRequest,
  actionFetchBlogListRequest,
} from '../Blog/store/actions';
import { selectArticleList } from '../Articles/store/selectors';
import { actionFetchArticleListRequest } from '../Articles/store/actions';
import {
  loadYouTubeVideos,
  clearYouTubeVideos,
} from '../../../store/actions/youtube-videos.actions';
import { selectVideosList } from '../../../store/selectors/youtube-videos.selectors';

const mapStateToProps = (state: ICustomAppState) => ({
  animalsList: selectAnimalsList(state),
  blogListSaved: selectBlogListSaved(state),
  catsList: selectCatsList(state),
  dogsList: selectDogsList(state),
  sickAnimalsList: selectSickAnimals(state),
  savedAnimalsCount: selectSavedAnimalsCount(state),
  articleList: selectArticleList(state),
  videosList: selectVideosList(state),
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
  fetchAnimalsRequest: (kind?: AnimalKind, pageParams?: IRequestParams) => {
    switch (kind) {
      case AnimalKind.CAT: {
        return dispatch(actionFetchCatsRequest(pageParams));
      }
      case AnimalKind.DOG: {
        return dispatch(actionFetchDogsRequest(pageParams));
      }
      default: {
        return dispatch(actionFetchAnimalsRequest(pageParams));
      }
    }
  },
  fetchSavedAnimalsCount: () => dispatch(actionFetchSavedAnimalsCount()),
  fetchInfoCard: () => dispatch(actionFetchInfoCard()),
  fetchBlogList: (tag?: AllTag, pageParams?: IRequestParams) => {
    switch (tag) {
      case AllTag.SAVED: {
        return dispatch(actionFetchBlogListSavedRequest(pageParams));
      }
      default: {
        return dispatch(actionFetchBlogListRequest(pageParams));
      }
    }
  },
  fetchArticlesList: (pageParams?: IRequestParams) =>
    dispatch(actionFetchArticleListRequest(pageParams)),
  clearAnimalsState: () => dispatch(actionClearEntireAnimalsState()),
  clearInfoCard: () => dispatch(actionClearInfoCard()),
  fetchYouTubeVideos: (count?: number) => dispatch(loadYouTubeVideos(count)),
  clearYouTubeVideos: () => dispatch(clearYouTubeVideos()),
});

export const HomePage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomePageMain);
