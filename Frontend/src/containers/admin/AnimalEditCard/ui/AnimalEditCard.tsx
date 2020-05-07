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

const {TabPane} = Tabs;

interface IOwnPropTypes extends RouteComponentProps<any> {
  animal: IAnimal;
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

  constructor(props: IPropTypes) {
    super(props);
    this.state = DEFAULT_ANIMAL;
  }

  componentDidMount() {
    const {match: {params: {id}}} = this.props;
    this.props.fetchAnimalItem(String(id));
  }

  componentDidUpdate(prevProps: Readonly<IPropTypes>) {
    const newState = {
      ...DEFAULT_ANIMAL
    };
    Object.keys(this.props.animal).forEach((key: string) => {
      // @ts-ignore
      if (key in newState && this.props.animal[key]) {
        // @ts-ignore
        newState[key] = this.props.animal[key];
      }
    });
    if (!_.isEqual(this.state, newState)) {
      this.setState(newState)
    }
  }

  componentWillMount() {
    this.baseUrl = selectApiUrl(store.getState());
  }

  changeValue = (e: any, key: any) => {
    this.setState({[key]: e.target.value})
  };

  onChangeTagList = (tags: string[]) => {
    this.setState({tags});
  }

  addImage = (e: any) => {
    this.setState({images: [...this.state.images, ...e.target.files]})
  }

  renderImgs = (imageIds: string[]) => imageIds.map(imageId =>
    <img key={imageId} style={{width: 100, height: 100}}
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

  onUpdateHealthInfo = (
    tags: string[],
    isDonationActive: boolean,
    bannerText: string
  ) => {
    const animal = {...this.state as IAnimal}
    const updaedAnimal = {...animal, tags, isDonationActive, bannerText};
    this.props.updateAnimal({animal: updaedAnimal, id: this.state.id})
  }

  render() {
    const {
      number, name, kindOfAnimal, gender, description, character, status, bannerText, isDonationActive, coverImage, birthday, age, imageIds, tags, id
    } = this.state
    if (this.props.status === ERequestStatus.REQUEST) {
      return <Loader/>
    }
    return (
      <>
        <div className="data-edit">
          <p>
            <label>Номер</label><br/>
            <input disabled value={number} onChange={(e) => this.changeValue(e, 'number')}/></p>
          <p>
            <label>Кличка</label><br/>
            <input value={name} onChange={(e) => this.changeValue(e, 'name')}/></p>
          <p>
            <label>Вид</label><br/>
            <input value={kindOfAnimal}
                   onChange={(e) => this.changeValue(e, 'kindOfAnimal')}/></p>
          <p>
            <label>Стать</label><br/>
            <input value={gender} onChange={(e) => this.changeValue(e, 'gender')}/></p>
          <p>
            <label>age</label><br/>
            <input value={age} onChange={(e) => this.changeValue(e, 'age')}/></p>
          <p>
            <label>birthday</label><br/>
            <input value={birthday} onChange={(e) => this.changeValue(e, 'birthday')}/></p>
          <p>
            <label>tags</label><br/>
            <input value={tags} onChange={(e) => this.changeValue(e, 'tags')}/></p>
          <p>id {id}</p>
        </div>
        <div className="tabs-edit">
          <Tabs defaultActiveKey="1">
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
                onChangeTagList={this.onChangeTagList}
                donationActive={isDonationActive}
                tags={tags}
                bannerText={bannerText}
                onChange={this.changeValue}
                onUpdateHealthInfo={this.onUpdateHealthInfo}
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
        </div>

      </>)
  }
}

export default withRouter(connect((state: ICustomAppState, ownProps: IOwnPropTypes) => {
  return {
    status: state.animalItem.requestState.status,
    ...ownProps
  }
})(AnimalEditCard));
