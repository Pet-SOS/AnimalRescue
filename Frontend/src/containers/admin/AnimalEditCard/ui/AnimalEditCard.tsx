import React from "react";
import {DEFAULT_ANIMAL, IAnimal} from "../../../../api/animals";
import '../style/animalEditCard.scss'
import {store} from "../../../../store";
import {selectApiUrl} from "../../../../store/selectors/config.selector";
import {Tabs} from "antd";
import {HealthTabContent} from "./HealthTabContent";
import {RouteComponentProps, withRouter} from "react-router";
import _ from "lodash";
import {connect} from "react-redux";
import {ICustomAppState} from "../../../../store/state";
import {Loader} from "../../../../components/Loader";
import {ERequestStatus} from "../../../../api";
import {Button, ButtonTypes} from "../../../../components/Button";
import { ITag } from '../../../../api/tags';
import { DateParser } from './DateParser';

const {TabPane} = Tabs;

interface IOwnPropTypes extends RouteComponentProps<any> {
  animal: IAnimal;
  tagsList: ITag[];
  deleteAnimal: (id: string) => void;
  postAnimal: (animal: IAnimal) => void;
  updateAnimal: (params: { animal: IAnimal, id?: string }) => void;
  fetchAnimalItem: (id: string) => any;
}

interface IPropTypes extends IOwnPropTypes {
  status: ERequestStatus;
}

class AnimalEditCard extends React.Component<IPropTypes> {
  public baseUrl: string = '';
  public state: IAnimal;
  public currentTab: string = '1';
  public currentLang: string = localStorage.getItem('appLanguage') || 'ua';

  constructor(props: IPropTypes) {
    super(props);
    this.state = {
      ...DEFAULT_ANIMAL,
      availableStatuses: props.tagsList.filter(tag => tag.category === 'status') || []
    };
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  findLocaleStatusValue(status: ITag): string {
      const resultStatus = status.values.filter(val => val.lang === this.currentLang);
      return resultStatus.length ? resultStatus[0].value : '';
  }

  componentDidMount() {
    const {match: {params: {id}}} = this.props;
    this.props.fetchAnimalItem(String(id));
  }

  componentDidUpdate(prevProps: Readonly<IPropTypes>) {
    const newState = {...DEFAULT_ANIMAL};
    const { animal } = this.props;
    if (!_.isEqual(prevProps, this.props)) {
      for (let key in animal) {
        // @ts-ignore
        if (newState.hasOwnProperty(key) && animal[key]) {
          // @ts-ignore
          newState[key] = animal[key];
        }
      }
      this.setState(newState)
    }
  }

  componentWillMount() {
    this.baseUrl = selectApiUrl(store.getState());
  }

  changeValue = (e: any, key: any) => {
    this.setState({[key]: e.target.value})
  };

  addImage = (e: any) => {
    this.setState({images: [...this.state.images, ...e.target.files]})
  }

  renderImgs = (imageIds: string[]) => imageIds.map(imageId =>
    <img key={imageId} style={{width: 100, height: 100}} alt="description"
         src={`${this.baseUrl}documents/${imageId}/type/small`}/>)

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

  onUpdateTag = (tagName: string) => {
    const index = this.state.tags.indexOf(tagName);
    const isTagExist = index !== -1;
    const tags = this.state.tags.slice();
    if (isTagExist) {
      tags.splice(index, 1);
      this.setState({tags})
    } else {
      tags.push(tagName);
      this.setState({tags})
    }
  }

  onToggleDonation = () => {
    this.setState({
      isDonationActive: !this.state.isDonationActive
    })
  }

  handleDateChange(date: string) {
      this.setState({date: date});
  }

  render() {
    const {
      availableStatuses, number, name, kindOfAnimal, gender, description, character, status, bannerText, isDonationActive, coverImage, birthday, age, imageIds, tags, id
    } = this.state
    if (this.props.status === ERequestStatus.REQUEST) {
      return <Loader/>
    }
    return (
      <>
        <div className="data-edit">
          <div className="form-row small-row">
            <label htmlFor="acard-number">Номер</label>
            <input id="acard-number" disabled value={number} onChange={(e) => this.changeValue(e, 'number')}/>
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
            <input id="acard-name" value={name} onChange={(e) => this.changeValue(e, 'name')}/>
          </div>
          <div className="form-row small-row">
            <label htmlFor="acard-kind">Вид</label>
            <input id="acard-kind" value={kindOfAnimal}
                   onChange={(e) => this.changeValue(e, 'kindOfAnimal')}/>
                  </div>
          <div className="form-row small-row">
            <label htmlFor="acard-gender">Стать</label>
            <input id="acard-gender" value={gender} onChange={(e) => this.changeValue(e, 'gender')}/>
          </div>
          <div className="form-row small-row">
            <label htmlFor="acard-age">age</label>
            <input id="acard-age" value={age} onChange={(e) => this.changeValue(e, 'age')}/>
          </div>
          <div className="form-row small-row">
            <DateParser date={birthday} onDateChange={this.handleDateChange} />
          </div>
          <div className="form-row small-row">
            <label htmlFor="acard-tags">tags</label>
            <input id="acard-tags" value={tags} onChange={(e) => this.changeValue(e, 'tags')}/>
          </div>
          <p>id {id}</p>
        </div>
        <div className="tabs-edit">
          <Tabs
            defaultActiveKey={this.currentTab}
            onChange={(key: string) => this.currentTab = key}
          >
            <TabPane tab="Зображення" key="1">
              <p>
                <span>Головне зображення</span><br/>
                {this.renderImgs(imageIds)}
              </p>
              <p>
                <span>Додаткові зображення</span>
                <input value={coverImage} onChange={(e) => this.changeValue(e, 'coverImage')}/></p>
              <p>
                {!!this.state.images.length && this.renderFileNames()}
                <div className={'add-button'}>
                  <input type={'file'} id={id || 'newFile'} onChange={(e) => this.addImage(e)}
                         className={"add-button hidden"}/>
                  <label htmlFor={id || 'newFile'} className={'add-button button'}>Add file</label>
                </div>
              </p>
            </TabPane>
            <TabPane tab="Здоров’я" key="2">
              <HealthTabContent
                donationActive={isDonationActive}
                tags={tags}
                bannerText={bannerText}
                onChange={this.changeValue}
                onUpdateTag={this.onUpdateTag}
                onToggleDonation={this.onToggleDonation}
              />
            </TabPane>

            <TabPane tab="Опис" key="3">
              <label>Трохи історії</label>
              <textarea value={description} onChange={(e) => this.changeValue(e, 'description')}/>
              <label>Характер</label>
              <textarea value={character} onChange={(e) => this.changeValue(e, 'character')}/>
            </TabPane>
            <TabPane tab="Історія змін" key="4">
              Content of Tab Pane 3
            </TabPane>
          </Tabs>
          <Button
            onClick={this.submit}
            styleType={ButtonTypes.Blue}>
            Зберегти зміни
          </Button>
        </div>

      </>)
  }
}

export default withRouter(connect((state: ICustomAppState, ownProps: IOwnPropTypes) => {
  return {
    status: state.AdminHomePage.animalUpdateRequestState.status,
    ...ownProps
  }
})(AnimalEditCard));
