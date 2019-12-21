import React, {useEffect, useState} from 'react';
import {RouteComponentProps} from "react-router";
import '../styles/home.scss';
import {fetchAnimals, IAnimal} from "../../../../api/animals";
import {AnimalCard} from "../../../../components/AnimalCard";

interface IPropTypes extends RouteComponentProps<any> {

}

export const AdminHome: React.FC<IPropTypes> = (props: IPropTypes) => {
    const [animals, setAnimals] = useState([])

    const getAnimals = (result: never) => {
        setAnimals(result)
    }

    useEffect(() => {
        fetchAnimals()
    }, [])

    const renderAnimal = (animal: IAnimal) => {
        return (<div key={animal.id} className={'animalCard'}>
            {AnimalCard(animal)}
        </div>)
    }

    const renderAnimals = (animals: IAnimal[]) => {
        return animals.map((animal: IAnimal) => renderAnimal(animal))
    }

    return (
        <div className="home-page">
            <div><h2>CONTENT</h2></div>
            {renderAnimals(animals)}
        </div>
    )
};
