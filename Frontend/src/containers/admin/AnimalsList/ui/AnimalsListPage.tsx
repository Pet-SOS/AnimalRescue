import React from 'react';
import { IAnimalsResponse, IAnimal } from '../../../../api/animals';
import { AdminMenu } from '../../AdminMenu';
import { Input } from 'antd';
import { Button, ButtonTypes } from '../../../../components/Button';
import '../style/animalListPage.scss';
import noPhotoImage from './../../../../img/nophoto.jpg';
import { store } from '../../../../store';

const { Search } = Input;

interface AnimalsListPageProps {
    match:any;
    baseUrl:string;
    history: any;
    location:any;
    animalsList: IAnimalsResponse
    fetchAnimalsRequest: () => void;
    fetchAnimalItem: (id:string) => any;
    postAnimal: (animal: IAnimal) => void
    updateAnimal: (params: { animal: IAnimal, id?: string }) => void
}


export class AnimalsListPage extends React.Component<AnimalsListPageProps>{
    constructor(props:AnimalsListPageProps){
       
        super(props);
        this.state={
        }
    }
    updateAnimalCard(id:any){
        this.props.fetchAnimalItem(id);
        const stateItem=store.getState();
        if(stateItem.animalItem.data.name){
            this.props.history.push(`${this.props.match.path}/animal`);
        }
        console.log('00000',store.getState());

    }

    componentDidMount(){
        this.props.fetchAnimalsRequest();
    }

    addAnimalSubmit(e:any){
        this.props.history.push(`${this.props.match.path}/animal`)
    }
    render(){
        return(
            <>
            <div className='boxAdmin'>
                <AdminMenu
                    selectedKey={'animals-list'}
                    openKeys={''}
                />
                <div className='animals-list'>
                    <h2>Тварини</h2>
                    <div className='box-action'>
                        <Search
                            placeholder="Пошук"
                            onSearch={value => console.log(value)}
                            style={{ width: 200 }}
                        />
                        <Button
                            onClick={(e) => this.addAnimalSubmit(e)}
                            styleType={ButtonTypes.Blue}>
                            Додати тварину
                      </Button>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <td>№</td>
                                <td>Фото</td>
                                <td>Кличка</td>
                                <td>Вид</td>
                                <td>Стать</td>
                                <td>Статус</td>
                                <td>Змінено</td>
                                <td></td>
                            </tr>
                        </thead>
                        <tbody>
                        {this.props.animalsList.data.length && this.props.animalsList.data.map((animal)=>
                            <tr key={animal.id}>
                                <td>{animal.number}</td>
                                <td  
                                style={{
                                    backgroundSize:'cover',
                                    backgroundImage: `url(${animal.imageIds[0] ? `${this.props.baseUrl}documents/${animal.imageIds[0]}/type/small` : `${noPhotoImage}`})` }}></td>
                                <td>{animal.name}</td>
                                <td>{animal.kindOfAnimal}</td>
                                <td>{animal.gender}</td>
                                <td>{'статус'}</td>
                                <td>{'history'}</td>
                                <td><button onClick={()=>this.updateAnimalCard(animal.id)}></button></td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
            </>
        )
    }
}