import React, {useEffect, useState} from 'react';
import {RouteComponentProps} from "react-router";
import {TI18n} from '../../../../i18n';
import {HelpBlock} from "../../../../components/HelpBlock";
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
        fetchAnimals(getAnimals)
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
            <HelpBlock
                backgroundColor="#eef1f3"
                themeColor="#5EAC38"
                image={require('../../../../assets/helpBlock/help_block_1.png')}
                content={
                    <TI18n
                        keyStr="homePageHelpBlockContent"
                        default="Приют ежедневно заботится о сотнях животных. Самый лучший способ помочь нам и нашим хвостикам - пожертвовать любую сумму на корм, лечение и обеспечение работы приюта"
                    />
                }
            />
        </div>
    )
};
