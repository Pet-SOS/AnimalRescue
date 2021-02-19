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
import SearchPanel from './SearchPanel';
import { RequestFilterOperators } from '../../../../api/requestOptions/index';

interface AnimalsListPageProps {
  match: any;
  baseUrl: string;
  history: any;
  location: any;
  animalsList: IAnimalsResponse;
  locations: ILocationsResponse;
  fetchAnimalsRequest: (params?: IRequestParams) => void;
  fetchLocations: (params?: IRequestParams) => void;
  fetchAnimalItem: (id: string) => any;
  clearFetchAnimalItem: () => void;
  postAnimal: (animal: IAnimal) => void;
  updateAnimal: (params: { animal: IAnimal; id?: string }) => void;
}

export class AnimalsListPage extends React.Component<AnimalsListPageProps> {
  public toPage: number = 1;
  public sizeAnimalToPage: number = 10;
  state = {
    searchStr: '',
  };
  updateAnimalCard(id: any) {
    this.props.history.push(`/admin/animals-list/${id}`);
  }

  componentDidMount() {
    this.props.fetchAnimalsRequest({
      page: this.props.match.params.page,
      size: this.sizeAnimalToPage,
    });
    this.props.fetchLocations();
  }

  addAnimalSubmit(e: any) {
    this.props.clearFetchAnimalItem();
    this.props.history.push(`/admin/animals-list/animal`);
  }

  goToPagination(toPage: string | number) {
    const { searchStr } = this.state;
    this.toPage = +toPage;
    this.props.fetchAnimalsRequest({
      page: this.toPage,
      size: this.sizeAnimalToPage,
      filter: {
        fieldName: 'name',
        operator: RequestFilterOperators.CONTAINS,
        value: searchStr,
      },
    });
    this.props.history.push({
      pathname: `/admin/animals-list/page/${this.toPage}`,
      state: this.state,
    });
  }

  renderAnimalImage = (animal: IAnimal) => {
    const coverImageId = animal.coverImage ? animal.coverImage : 0;
    const coverImage = animal.imageIds[coverImageId];
    return (
      <div
        className="visual"
        style={{
          backgroundSize: 'cover',
          backgroundImage: `url(${
            coverImage
              ? `${this.props.baseUrl}documents/${coverImage}/type/small`
              : `${noPhotoImage}`
          })`,
        }}
      />
    );
  };

  renderLocationTitle = (id: string) => {
    return (
      <div>
        {this.props.locations?.data?.length &&
          this.props.locations?.data
            ?.filter(l => l.id === id)
            .map(loc => <span key={loc.id}>{loc.title}</span>)}
      </div>
    );
  };

  onSearchChange = (searchStr: string) => {
    this.setState({ searchStr });
    this.toPage = 1;
    this.props.fetchAnimalsRequest({
      page: this.toPage,
      size: this.sizeAnimalToPage,
      filter: {
        fieldName: 'name',
        operator: RequestFilterOperators.CONTAINS,
        value: searchStr,
      },
    });
  };

  render() {
    return (
      <>
        <div className="boxAdmin">
          <AdminMenu selectedKey={'animals-list'} openKeys={[]} />
          <main>
            <div className="container">
              <section className="section-animals section-margin">
                <header>
                  <h3>Тварини</h3>
                  <Button
                    onClick={e => this.addAnimalSubmit(e)}
                    styleType={ButtonTypes.Blue}
                  >
                    Додати тварину
                  </Button>
                  <SearchPanel onSearchChange={this.onSearchChange} />
                </header>
                <section className="page-content">
                  <div className="inner">
                    <div className="section-table-wrapper">
                      <section className="section-table animals-table">
                        <header className="phone-hidden">
                          <div className="row">
                            <div className="col col-image">Фото</div>
                            <div className="col col-name">Кличка</div>
                            <div className="col col-type phone-hidden">Вид</div>
                            <div className="col col-gender phone-hidden">
                              Стать
                            </div>
                            <div className="col col-age phone-hidden">Вiк</div>
                            <div className="col col-location phone-hidden">
                              Локація
                            </div>
                            <div className="col col-status">Статус</div>
                            <div className="col col-edit">&nbsp;</div>
                          </div>
                        </header>
                        {this.props.animalsList.data.length &&
                          this.props.animalsList.data.map(animal => (
                            <div className="row" key={animal.id}>
                              <div className="col col-image">
                                {this.renderAnimalImage(animal)}
                              </div>
                              <div className="col col-name">
                                <span className="name">{animal.name}</span>
                                <br />
                                <span className="num">
                                  номер <span>{animal.number}</span>
                                </span>
                                <div className="add-info">
                                  <span>
                                    {!!animal.kindOfAnimal && (
                                      <span className="kindOfAnimal">
                                        <TagTranslation
                                          tagId={animal.kindOfAnimal}
                                        />
                                        ,{' '}
                                      </span>
                                    )}
                                    {!!animal.gender && (
                                      <span className="gender">
                                        <TagTranslation tagId={animal.gender} />
                                        ,{' '}
                                      </span>
                                    )}
                                    <Age birthday={animal.birthday} />
                                  </span>
                                </div>
                              </div>
                              <div className="col col-type phone-hidden">
                                {!!animal.kindOfAnimal && (
                                  <TagTranslation tagId={animal.kindOfAnimal} />
                                )}
                              </div>
                              <div className="col col-gender phone-hidden">
                                {!!animal.gender && (
                                  <TagTranslation tagId={animal.gender} />
                                )}
                              </div>
                              <div className="col col-age phone-hidden">
                                <Age birthday={animal.birthday} />
                              </div>
                              <div className="col col-location phone-hidden">
                                <div className="LocationType">
                                  {!!animal.locationName &&
                                    animal.locationName !== 'null' && (
                                      <TagTranslation
                                        tagId={animal.locationName}
                                      />
                                    )}
                                </div>
                                <div className="LocationTitle">
                                  {!!animal.locationTypeId &&
                                    this.renderLocationTitle(
                                      animal.locationTypeId,
                                    )}
                                </div>
                              </div>
                              <div className="col col-status">
                                {!!animal.status && !!animal.status && (
                                  <div
                                    className={`status-color-${animal.status.toLowerCase()}`}
                                  >
                                    <TagTranslation tagId={animal.status} />
                                  </div>
                                )}
                              </div>
                              <div className="col col-icon">
                                <i
                                  onClick={() =>
                                    this.updateAnimalCard(animal.id)
                                  }
                                  className="icon-edit"
                                ></i>
                              </div>
                            </div>
                          ))}
                      </section>
                    </div>
                    <BtnPagination
                      setProps={this.props}
                      pageCount={this.props.animalsList.pageCount}
                      goToPagination={this.goToPagination.bind(this)}
                    />
                  </div>
                </section>
              </section>
            </div>
          </main>
        </div>
      </>
    );
  }
}
