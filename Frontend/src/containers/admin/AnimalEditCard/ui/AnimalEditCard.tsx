import React from 'react';
import { DEFAULT_ANIMAL, EditableTags, IAnimal } from '../../../../api/animals';
import '../style/animalEditCard.scss';
import { store } from '../../../../store';
import { selectApiUrl } from '../../../../store/selectors/config.selector';
import { message, Tabs } from 'antd';
import { TI18n } from '../../../../i18n';
import { HealthTabContent } from './HealthTabContent';
import { RouteComponentProps, withRouter } from 'react-router';
import _ from 'lodash';
import { connect, Provider } from 'react-redux';
import { ICustomAppState } from '../../../../store/state';
import { Loader } from '../../../../components/Loader';
import { ERequestStatus, LocationsCode } from '../../../../api';
import { Button, ButtonTypes } from '../../../../components/Button';
import { ImageTabContent } from './ImageTabContent';
import { EKindOfAnimal, ITag } from '../../../../api/tags';
import { AnimalForm } from './AnimalForm';
import { actionAdminFetchLocationsRequest } from '../../Locations/store/actions';
import { bindActionCreators, Dispatch } from 'redux';
import { ILocationsMap } from '../../Locations/store/state';
import { selectTagsListData } from '../../../../store/selectors/tags.selector';
import { DescriptionTabContent } from './DescriptionTabContent';
import { AdoptiveParentTabContent } from './AdoptiveParentTabContent';

const { TabPane } = Tabs;

interface IOwnPropTypes extends RouteComponentProps<any> {
  animal: IAnimal;
  tagsList: { [key: string]: Array<ITag> };
  deleteAnimal: (id: string) => void;
  postAnimal: (animal: IAnimal) => void;
  updateAnimal: (params: { animal: IAnimal; id?: string }) => void;
  fetchAnimalItem: (id: string) => any;
  clearFetchAnimalItem: () => void;
}

interface IPropTypes extends IOwnPropTypes {
  status: ERequestStatus;
  locations: ILocationsMap;
  allTags: Array<ITag>;
  fetchLocationList: (type: LocationsCode) => any;
}

interface ITagsSizeAndBreed {
  tagSize: string;
  tagBreed: string;
}

class AnimalEditCard extends React.Component<IPropTypes> {
  public baseUrl: string = '';
  public state: IAnimal;
  public currentTab: string = '1';
  public tagsSizeAndBreed: ITagsSizeAndBreed | {} = {};

  constructor(props: IPropTypes) {
    super(props);
    this.state = { ...DEFAULT_ANIMAL };
  }

  componentDidMount() {
    const {
      match: {
        params: { id },
      },
      animal,
    } = this.props;
    if (id) {
      this.props.fetchAnimalItem(String(id));
      this.setState(animal);
    }
  }

  componentDidUpdate(
    prevProps: Readonly<IPropTypes>,
    prevState: Readonly<IAnimal>,
  ) {
    const newState = { ...DEFAULT_ANIMAL };
    const { animal, fetchLocationList } = this.props;
    const { animal: prevAnimal } = prevProps;
    if (!_.isEqual(prevAnimal, animal)) {
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
      this.setState(newState);
    }
    if (this.state.locationName !== prevState.locationName) {
      // @ts-ignore
      fetchLocationList(LocationsCode[this.state.locationName.toUpperCase()]);
    }
  }

  componentWillMount() {
    this.baseUrl = selectApiUrl(store.getState());
  }

  componentWillUnmount() {
    this.props.clearFetchAnimalItem();
  }

  onChangeSizeAndBreedTags = (e: any, key: any) => {
    // @ts-ignore
    this.tagsSizeAndBreed[key] = e.target.value;
    const mainTags = Object.keys(EditableTags).filter((defaultTagKey: any) => {
      return (
        // @ts-ignore
        this.state.tags.slice().indexOf(EditableTags[defaultTagKey]) !== -1
      );
    });
    if (this.state.kindOfAnimal !== EKindOfAnimal.dog) {
      // @ts-ignore
      this.tagsSizeAndBreed.tagSize = '';
    }
    // @ts-ignore
    const sizeAndBreedTags: string[] = [];
    Object.keys(this.tagsSizeAndBreed).map(tagKey => {
      // @ts-ignore
      if (this.tagsSizeAndBreed[tagKey] !== '') {
        // @ts-ignore
        sizeAndBreedTags.push(this.tagsSizeAndBreed[tagKey]);
      }
    });
    console.log(mainTags, sizeAndBreedTags);
    this.setState({
      tags: [...mainTags, ...sizeAndBreedTags],
      [key]: e.target.value,
    });
  };

  onChangeValue = (e: any, key: any) => {
    if (key === 'name') {
      const names = this.state.names.filter((n) => n.lang !== 'ua');
      this.setState({ names: [...names, {lang: 'ua', value: e.target.value}]});
    } else if (key === 'enName') {
      const names = this.state.names.filter((n) => n.lang !== 'en');
      this.setState({ names: [...names, {lang: 'en', value: e.target.value}]});
    } else if (key !== 'tagSize' && key !== 'tagBreed') {
      this.setState({ [key]: e.target.value });
    } else {
      this.onChangeSizeAndBreedTags(e, key);
    }
  };

  onChangeMultiLang = (value: string, key: string, lang: string) => {
    let elements = [];
    switch (key) {
      case 'description':
        elements = [...this.state.description];
        break;
      case 'character':
        elements = [...this.state.character];
        break;
      case 'bannerText':
        elements = [...this.state.bannerText];
        break;
      default:
        return;
    }
    const elementIndex = elements.findIndex(el => el.lang === lang);
    elements[elementIndex].value = value;
    this.setState({ [key]: elements });
  }

  onUpdateBirthday = (value: string) => {
    this.setState({
      birthday: value,
    });
  };

  addImage = (e: any) => {
    this.setState({ images: [...this.state.images, ...e.target.files] });
  };

  uploadFile = (e: any) => {
    this.setState({ adoptionContractFile: e.target.files[0] });
  };

  saveContractId = () => {
    this.setState({
      adoptionContractContractOldFileId: this.state.adoptionContractFileId,
    });
  }

  deleteContract = () => {
    this.setState({
      adoptionContractFileId: '',
      adoptionContractContractOldFileId: '',
    });
  }

  deleteNewContract = () => {
    this.setState({
      adoptionContractFile: {},
    });
  }

  showErrorMessage = () => {
    message.error({
      content: (
        <Provider store={store}>
          <TI18n
            keyStr="formValidationError"
            default="Будь ласка, заповніть всі обов'язкові поля"
          />
        </Provider>
      ),
    });
  }

  submit = () => {
    const animal = { ...(this.state as IAnimal) };
    if (!animal.status || !animal.locationTypeId || !animal.birthday || !animal.kindOfAnimal) {
      this.showErrorMessage();
    } else if (animal.status === 'ADOPTED' && (!animal.adoptiveName || !animal.adoptivePhone)) {
      this.showErrorMessage();
    } else {
      this.props.updateAnimal({ animal, id: this.state.id });
    }
  };

  delete = () => {
    this.props.deleteAnimal(this.state.id || '');
  };

  post = () => {
    const animal = { ...(this.state as IAnimal) };
    if (!animal.status || !animal.locationTypeId || !animal.birthday || !animal.kindOfAnimal) {
        this.showErrorMessage();
      } else if (animal.status === 'ADOPTED' && (!animal.adoptiveName || !animal.adoptivePhone)) {
        this.showErrorMessage();
      } else {
        this.props.postAnimal(animal);
        this.setState({ ...DEFAULT_ANIMAL });
        this.props.history.goBack();
      }
  };

  onSave = () => {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    if (id) {
      this.submit();
    } else {
      this.post();
    }
  };

  onUpdateTag = (tagName: string) => {
    const index = this.state.tags.indexOf(tagName);
    const isTagExist = index !== -1;
    const tags = this.state.tags.slice();
    if (isTagExist) {
      tags.splice(index, 1);
      this.setState({ tags });
    } else {
      tags.push(tagName);
      this.setState({ tags });
    }
  };

  onToggleDonation = () => {
    this.setState({
      isDonationActive: !this.state.isDonationActive,
    });
  };

  onDeleteUploadedImage = (id: string) => {
    const { coverImage, imageIds } = this.state;
    const indexOfImageInArr = imageIds.findIndex((imageId) => imageId === id);
    const newMainImageIndex = coverImage > indexOfImageInArr ? coverImage - 1 : coverImage;
    this.setState({
      imageIds: imageIds.filter(imageId => imageId !== id),
      coverImage: newMainImageIndex,
    });
  };

  onDeleteNewImage = (id: string) => {
    this.setState({
      images: this.state.images.filter(
        (image: any) => image.lastModified !== Number(id),
      ),
    });
  };

  onChangeCoverImage = (coverImage: number) => {
    this.setState({
      coverImage,
    });
  };

  render() {
    const {
      description,
      character,
      bannerText,
      isDonationActive,
      tags,
      id,
      imageIds,
      coverImage,
      kindOfAnimal,
      adoptiveName,
      adoptivePhone,
      adoptionContractFile,
      adoptionContractFileId,
    } = this.state;
    const { tagsList, locations, allTags } = this.props;
    const locationTypeOptions =
      locations[this.state.locationName.toUpperCase()]?.list.data;
    const breedOptions = allTags.filter(
      (tag: ITag) =>
        tag.category.toLowerCase() === `${kindOfAnimal}breed`.toLowerCase(),
    );
    if (this.props.status === ERequestStatus.REQUEST) {
      return <Loader />;
    }
    return (
      <>
        <div className="data-edit">
          <AnimalForm
            {...this.state}
            statusOptions={tagsList.status}
            genderOptions={tagsList.gender}
            kindOfAnimalOptions={tagsList.kindOfAnimal}
            locationOptions={tagsList.location}
            breedOptions={breedOptions}
            dogSizeOptions={tagsList.dogsize}
            locationTypeOptions={locationTypeOptions}
            onChange={this.onChangeValue}
            onUpdateBirthday={this.onUpdateBirthday}
          />
        </div>
        <div className="tabs-edit">
          <Tabs
            defaultActiveKey={this.currentTab}
            onChange={(key: string) => (this.currentTab = key)}
          >
            <TabPane tab="Зображення" key="1">
              <ImageTabContent
                mainImageIndex={coverImage}
                onDeleteImage={this.onDeleteUploadedImage}
                onDeleteNewImage={this.onDeleteNewImage}
                uploadedImageIds={imageIds}
                addImage={this.addImage}
                animalId={id}
                baseUrl={this.baseUrl}
                newImages={this.state.images}
                onChangeCoverImage={this.onChangeCoverImage}
                onSaveChanges={this.onSave}
              />
            </TabPane>
            <TabPane tab="Здоров’я" key="2">
              <HealthTabContent
                donationActive={isDonationActive}
                tags={tags}
                bannerText={bannerText}
                onChange={this.onChangeMultiLang}
                onUpdateTag={this.onUpdateTag}
                onToggleDonation={this.onToggleDonation}
              />
            </TabPane>
            <TabPane tab="Опис" key="3">
              <DescriptionTabContent
                description={description}
                character={character}
                onChange={this.onChangeMultiLang}
              />
            </TabPane>
            <TabPane tab="Усиновлювач" key="4">
              <AdoptiveParentTabContent
                adoptiveName={adoptiveName}
                adoptivePhone={adoptivePhone}
                adoptionContractFile={adoptionContractFile}
                adoptionContractFileId={adoptionContractFileId}
                deleteContract={this.deleteContract}
                deleteNewContract={this.deleteNewContract}
                saveContractId={this.saveContractId}
                uploadFile={this.uploadFile}
                onChange={this.onChangeValue}
              />
            </TabPane>
            <TabPane tab="Історія змін" key="5">
              Content of Tab Pane 3
            </TabPane>
          </Tabs>
          <Button onClick={this.onSave} styleType={ButtonTypes.Blue}>
            Зберегти зміни
          </Button>
        </div>
      </>
    );
  }
}

export default withRouter(
  connect(
    (state: ICustomAppState, ownProps: IOwnPropTypes) => {
      return {
        status: state.AdminHomePage.animalUpdateRequestState.status,
        locations: state.adminLocations.locations,
        allTags: selectTagsListData(state),
        ...ownProps,
      };
    },
    (dispatch: Dispatch) => {
      return bindActionCreators(
        {
          fetchLocationList: actionAdminFetchLocationsRequest,
        },
        dispatch,
      );
    },
  )(AnimalEditCard),
);
