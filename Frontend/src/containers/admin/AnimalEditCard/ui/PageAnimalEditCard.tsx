import React from "react";
import { AdminMenu } from "../../AdminMenu";
import { IAnimal } from "../../../../api/animals";
import { AnimalEditCard } from "./AnimalEditCard";

interface IAnimalCardProps {
    animal: IAnimal,
    deleteAnimal: (id: string) => void
    postAnimal: (animal: IAnimal) => void
    updateAnimal: (params: { animal: IAnimal, id?: string }) => void

}

export class PageAnimalEditCard extends React.Component<IAnimalCardProps> {
    render(){
        return(
            <>
                <div className='boxAdmin'>
                    <AdminMenu 
                        selectedKey={'animals-list'}
                        openKeys={['']}
                    />
                    <div>
                        <AnimalEditCard
                            animal={this.props.animal}
                            deleteAnimal={this.props.deleteAnimal}
                            postAnimal={this.props.postAnimal}
                            updateAnimal={this.props.updateAnimal}
                        />
                    </div>
                </div>
            </>
        )
    }
}