import React from "react";
import { AdminMenu } from "../../AdminMenu";
import { IAnimal } from "../../../../api/animals";
import AnimalEditCard from "./AnimalEditCard";
import {Button, ButtonTypes} from "../../../../components/Button";
import { ITag } from '../../../../api/tags';

interface IAnimalCardProps {
    animal: IAnimal;
    tagsList: ITag[];
    deleteAnimal: (id: string) => void;
    postAnimal: (animal: IAnimal) => void;
    updateAnimal: (params: { animal: IAnimal, id?: string }) => void;
    fetchAnimalItem: (id:string) => any;
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
                                    <Button className="icon-arrow-left" styleType={ButtonTypes.WhiteCircle}/>
                                    <h3>Картка тварини</h3>
                                </header>
                                <section className="page-content">
                                    <AnimalEditCard
                                        tagsList={this.props.tagsList}
                                        animal={this.props.animal}
                                        deleteAnimal={this.props.deleteAnimal}
                                        postAnimal={this.props.postAnimal}
                                        updateAnimal={this.props.updateAnimal}
                                        fetchAnimalItem={this.props.fetchAnimalItem}
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
