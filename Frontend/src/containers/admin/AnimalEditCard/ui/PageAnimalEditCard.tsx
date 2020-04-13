import React from "react";
import { AdminMenu } from "../../AdminMenu";
import { IAnimal } from "../../../../api/animals";
import { AnimalEditCard } from "./AnimalEditCard";
import {Button, ButtonTypes} from "../../../../components/Button";

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
                    <main>
                        <div className="container">
                            <section className="section-edit">
                                <header>
                                    <Button styleType={ButtonTypes.WhiteCircle}/>
                                    <h3>Картка тварини</h3>
                                </header>
                                <section className="page-content">
                                    <AnimalEditCard
                                        animal={this.props.animal}
                                        deleteAnimal={this.props.deleteAnimal}
                                        postAnimal={this.props.postAnimal}
                                        updateAnimal={this.props.updateAnimal}
                                    />
                                </section>
                            </section>
                        </div>
                    </main>
                </div>
            </>
        )
    }
}