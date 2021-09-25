import { connect } from 'react-redux';
import { ICustomAppState } from '../../../../store/state';
import { Dispatch } from 'react';
import { AnyAction } from 'redux';
import { BlogItemPageComponent } from './Component';
import {
  actionFetchBlogItemRequest,
  actionClearBlogItemState,
} from '../store/actions/blogitem.actions';
import { selectBlogItem } from '../store/selectors/blogitem.selectors';
import {
  actionFetchBlogListRequest,
  actionClearEntireBlogsState,
} from '../store/actions';
import { IRequestParams } from '../../../../api/requestOptions';
import { selectBlogList } from '../store/selectors';
import { selectSickAnimals } from '../../Animals/store/selectors';

const mapStateToProps = (state: ICustomAppState) => ({
  blogItem: selectBlogItem(state),
  blogList: selectBlogList(state),
  sickAnimalsList: selectSickAnimals(state),
});
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
  fetchBlogItem: (id: string) => dispatch(actionFetchBlogItemRequest(id)),
  clearBlogItemState: () => dispatch(actionClearBlogItemState()),
  fetchBlogList: (requestParams?: IRequestParams) =>
    dispatch(actionFetchBlogListRequest(requestParams)),
  clearBlogsState: () => dispatch(actionClearEntireBlogsState()),
});

export const BlogItemPage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(BlogItemPageComponent);
