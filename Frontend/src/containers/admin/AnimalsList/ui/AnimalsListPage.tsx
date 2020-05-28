import React from 'react';
import { IAnimalsResponse, IAnimal } from '../../../../api/animals';
import { AdminMenu } from '../../AdminMenu';
import { Input } from 'antd';
import { Button, ButtonTypes } from '../../../../components/Button';
import '../style/animalListPage.scss';
import noPhotoImage from './../../../../img/nophoto.jpg';
import { BtnPagination } from '../../../client/Blog/ui/BtnPagination';
import { IRequestParams } from '../../../../api/requestOptions';
import { TagTranslation } from '../../../../components/TagTranslation';
import { Age } from '../../../../components/Age';
import { ILocationsResponse } from '../../../../api/admin/locations';

const { Search } = Input;

interface AnimalsListPageProps {
    match:any;
    baseUrl:string;
    history: any;
    location:any;
    animalsList: IAnimalsResponse;
    locations: ILocationsResponse;
    fetchAnimalsRequest: (params?: IRequestParams) => void;
    fetchLocations: (params?: IRequestParams) => void;
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
        this.props.history.push(`/admin/animals-list/${id}`);
    }

    componentDidMount(){
        this.props.fetchAnimalsRequest({
            page: this.props.match.params.page,
            size: this.sizeAnimalToPage,
        });
        this.props.fetchLocations();
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

    renderAnimalImage = (animal: IAnimal) => {
        const coverImageId = animal.coverImage ? animal.coverImage : 0;
        const coverImage = animal.imageIds[coverImageId];
        return (
          <div className="visual"
            style={{
               backgroundSize:'cover',
                   backgroundImage: `url(${coverImage ? `${this.props.baseUrl}documents/${coverImage}/type/small` : `${noPhotoImage}`})` }}
          />
        )
    }

    renderLocationTitle = (id: string) => {
        return (
            <div>
                {this.props.locations?.data?.length && this.props.locations?.data?.filter((l) => l.id === id).map((loc) =>   
                    <span key={loc.id}>{loc.title}</span>
                    )}
            </div>
        ); 
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
                                                        {this.renderAnimalImage(animal)}
                                                    </div>
                                                    <div className="col col-name">
                                                        <span className="name">{animal.name}</span><br />
                                                        <span className="num">номер <span>{animal.number}</span></span>
                                                        <div className="add-info">
                                                            <span>
                                                                {!!animal.kindOfAnimal && (
                                                                    <span className='kindOfAnimal'><TagTranslation tagId={animal.kindOfAnimal} />, </span>
                                                                )}
                                                                {!!animal.gender && (
                                                                    <span className='gender'><TagTranslation tagId={animal.gender} />, </span>
                                                                )}
                                                                <Age birthday={animal.birthday} />
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="col col-type">
                                                        {!!animal.kindOfAnimal && (
                                                            <TagTranslation tagId={animal.kindOfAnimal} />
                                                        )}
                                                    </div>
                                                    <div className="col col-gender">
                                                        {!!animal.gender && (
                                                            <TagTranslation tagId={animal.gender} />
                                                        )}
                                                    </div>
                                                    <div className="col col-age"><Age birthday={animal.birthday} /></div>
                                                    <div className="col col-location">
                                                        <div className="LocationType">
                                                            {!!animal.locationName && animal.locationName !=='null' &&(
                                                                <TagTranslation tagId={animal.locationName} />
                                                            )}
                                                        </div>
                                                        <div className="LocationTitle">
                                                            {!!animal.locationTypeId && (
                                                                this.renderLocationTitle(animal.locationTypeId)
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="col col-status">
                                                        {!!animal.status && !!animal.status.id && (
                                                            <div className={`status-color-${animal.status.id.toLowerCase()}`}>
                                                                <TagTranslation tagId={animal.status.id} />
                                                            </div>
                                                        )}
                                                    </div>
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
