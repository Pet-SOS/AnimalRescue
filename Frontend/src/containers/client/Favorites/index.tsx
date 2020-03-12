import { FavoritesPage } from './ui/FavoritesPage'
import { bindActionCreators, Dispatch, AnyAction } from 'redux';

import { ICustomAppState } from '../../../store/state';
import { connect } from 'react-redux';
import { actionFetchSickAnimals, actionFetchCatsRequest, actionFetchDogsRequest, actionFetchFavoriteAnimalsRequest } from '../Animals/store/actions';

const mapStateToProps = (state: ICustomAppState) => {
    return {
        sickAnimalsList: state.animals.sickAnimalsList,
        catsList: state.animals.catsList,
        dogsList: state.animals.dogsList,   
        favoriteAnimalsIds: state.animals.favoriteAnimalsIds,  
        favoriteAnimalsList: state.animals.favoriteAnimalsList   
    };
  };

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
    return bindActionCreators(
        {
            fetchSickAnimals: actionFetchSickAnimals,
            fetchCats: actionFetchCatsRequest,
            fetchDogs: actionFetchDogsRequest,
            fetchFavoriteAnimals: actionFetchFavoriteAnimalsRequest
        },
        dispatch
      )
}

export const Favorites = connect(mapStateToProps, mapDispatchToProps)(FavoritesPage);