import React from 'react';
import { TI18n } from '../../../../i18n';
import { store } from '../../../../store';
import { IAnimalsListState } from '../../Animals/store/state';
import { HelpBlock } from '../../../../components/HelpBlock';
import { AnimalsSlider } from '../../Animals/AnimalsSlider';
import { AnimalCard } from '../../Animals/AnimalCard';
import '../style/FavoritesPage.scss';

interface IPropTypes {
    favoriteAnimalsIds: string[]
    catsList: IAnimalsListState;
    dogsList: IAnimalsListState;
    sickAnimalsList: IAnimalsListState;
    favoriteAnimalsList: IAnimalsListState;
    fetchSickAnimals:() => void;
    fetchCats: () => void;
    fetchDogs: () => void; 
    fetchFavoriteAnimals: (animalIds: string[]) => void;
  }
 
const favoriteAnimalsCount = () => {
    const listIds : string[] = store.getState().animals.favoriteAnimalsIds;
    return listIds.length;
}

export class FavoritesPage extends React.Component<IPropTypes> {

    componentDidMount(){        
        if(store.getState().animals.catsList.totalCount === 0){
            this.props.fetchCats();
        }
        if(store.getState().animals.dogsList.totalCount === 0){
            this.props.fetchDogs();
        }
        if(store.getState().animals.sickAnimalsList.totalCount === 0){
            this.props.fetchSickAnimals();
        }        
        this.props.fetchFavoriteAnimals(store.getState().animals.favoriteAnimalsIds);
    }  
      
    render(){    
        return (
        <React.Fragment>
            <div className='favorites-page-holder'>
                <div className='content'>
                    <h1 className='title'>
                        <TI18n keyStr='favoritesPageTitle' default='Mені сподобалися' />
                    </h1>

                    {favoriteAnimalsCount() === 0 && 
                        <div className="text">
                                <TI18n keyStr='noneFavoriteAnimalsText' 
                                    default='Ви поки не відзначили нікого з тварин, придивіться, раптом ваш друг чекає вас у нас.' /> 
                        </div>
                    }

                    {favoriteAnimalsCount() > 0 && 
                        <div className="text">
                            {favoriteAnimalsCount() > 1 &&
                                <span>
                                    <TI18n keyStr='itLikedYouText' default='Вам сподобалися ' />
                                    {favoriteAnimalsCount()}
                                    <TI18n keyStr='tailsText' default=' хвостиків' />
                                </span>  
                            }    
                            {favoriteAnimalsCount() === 1 &&
                                <span>
                                    <TI18n keyStr='itLikedYouText1' default='Вам сподобався ' />
                                    1
                                    <TI18n keyStr='tailsText1' default=' хвостик' />
                                </span>  
                            }                     
                        </div> 
                    }
                </div>

                {favoriteAnimalsCount() === 0 && 
                    <div className="animals-slider-wrapper">
                        {this.props.dogsList.data && this.props.dogsList.data.length > 0 && <AnimalsSlider
                            data={this.props.dogsList.data}
                            title={<TI18n keyStr="dogsListTitle" default="Наши собачки" />}
                            link={{
                            title: <TI18n keyStr="wantToChooseFriend" default="Хочу выбрать друга" />,
                            href: '/'
                            }}
                        />}
                        {this.props.catsList.data && this.props.catsList.data.length > 0 && <AnimalsSlider
                            data={this.props.catsList.data}
                            title={<TI18n keyStr="catsListTitle" default="Наши котики" />}
                            link={{
                            title: <TI18n keyStr="wantToChooseFriend" default="Хочу выбрать друга" />,
                            href: '/'
                            }}
                        />}
                    </div>
                }

                <div className='content'>
                    {favoriteAnimalsCount() > 0 && this.props.favoriteAnimalsList.data && this.props.favoriteAnimalsList.data.length > 0 &&
                        <div className='content-block'>
                        {
                            this.props.favoriteAnimalsList.data.length &&
                            this.props.favoriteAnimalsList.data.map(animal => <div className='animal' key={animal.id}><AnimalCard animal={animal}/></div>)
                        }
                        </div>                       
                    }
                </div>   

                {this.props.sickAnimalsList.totalCount > 0 &&
                    <HelpBlock
                        animalsList={this.props.sickAnimalsList.data}
                        title={<TI18n keyStr="canHelpBlockTitle" default="Кому ты можешь помочь" />}
                    />
                }
            </div>
        </React.Fragment>
        )
    }
};