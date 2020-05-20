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
import {ImageTabContent} from "./ImageTabContent";
import {ITag} from '../../../../api/tags';
import {AnimalForm} from './AnimalForm';

const {TabPane} = Tabs;

interface IOwnPropTypes extends RouteComponentProps<any> {
  animal: IAnimal;
  tagsList: { [key: string]: Array<ITag> };
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

  constructor(props: IPropTypes) {
    super(props);
    this.state = { ...DEFAULT_ANIMAL };
  }

  componentDidMount() {
    const {match: {params: {id}}} = this.props;
    this.props.fetchAnimalItem(String(id));
  }

  componentDidUpdate(prevProps: Readonly<IPropTypes>) {
    const newState = {...DEFAULT_ANIMAL};
    const {animal} = this.props;
    if (!_.isEqual(prevProps, this.props)) {
      for (let key in animal) {
        if (key === 'locationType') {
          continue;
        }
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

  submit = () => {
    const animal = {...this.state as IAnimal}
    delete animal.locationType;
    this.props.updateAnimal({animal, id: this.state.id})
  }
  delete = () => {
    this.props.deleteAnimal(this.state.id || '')
  }

  post = () => {
    const animal = {...this.state as IAnimal}
    delete animal.locationType;
    this.props.postAnimal(animal)
    this.setState({...DEFAULT_ANIMAL})
  }

  onSave = () => {
    const {match: {params: {id}}} = this.props;
    if (id) {
      this.submit();
    } else {
      this.post();
    }
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

  onDeleteUploadedImage = (id: string) => {
    this.setState({
      imageIds: this.state.imageIds.filter(imageId => imageId !== id)
    })
  }

  onDeleteNewImage = (id: string) => {
    this.setState({
      images: this.state.images.filter((image: any) => image.lastModified !== Number(id))
    })
  }

  render() {
    const {
     description, character, bannerText, isDonationActive, imageIds, tags, id
    } = this.state
    if (this.props.status === ERequestStatus.REQUEST) {
      return <Loader/>
    }
    return (
      <>
        <div className="data-edit">
          <AnimalForm
            {...this.state}
            availableStatuses={this.props.tagsList.status}
            onChange={this.changeValue}
          />
          <p>id {id}</p>
        </div>
        <div className="tabs-edit">
          <Tabs
            defaultActiveKey={this.currentTab}
            onChange={(key: string) => this.currentTab = key}
          >
            <TabPane tab="Зображення" key="1">
              <ImageTabContent
                onDeleteImage={this.onDeleteUploadedImage}
                onDeleteNewImage={this.onDeleteNewImage}
                uploadedImageIds={imageIds}
                addImage={this.addImage}
                animalId={id}
                baseUrl={this.baseUrl}
                newImages={this.state.images}
              />
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
            onClick={this.onSave}
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
