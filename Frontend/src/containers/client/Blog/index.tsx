import { BlogPage } from './ui/BlogPage'
import { bindActionCreators, Dispatch, AnyAction } from 'redux';

import { ICustomAppState } from '../../../store/state';
import { connect } from 'react-redux';
import { actionFetchInfoCard, actionFetchInfoContacts } from '../Home/store/actions';
import { actionFetchBlogListRequest } from './store/actions';
import { selectSickAnimals } from '../Animals/store/selectors';


const mapStateToProps = (state: ICustomAppState) => {
    return {
        blogList: state.blogs.blogList,
        infoCard: state.homePage.infoCard,
        infoContacts: state.homePage.infoContacts,
        sickAnimalsList: selectSickAnimals(state),
    };
  };
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
    return bindActionCreators(
        {
            fetchBlogList: actionFetchBlogListRequest,
            fetchInfoCard: actionFetchInfoCard,
            fetchInfoContacts: actionFetchInfoContacts, 
        },
        dispatch
      )
}


export const Blog = connect(mapStateToProps, mapDispatchToProps)(BlogPage);