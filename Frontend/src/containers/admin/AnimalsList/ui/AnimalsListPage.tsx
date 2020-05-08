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
        // this.props.fetchAnimalItem(id);
        // const stateItem=store.getState();
        // if(stateItem.animalItem.data.name){
        //
        // }
        this.props.history.push(`/admin/animals-list/${id}`);
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
                <main>
                    <div className="container">
                        <section className="section-animals section-margin">
                            <header>
                                <h3>Тварини</h3>
                                <Button
                                    onClick={(e) => this.addAnimalSubmit(e)}
                                    styleType={ButtonTypes.Blue}>
                                    Додати тварину
                                </Button>
                                <form className="search-animals" action="#">
                                    <input type="search" placeholder="Пошук"/>
                                    <button type="submit" className="icon-search">Summit</button>
                                </form>
                            </header>
                            <section className="page-content">
                                <div className="inner">
                                    <section className='section-table animals-table'>
                                        <header>
                                            <div className="row">
                                                <div className="col col-image">Фото</div>
                                                <div className="col col-name">Кличка</div>
                                                <div className="col col-type">Вид</div>
                                                <div className="col col-gender">Стать</div>
                                                <div className="col col-age">Вiк</div>
                                                <div className="col col-location">Локація</div>
                                                <div className="col col-status">Статус</div>
                                                <div className="col col-btn">Edit</div>
                                            </div>
                                        </header>
                                        <div className="a-list">
                                            {this.props.animalsList.data.length && this.props.animalsList.data.map((animal)=>
                                            <div className="a-item" key={animal.id}>
                                                <div className="row">
                                                    <div className="col col-image">
                                                        <div className="visual"
                                                             style={{
                                                                 backgroundSize:'cover',
                                                                 backgroundImage: `url(${animal.imageIds[0] ? `${this.props.baseUrl}documents/${animal.imageIds[0]}/type/small` : `${noPhotoImage}`})` }}
                                                        ></div>
                                                    </div>
                                                    <div className="col col-name">
                                                        <span className="name">{animal.name}</span><br />
                                                        <span className="num">номер <span>{animal.number}</span></span>
                                                        <div className="add-info">
                                                            <span>{animal.kindOfAnimal}, {animal.gender}, {this.countAgeAnimal(animal.birthday)}</span>
                                                        </div>
                                                    </div>
                                                    <div className="col col-type">{animal.kindOfAnimal}</div>
                                                    <div className="col col-gender">{animal.gender}</div>
                                                    <div className="col col-age">{this.countAgeAnimal(animal.birthday)}</div>
                                                    <div className="col col-location">Локація</div>
                                                    <div className="col col-status"><span>Статус</span></div>
                                                    <div className="col col-btn"><i onClick={()=>this.updateAnimalCard(animal.id)} className="icon-edit">Edit</i></div>
                                                </div>
                                            </div>
                                            )}
                                        </div>
                                    </section>
                                    <BtnPagination
                                        setProps={this.props}
                                        pageCount={this.props.animalsList.pageCount}
                                        goToPagination={this.goToPagination.bind(this)}/>
                                </div>
                            </section>
                        </section>
                    </div>
                </main>

            </div>
            </>
        )
    }
}
