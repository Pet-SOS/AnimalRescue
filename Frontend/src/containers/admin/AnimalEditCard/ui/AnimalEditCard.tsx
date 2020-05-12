import React from "react";
import {DEFAULT_ANIMAL, IAnimal} from "../../../../api/animals";
import '../style/animalEditCard.scss'
import { store } from "../../../../store";
import { selectApiUrl } from "../../../../store/selectors/config.selector";
import {Tabs} from "antd";
import {Button, ButtonTypes} from "../../../../components/Button";
import { ITag } from '../../../../api/tags';
import { DateParser } from './DateParser';
const { TabPane } = Tabs;

interface IAnimalCardProps {
    animal: IAnimal;
    tagsList: ITag[];
    deleteAnimal: (id: string) => void;
    postAnimal: (animal: IAnimal) => void;
    updateAnimal: (params: { animal: IAnimal, id?: string }) => void;
}

export class AnimalEditCard extends React.Component<IAnimalCardProps> {
    public baseUrl: string = '';
    public state: IAnimal;
    public currentLang: string = localStorage.getItem('appLanguage') || 'ua';

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
            availableStatuses: props.tagsList.filter(tag => tag.category === 'status') || []
        }
        this.handleDateChange = this.handleDateChange.bind(this);
    }

    findLocaleStatusValue(status: ITag): string {
        const resultStatus = status.values.filter(val => val.lang === this.currentLang);
        return resultStatus.length ? resultStatus[0].value : '';
    }
    componentWillMount() {
      this.baseUrl = selectApiUrl(store.getState());
    }

    changeValue = (e: any, key: any) => {
        this.setState({[key]: e.target.value});
    };

    addImage = (e: any) => {
        this.setState({images: [...this.state.images, ...e.target.files]})
    }

    renderImgs = (imageIds: string[]) => imageIds.map(imageId => 
        <img key={imageId} style={{width: 100, height: 100}} alt="description"
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

    handleDateChange(date: string) {
        this.setState({date: date});
    }

    render() {
        const {
            availableStatuses, number, name, kindOfAnimal, gender, description, character, status, bannerText, isDonationActive, coverImage, birthday, age, imageIds, tags, id
        } = this.state;
        return (
            <div>
                <div className="data-edit">
                    <div className="form-row small-row">
                        <label htmlFor="acard-number">Номер</label>
                        <input id="acard-number" disabled value={number} />
                    </div>
                    <div className="form-row small-row">
                        <label htmlFor="acard-status">Статус</label>
                        <select id="acard-status" onChange={(e) => this.changeValue(e, 'status')}>
                            <option className="default-val">&ndash;</option>
                            {availableStatuses ? availableStatuses.map(stat => {
                                return (
                                    <option key={stat.id}
                                            selected={this.findLocaleStatusValue(stat) === status ? true : false}>
                                        {this.findLocaleStatusValue(stat) || 'Unknown'}
                                    </option>
                                );
                            }) : null}
                        </select>
                    </div>
                    <div className="form-row small-row">
                        <label htmlFor="acard-name">Кличка</label>
                        <input id="acard-name" value={name} onChange={(e) => this.changeValue(e, 'name')} />
                    </div>
                    <div className="form-row small-row">
                        <label htmlFor="acard-kind">Вид</label>
                        <input id="acard-kind" value={kindOfAnimal}
                               onChange={(e) => this.changeValue(e, 'kindOfAnimal')} />
                    </div>
                    <div className="form-row small-row">
                        <label htmlFor="acard-gender">Стать</label>
                        <input id="acard-gender" value={gender} onChange={(e) => this.changeValue(e, 'gender')} />
                    </div>
                    <div className="form-row small-row">
                        <label htmlFor="acard-age">age</label>
                        <input id="acard-age" value={age} onChange={(e) => this.changeValue(e, 'age')} />
                    </div>
                    <div className="form-row small-row">
                        <DateParser date={birthday} onDateChange={this.handleDateChange} />
                    </div>
                    <div className="form-row small-row">
                        <label htmlFor="acard-tags">tags</label>
                        <input id="acard-tags" value={tags} onChange={(e) => this.changeValue(e, 'tags')} />
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
                                    <label htmlFor="acard-banner-text"><span>Текст на банері</span></label><br />
                                    <input id="acard-banner-text" value={bannerText} onChange={(e) => this.changeValue(e, 'bannerText')} />
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
                          <label htmlFor="acard-description">Трохи історії</label>
                          <textarea id="acard-description" value={description} onChange={(e) => this.changeValue(e, 'description')} />
                          <label htmlFor="acard-character">Характер</label>
                          <textarea id="acard-character" value={character} onChange={(e) => this.changeValue(e, 'character')} />
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
