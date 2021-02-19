import React from 'react';
import '../styles/home.scss';
import {
  DEFAULT_ANIMAL,
  IAnimal,
  IAnimalsResponse,
} from '../../../../api/animals';
import AnimalEditCard from '../../AnimalEditCard/ui/AnimalEditCard';
import { AdminMenu } from '../../AdminMenu';
import { ITag } from '../../../../api/tags';

interface AdminHomeProps {
  animalsList: IAnimalsResponse;
  tagsList: { [key: string]: Array<ITag> };
  fetchAnimalsRequest: () => void;
  deleteAnimal: (id: string) => void;
  postAnimal: (animal: IAnimal) => void;
  updateAnimal: (params: { animal: IAnimal; id?: string }) => void;
  fetchAnimalItem: (id: string) => any;
  clearFetchAnimalItem: () => void;
}

export class AdminHomePage extends React.Component<AdminHomeProps> {
  componentDidMount(): void {
    this.props.fetchAnimalsRequest();
  }

  deleteAnimal = (id: string) => {
    this.props.deleteAnimal(id);
  };

  postAnimal = (animal: IAnimal) => {
    this.props.postAnimal(animal);
  };

  updateAnimal = (params: { animal: IAnimal; id?: string }) => {
    this.props.updateAnimal(params);
  };

  renderAnimal = (animal: IAnimal) => {
    return (
      <div key={animal.id || 'newAnimal'} className={'animal-card'}>
        {
          <AnimalEditCard
            animal={animal}
            tagsList={this.props.tagsList}
            deleteAnimal={this.deleteAnimal}
            postAnimal={this.postAnimal}
            updateAnimal={this.updateAnimal}
            fetchAnimalItem={this.props.fetchAnimalItem}
            clearFetchAnimalItem={this.props.clearFetchAnimalItem}
          />
        }
      </div>
    );
  };

  renderAnimals = (animals: IAnimal[]) => {
    animals.push({ ...DEFAULT_ANIMAL });
    return animals.map((animal: IAnimal) => this.renderAnimal(animal));
  };

  render() {
    return (
      <div className="boxAdmin">
        <AdminMenu selectedKey={'animals'} openKeys={[]} />
        <main className="home-page">
          <div className="container">
            {this.renderAnimals(this.props.animalsList.data)}
          </div>
        </main>
      </div>
    );
  }
}
