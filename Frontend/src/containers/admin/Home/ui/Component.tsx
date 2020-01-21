import React from 'react';
import '../styles/home.scss';
import {IAnimal, IAnimalsResponse} from "../../../../api/animals";
import {AnimalCard} from "../../../../components/AnimalCard";

interface AdminHomeProps {
    animalsList: IAnimalsResponse
    fetchAnimalsRequest: () => void;
}
export class AdminHomePage extends React.Component<AdminHomeProps> {

    componentDidMount(): void {
        this.props.fetchAnimalsRequest()
    }

    renderAnimal = (animal: IAnimal) => {
        return (<div key={animal.id} className={'animal-card'}>
            {<AnimalCard animal={animal}/>}
        </div>)
    }

    renderAnimals = (animals: IAnimal[]) => {
        return animals.map((animal: IAnimal) => this.renderAnimal(animal))
    }

    render() {
        return (
            <div className="home-page">
                {this.renderAnimals(this.props.animalsList.data)}
            </div>
        )
    }
};
