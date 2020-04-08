import React from 'react';
import { IAnimalsResponse, IAnimal } from '../../../../api/animals';
import { AdminMenu } from '../../AdminMenu';
import { Input } from 'antd';
import { Button, ButtonTypes } from '../../../../components/Button';
import '../style/animalListPage.scss';
import noPhotoImage from './../../../../img/nophoto.jpg';
import { store } from '../../../../store';
import { BtnPagination } from '../../../client/Blog/ui/BtnPagination';
import { IRequestParams } from '../../../../api/requestOptions';
import moment from 'moment';

const { Search } = Input;

interface AnimalsListPageProps {
    match:any;
    baseUrl:string;
    history: any;
    location:any;
    animalsList: IAnimalsResponse;
    fetchAnimalsRequest: (params?: IRequestParams) => void;
    fetchAnimalItem: (id:string) => any;
    clearFetchAnimalItem:()=> void;
    postAnimal: (animal: IAnimal) => void
    updateAnimal: (params: { animal: IAnimal, id?: string }) => void
}


export class AnimalsListPage extends React.Component<AnimalsListPageProps>{
    public toPage: number = 1;
    public sizeAnimalToPage:number = 10;
    constructor(props:AnimalsListPageProps){
        super(props);
        this.state={
        }
    }
    updateAnimalCard(id:any){
        this.props.fetchAnimalItem(id);
        const stateItem=store.getState();
        if(stateItem.animalItem.data.name){
            this.props.history.push(`/admin/animals-list/${id}`);
        }
    }

    componentDidMount(){
        this.props.fetchAnimalsRequest({
            page: this.props.match.params.page,
            size: this.sizeAnimalToPage,
        });
    }

    addAnimalSubmit(e:any){
        this.props.clearFetchAnimalItem();
        this.props.history.push(`/admin/animals-list/animal`)
    }

    goToPagination(toPage:string| number){
        this.toPage =+toPage;
        this.props.fetchAnimalsRequest({
             page: this.toPage,
             size: this.sizeAnimalToPage,
         })
         this.props.history.push({
             pathname: `/admin/animals-list/page/${this.toPage}`,
             state: this.state
         })
    }

    countAgeAnimal(date:any){
        const animalDate=moment(date);
        const today=moment();
        const year = animalDate.diff(today,'years');
        const month = animalDate.diff(today,'month');
        if(year < 0){
            const restMonth = month-(year*12);
            return restMonth!==0? `${-year}рокiв ${-restMonth}мiс`:`${-year}рокiв`;
        }
        return `${-(month-(year*12))}мiс`;
    }
    render(){
        return(
            <>
            <div className='boxAdmin'>
                <AdminMenu
                    selectedKey={'animals-list'}
                    openKeys={['']}
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
                                <td>Вiк</td>
                                <td>Локація</td>
                                <td>Статус</td>
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
                                <td>{this.countAgeAnimal(animal.birthday)}</td>
                                <td>Локація</td>
                                <td>Статус</td>
                                <td><button onClick={()=>this.updateAnimalCard(animal.id)}></button></td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                    <BtnPagination
                    setProps={this.props}
                    pageCount={this.props.animalsList.pageCount}
                    goToPagination={this.goToPagination.bind(this)}/>
                </div>
            </div>
            </>
        )
    }
}