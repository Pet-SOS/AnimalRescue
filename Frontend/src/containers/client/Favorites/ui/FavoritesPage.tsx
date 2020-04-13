import React from 'react';
import { TI18n } from '../../../../i18n';
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
    clearSickAnimals: () => void;
    clearDogsList: () => void;
    clearCatsList: () => void;
    clearFavoriteAnimalsList: () => void;
  }

export class FavoritesPage extends React.Component<IPropTypes> {
  public componentDidMount() {
    this.props.fetchFavoriteAnimals(this.props.favoriteAnimalsIds);
    this.props.fetchSickAnimals();
  }
  public componentWillUpdate(nextProps: IPropTypes): void {
    if (this.props.favoriteAnimalsIds.length < nextProps.favoriteAnimalsIds.length) {
      this.props.fetchFavoriteAnimals(nextProps.favoriteAnimalsIds);
    }
    if (!nextProps.favoriteAnimalsIds.length) {
      if (!nextProps.catsList.isLoaded && !nextProps.catsList.isLoading) {
        this.props.fetchCats();
      }
      if (!nextProps.dogsList.isLoaded && !nextProps.dogsList.isLoading) {
        this.props.fetchDogs();
      }
    }
  }
  public componentWillUnmount(): void {
    this.props.clearSickAnimals();
    this.props.clearCatsList();
    this.props.clearDogsList();
    this.props.clearFavoriteAnimalsList();
  }
  private favoriteAnimalsCount(): number {
    return this.props.favoriteAnimalsIds.length
  };
      
    public render(){    
        return (
        <React.Fragment>
            <div className='favorites-page-holder'>
                <div className='container'>
                    <h2><TI18n keyStr='favoritesPageTitle' default='Mені сподобалися' /></h2>
                    {this.favoriteAnimalsCount() === 0 && 
                        <div className="text">
                                <TI18n keyStr='noneFavoriteAnimalsText' 
                                    default='Ви поки не відзначили нікого з тварин, придивіться, раптом ваш друг чекає вас у нас.' /> 
                        </div>
                    }

                    {this.favoriteAnimalsCount() > 0 && 
                        <div className="text">
                            {this.favoriteAnimalsCount() > 1 &&
                                <span>
                                    <TI18n keyStr='itLikedYouText' default='Вам сподобалися ' />
                                    {this.favoriteAnimalsCount()}
                                    <TI18n keyStr='tailsText' default=' хвостиків' />
                                </span>  
                            }    
                            {this.favoriteAnimalsCount() === 1 &&
                                <span>
                                    <TI18n keyStr='itLikedYouText1' default='Вам сподобався ' />
                                    1
                                    <TI18n keyStr='tailsText1' default=' хвостик' />
                                </span>  
                            }                     
                        </div> 
                    }
                </div>

                {this.favoriteAnimalsCount() === 0 && 
                    <div className="animals-slider-wrapper">
                        {this.props.dogsList.data && this.props.dogsList.data.length > 0 && <AnimalsSlider
                            data={this.props.dogsList.data}
                            title={<TI18n keyStr="dogsListTitle" default="Наши собачки" />}
                            link={{
                            title: <TI18n keyStr="wantToChooseFriend" default="Хочу выбрать друга" />,
                            href: '/animals/page/1?kindOfAnimal=DOG/'
                            }}
                        />}
                        {this.props.catsList.data && this.props.catsList.data.length > 0 && <AnimalsSlider
                            data={this.props.catsList.data}
                            title={<TI18n keyStr="catsListTitle" default="Наши котики" />}
                            link={{
                            title: <TI18n keyStr="wantToChooseFriend" default="Хочу выбрать друга" />,
                            href: '/animals/page/1?kindOfAnimal=CAT/'
                            }}
                        />}
                    </div>
                }
                <div className='container'>
                    <section className='section-margin'>
                        {this.favoriteAnimalsCount() > 0 && this.props.favoriteAnimalsList.data && this.props.favoriteAnimalsList.data.length > 0 &&
                        <div className='content-block-animals'>
                            {
                                this.props.favoriteAnimalsList.data.length &&
                                this.props.favoriteAnimalsList.data.map(animal => <div className='animal' key={animal.id}><AnimalCard animal={animal}/></div>)
                            }
                        </div>
                        }
                    </section>
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