import React from "react";
import {DEFAULT_ANIMAL, IAnimal} from "../../../../api/animals";
import '../style/animalEditCard.scss'
import { store } from "../../../../store";
import { selectApiUrl } from "../../../../store/selectors/config.selector";
import {Tabs} from "antd";
import {Button, ButtonTypes} from "../../../../components/Button";
const { TabPane } = Tabs;


interface IAnimalCardProps {
    animal: IAnimal,
    deleteAnimal: (id: string) => void
    postAnimal: (animal: IAnimal) => void
    updateAnimal: (params: { animal: IAnimal, id?: string }) => void
}
interface IAnimalCardPropsDescription {
    lang: string,
    value: string
}
interface IAvailableStatuses {
    id: string,
    values: IAnimalCardPropsDescription[]
}

export class AnimalEditCard extends React.Component<IAnimalCardProps> {
    public baseUrl: string = '';
    public state: IAnimal;
    public availableStatuses: IAvailableStatuses[] = [
        {
            id: '1as',
            values: [
                {
                    lang: 'ua',
                    value: 'Лікування'
                }, {
                    lang: 'en',
                    value: 'Treatment'
                }
            ]
        }, {
            id: '2as',
            values: [
                {
                    lang: 'ua',
                    value: 'На соціалізації'
                }, {
                    lang: 'en',
                    value: 'On socialization'
                }
            ]
        }
    ];
    constructor(props: IAnimalCardProps) {
        super(props);
        this.state = {
            number: props.animal.number,
            name: props.animal.name || '',
            kindOfAnimal: props.animal.kindOfAnimal || '',
            gender: props.animal.gender || '',
            description: props.animal.description || '',
            age: props.animal.age,
            imageIds: props.animal.imageIds,
            tags: props.animal.tags || '',
            character: props.animal.character || '',
            status: props.animal.status || '',
            bannerText: props.animal.bannerText || '',
            isDonationActive: props.animal.isDonationActive || false,
            birthday: props.animal.birthday || '',
            coverImage: props.animal.coverImage,
            id: props.animal.id,
            images: [],
        }
    }
    componentWillMount() {
      this.baseUrl = selectApiUrl(store.getState());
    }

    changeValue = (e: any, key: any) => {
        this.setState({[key]: e.target.value})
    };

    compileDate(targetDate: any, period: string): string {
        let result: any;
        const dateDelta = new Date().getTime() - new Date(targetDate).getTime();

        switch (period) {
            case 'year':
                result = Math.floor(dateDelta / 31536000000);
                break;
            case 'month':
                result = Math.floor(new Date(dateDelta % 31536000000).getMonth());
                break;
            case 'week':
                result = '0';
                break;
            default:
                result = '0';
        }
        return isNaN(result) ? '0' : result.toString();
    }

    addImage = (e: any) => {
        this.setState({images: [...this.state.images, ...e.target.files]})
    }

    renderImgs = (imageIds: string[]) => imageIds.map(imageId => 
        <img key={imageId} style={{width: 100, height: 100}}
        src={`${this.baseUrl}documents/${imageId}/type/small`} />)

    submit = () => {
        const animal = {...this.state as IAnimal}
        this.props.updateAnimal({animal, id: this.state.id})
    }
    delete = () => {
        this.props.deleteAnimal(this.state.id || '')
    }
    post = () => {
        const animal = {...this.state as IAnimal}
        this.props.postAnimal(animal)
        this.setState({...DEFAULT_ANIMAL})
    }

    renderFileNames() {
        return this.state.images.map((image: File, i: number) => <div key={image.name + i}>File
            #{i + 1} {image.name}</div>)
    }

    render() {
        const {
            number, name, kindOfAnimal, gender, description, character, status, bannerText, isDonationActive, coverImage, birthday, age, imageIds, tags, id
        } = this.state;
        return (
            <div>
                <div className="data-edit">
                    <div className="form-row small-row">
                        <label>Номер</label>
                        <input disabled value={number} onChange={(e) => this.changeValue(e, 'number')} />
                    </div>
                    <div className="form-row small-row">
                        <label>Статус</label>
                        <select>
                            {this.availableStatuses.map(stat => {
                                return (
                                    <option key={stat.id}
                                            selected={status && status.values[0].value === stat.values[0].value}>
                                        {stat.values[0].value || 'Unknown'}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <div className="form-row small-row">
                        <label>Кличка</label>
                        <input value={name} onChange={(e) => this.changeValue(e, 'name')} />
                    </div>
                    <div className="form-row small-row">
                        <label>Вид</label>
                        <input value={kindOfAnimal}
                               onChange={(e) => this.changeValue(e, 'kindOfAnimal')} />
                    </div>
                    <div className="form-row small-row">
                        <label>Стать</label>
                        <input value={gender} onChange={(e) => this.changeValue(e, 'gender')} />
                    </div>
                    <div className="form-row small-row">
                        <label>age</label>
                        <input value={age} onChange={(e) => this.changeValue(e, 'age')} />
                    </div>
                    <div className="form-row small-row">
                        {/* <input value={birthday} onChange={(e) => this.changeValue(e, 'birthday')} /> */}

                        <div className="form-cols-group">
                            <div className="form-col">
                                <label htmlFor="birthday-weeks">Неділя</label>
                                <select id="birthday-weeks">
                                    <option>{this.compileDate(birthday, 'week')}</option>
                                </select>
                            </div>
                            <div className="form-col">
                                <label htmlFor="birthday-months">Місяць</label>
                                <select id="birthday-months">
                                    <option>{this.compileDate(birthday, 'month')}</option>
                                </select>
                            </div>
                            <div className="form-col">
                                <label htmlFor="birthday-years">Рік</label>
                                <select id="birthday-years">
                                    <option>{this.compileDate(birthday, 'year')}</option>
                                </select>
                            </div>
                        </div>


                    </div>
                    <div className="form-row small-row">
                        <label>tags</label>
                        <input value={tags} onChange={(e) => this.changeValue(e, 'tags')} />
                    </div>
                    <div>id {id}</div>
                </div>
                <div className="tabs-edit">
                  <Tabs defaultActiveKey="1">
                      <TabPane tab="Зображення" key="1">
                          <p>
                              <span>Головне зображення</span><br />
                              {this.renderImgs(imageIds)}
                          </p>
                          <p>
                              <span>Додаткові зображення</span>
                              <input value={coverImage} onChange={(e) => this.changeValue(e, 'coverImage')} /></p>
                          <p>
                              {!!this.state.images.length && this.renderFileNames()}
                              <div className={'add-button'}>
                                  <input type={'file'} id={id || 'newFile'} onChange={(e) => this.addImage(e)}
                                         className={"add-button hidden"} />
                                  <label htmlFor={id || 'newFile'} className={'add-button button'}>Add file</label>
                              </div>
                          </p>
                      </TabPane>
                      <TabPane tab="Здоров’я" key="2">
                          <ul>
                              <li><label><span>Вiдкрити Cбір коштів</span><input type="checkbox" onChange={(e) => this.changeValue(e, 'isDonationActive')} /><span>{isDonationActive}</span></label></li>
                              {!!this.state.isDonationActive && (
                                <li>
                                    <label><span>Текст на банері</span></label><br />
                                    <input value={bannerText} onChange={(e) => this.changeValue(e, 'bannerText')} />
                                </li>
                              )}
                              <li><label><span>Стерилізован</span><input type="checkbox"/><span>checkbox</span></label></li>
                              <li><label><span>Щеплен</span><input type="checkbox"/><span>checkbox</span></label></li>
                              <li><label><span>Готов до виїзду за кордон</span><input type="checkbox"/><span>checkbox</span></label></li>
                          </ul>
                          <Button
                              styleType={ButtonTypes.Blue}>
                              Зберегти зміни
                          </Button>
                      </TabPane>
                      <TabPane tab="Опис" key="3">
                          <label>Трохи історії</label>
                          <textarea value={description} onChange={(e) => this.changeValue(e, 'description')} />
                          <label>Характер</label>
                          <textarea value={character} onChange={(e) => this.changeValue(e, 'character')} />
                      </TabPane>
                      <TabPane tab="Історія змін" key="4">
                          Content of Tab Pane 3
                      </TabPane>
                  </Tabs>
              </div>
            </div>
        );
    }
}
