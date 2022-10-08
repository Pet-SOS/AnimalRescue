import React from 'react';
import { TI18n } from '../../../../i18n';
import i18n from 'i18n-js';
import '../style/lookingForAFriendPage.scss';
import { IAnimalsListState } from '../../Animals/store/state';
import { IInfoCard, IInfoContacts } from '../../Home/store/state';
import { Select, SelectExpandDirections } from '../../../../components/Select';
import {
  AnimalGender,
  AnimalBreed,
  AnimalFilterKind,
  AnimalSize,
  AnimalAge,
  Tags,
  FilterType,
  AnimalKind,
} from '../../../../api/animals';
import tranlateText from '../../../../i18n/translations/ru';
import { store } from '../../../../store';
import { HelpBlock } from '../../../../components/HelpBlock';
import { AnimalCard } from '../../Animals/AnimalCard';
import { BtnPagination } from '../../Blog/ui/BtnPagination';
import { IRequestParams } from '../../../../api/requestOptions';
import defaultText from '../../../../i18n/translations/ru';
import { CheckBoks } from '../../../../components/CheckBoks';
import { ITagsState } from '../../../../store/state/tags.state';
import { ITag } from '../../../../api/tags';
import {
  ESubtractPeriod,
  getSubtractDate,
} from '../../../../shared/getSubtractDate';

interface IPropTypes {
  match: any;
  history: any;
  location: any;
  sickAnimalsList: IAnimalsListState;
  infoCard: IInfoCard;
  infoContacts: IInfoContacts;
  animalsList: IAnimalsListState;
  fetchSickAnimals: () => void;
  fetchAnimalsRequest: (params?: IRequestParams) => void;
  fetchInfoCard: () => void;
  fetchInfoContacts: () => void;
  tags: ITagsState;
  appLang: string;
}

interface ISelect {
  value: string;
  key?: string;
  check?: boolean;
}

interface ITagsCheckbox {
  [name: string]: ISelect;
}

interface IState {
  [name: string]: ISelect;
}

interface ILocale {
  [key: string]: string;
}

const defaultFilterState = {
  kindOfAnimal: {
    value: Object.values(AnimalFilterKind)[0].toUpperCase(),
    key: Object.keys(AnimalFilterKind)[0],
  },
  breed: {
    value: Object.values(AnimalBreed)[0].toUpperCase(),
    key: Object.keys(AnimalBreed)[0],
  },
  gender: {
    value: Object.values(AnimalGender)[0],
    key: Object.keys(AnimalGender)[0],
  },
  age: {
    value: Object.values(AnimalAge)[0],
    key: Object.keys(AnimalAge)[0],
  },
  dogsize: {
    value: Object.values(AnimalSize)[0],
    key: Object.keys(AnimalSize)[0],
  },
  STERILIZED: {
    value: Tags.STERILIZED,
    key: FilterType.STERILIZED,
    check: false,
  },
  VACCINATED: {
    value: Tags.VACCINATED,
    key: FilterType.VACCINATED,
    check: false,
  },
  READYTOABROAD: {
    value: Tags.READYTOABROAD,
    key: FilterType.READYTOABROAD,
    check: false,
  },
};

export class LookingForAFriendPage extends React.Component<IPropTypes> {
  public state: any;
  public toPage: number = 1;
  public sizeAnimalToPage: number = 15;
  public allFilterRequestString: string = '';
  public tagsAll = 'tags~all~';
  public initialState: any;
  public filterUrl: any;

  constructor(props: IPropTypes) {
    super(props);
    this.state = {
      ...defaultFilterState,
      isFilterVisible: false,
    };
    this.initialState = this.state;
  }

  getCindOfAnimal(type: string): any {
    switch (type) {
      case FilterType.KIND_OF_ANIMAL:
        return AnimalFilterKind;
      case FilterType.BREED:
        return AnimalBreed;
      case FilterType.GENDER:
        return AnimalGender;
      case FilterType.AGE:
        return AnimalAge;
      case FilterType.SIZE:
        return AnimalSize;
    }
  }

  getAllQueryParamsToState(str: string) {
    let paramsArr = str
      .slice(0, str.length - 1)
      .replace('?', '')
      .split('/');
    paramsArr.forEach(param => {
      const arrKeys = param.split('=');
      const keyStr = arrKeys[0];
      const value = arrKeys[1];
      if (this.expectTheFilterIsEqualTo(keyStr)) {
        this.setState(
          {
            [keyStr]: {
              ...this.state[keyStr],
              check: /true/i.test(value),
            },
          },
          () => this.sendFilterRequest(),
        );
      } else {
        this.setState(
          {
            [keyStr]: {
              ...this.state[keyStr],
              key: value,
              value: this.getCindOfAnimal(keyStr)[value],
            },
          },
          () => this.sendFilterRequest(),
        );
      }
    });
  }

  componentDidMount() {
    if (this.props.location.search) {
      this.getAllQueryParamsToState(this.props.location.search);
    }
    if (store.getState().animals.animalsList.totalCount === 0) {
      this.props.fetchAnimalsRequest({
        page: +this.props.match.params.page,
        size: this.sizeAnimalToPage,
      });
      this.props.fetchInfoCard();
      this.props.fetchInfoContacts();
      this.props.fetchSickAnimals();
    }
  }

  expectTheFilterIsEqualTo(filterKey: string) {
    return (
      filterKey === FilterType.STERILIZED ||
      filterKey === FilterType.VACCINATED ||
      filterKey === FilterType.READYTOABROAD
    );
  }

  convertToRoutingParams() {
    let strParams = '';
    for (let key in this.state) {
      if (
        this.state[key].key !== undefined &&
        this.state[key].key !== FilterType.ANY
      ) {
        if (key === FilterType.AGE) {
          continue;
        } else if (this.expectTheFilterIsEqualTo(key)) {
          strParams = this.state[key].check
            ? `${strParams}${key}=${this.state[key].check}/`
            : strParams;
          continue;
        } else {
          strParams = `${strParams}${key}=${this.state[key].key}/`;
        }
      }
    }
    return strParams;
  }

  getAgePeriod(from: string | null, to: string) {
    if (from != null){
      return `birthday~gte~${from};birthday~lt~${to}`;  
    }
    else{
      return `birthday~lt~${to}`;
    }
  }

  getAgeFilterRequestString(query: string) {
    query = query.toLowerCase();
    switch (query) {
      case AnimalAge.ANY.toLowerCase(): {
        return '';
      }
      case AnimalAge.TOONE.toLowerCase(): {
        return this.getAgePeriod(
          getSubtractDate(1, ESubtractPeriod.Years),
          getSubtractDate(6, ESubtractPeriod.Month),
        );
      }
      case AnimalAge.TOTHREE.toLowerCase(): {
        return this.getAgePeriod(
          getSubtractDate(3, ESubtractPeriod.Years),
          getSubtractDate(1, ESubtractPeriod.Years),
        );
      }
      case AnimalAge.TOFIVE.toLowerCase(): {
        return this.getAgePeriod(
          getSubtractDate(5, ESubtractPeriod.Years),
          getSubtractDate(3, ESubtractPeriod.Years),
        );
      }
      case AnimalAge.FROMFIVE.toLowerCase(): {
        return this.getAgePeriod(
          null,
          getSubtractDate(5, ESubtractPeriod.Years),
        );
      }
      default: {
        return query;
      }
    }
  }

  sendFilterRequest() {
    let strTags = '';
    let filterParams = '';
    this.toPage = 1;
    for (let key in this.state) {
      if (
        this.state[key].key !== undefined &&
        this.state[key].key !== FilterType.ANY
      ) {
        if (key === 'age') {
          continue;
        }
        if (key === FilterType.SIZE || key === FilterType.BREED) {
          strTags = `${strTags}'${this.state[key].key}'^`;
        } else if (this.expectTheFilterIsEqualTo(key)) {
          strTags = !!this.state[key].check
            ? `${strTags}'${this.state[key].key}'^`
            : strTags;
        } else {
          let partFilter = `${key}~eq~'${this.state[key].key}'`;
          filterParams =
            filterParams === ''
              ? `${filterParams}${partFilter}`
              : `${filterParams};${partFilter}`;
        }
      }
    }

    if (this.state.age.value !== 'any') {
      let ageFilter =
        this.state.age.value !== 'any'
          ? this.getAgeFilterRequestString(this.state.age.value)
          : '';
      filterParams =
        filterParams === ''
          ? `${filterParams}${ageFilter}`
          : `${filterParams};${ageFilter}`;
    }

    const patt = /^/g;
    let tags =
      strTags !== '' && patt.test(strTags)
        ? `${this.tagsAll}(${strTags.slice(0, -1)})`
        : `${this.tagsAll}${strTags}`;

    if (strTags !== '' && filterParams !== '') {
      this.allFilterRequestString = `${tags};${filterParams}`;
    } else if (filterParams === '' && strTags === '') {
      this.allFilterRequestString = '';
    } else if (filterParams === '') {
      this.allFilterRequestString = tags;
    } else {
      this.allFilterRequestString = filterParams;
    }

    this.props.fetchAnimalsRequest({
      page: Number(this.props.match.params.page),
      size: this.sizeAnimalToPage,
      filter: this.allFilterRequestString,
    });
    this.props.history.push({
      pathname: `/animals/page/${+this.props.match.params.page}`,
      search: this.convertToRoutingParams(),
      state: this.state,
    });
  }

  setLocale(value: string, objLocale: ILocale | null, type: string) {
    const keyObj = objLocale
      ? Object.keys(objLocale)[Object.values(objLocale).indexOf(value)]
      : '';
    this.props.history.push({
      pathname: `/animals/page/1`,
      search: this.convertToRoutingParams(),
      state: this.state,
    });
    if (type === FilterType.KIND_OF_ANIMAL) {
      this.resetBreed();
    }
    if (type === FilterType.KIND_OF_ANIMAL && value !== 'DOG') {
      this.resetSize();
    }
    this.setState(
      {
        [type]: {
          ...this.state[type],
          value: value,
          key: objLocale ? keyObj : value,
        },
      },
      () => {
        if (type === FilterType.KIND_OF_ANIMAL && value === FilterType.ANY) {
          this.clearFilter();
        } else {
          this.sendFilterRequest();
        }
      },
    );
  }

  resetSize() {
    this.setState({
      [FilterType.SIZE]: {
        ...this.state[FilterType.SIZE],
        value: Object.values(AnimalSize)[0],
        key: Object.keys(AnimalSize)[0],
      },
    });
  }

  resetBreed() {
    this.setState({
      [FilterType.BREED]: {
        ...this.state[FilterType.BREED],
        value: Object.values(AnimalBreed)[0].toUpperCase(),
        key: Object.keys(AnimalBreed)[0],
      },
    });
  }

  setCheckboxCheck(name: string) {
    this.setState(
      {
        [name]: {
          ...this.state[name],
          check: !this.state[name].check,
        },
      },
      () => {
        this.sendFilterRequest();
      },
    );
  }

  goToPagination(toPage: string | number) {
    this.toPage = +toPage;
    this.props.fetchAnimalsRequest({
      page: this.toPage,
      size: this.sizeAnimalToPage,
      filter: this.allFilterRequestString,
    });
    this.props.history.push({
      pathname: `/animals/page/${this.toPage}`,
      search: this.convertToRoutingParams(),
      state: this.state,
    });
  }

  clearFilter() {
    this.props.history.push({
      pathname: `/animals/page/1`,
    });
    this.setState(this.initialState, () => {
      this.sendFilterRequest();
    });
  }

  getTagsByCategory = (type: string) => {
    const { data } = this.props.tags;
    const { appLang } = this.props;
    const categories = data.filter((tag: ITag) => {
      return tag.category.toLowerCase() === type.toLowerCase();
    });
    let optionList = [
      {
        label: i18n.t(`AnimalFilterKind${Object.values(AnimalFilterKind)[0]}`),
        value: Object.keys(AnimalFilterKind)[0],
      },
    ];
    if (categories.length) {
      const categoriesByAppLang = categories.map((tag: ITag) => {
        const labelLang = tag.values.find((item: any) => item.lang === appLang);
        return {
          label: labelLang !== undefined ? labelLang.value : '',
          value: String(tag.id),
        };
      });
      optionList = optionList.concat(categoriesByAppLang);
    }
    return optionList;
  };

  get breedOfSelectedAnimal() {
    const { kindOfAnimal } = this.state;
    if (
      kindOfAnimal.value !== undefined &&
      kindOfAnimal.value !== FilterType.ANY
    ) {
      return `${this.state.kindOfAnimal.value.toLowerCase()}breed`;
    }
    return FilterType.ANY;
  }

  render() {
    return (
      <div className="looking-friend-block">
        <div className="container">
          <h2>
            <TI18n
              keyStr="lookingForAFriendPageTitle"
              default={defaultText.lookingForAFriendPageTitle}
            />
          </h2>
          <div
            className={
              this.state.isFilterVisible ? 'filters-hidden-mobile' : ''
            }
          >
            <button
              onClick={() =>
                this.setState({ isFilterVisible: !this.state.isFilterVisible })
              }
              className="opener"
            >
              <i className="icon-step">icon</i>
              <span>Фільтри</span>
            </button>
            <div className="slide">
              <ul className="list-selects">
                <li className="item-select">
                  <Select
                    data={this.getTagsByCategory(FilterType.KIND_OF_ANIMAL)}
                    selected={this.state.kindOfAnimal.value}
                    onChange={(value: string) =>
                      this.setLocale(value, null, FilterType.KIND_OF_ANIMAL)
                    }
                    expandDirection={SelectExpandDirections.BOTTOM}
                    title={
                      <TI18n
                        keyStr="lookingForAFriendPageSelectKind"
                        default={tranlateText.lookingForAFriendPageSelectKind}
                      />
                    }
                  />
                </li>
                <li className="item-select">
                  <Select
                    data={this.getTagsByCategory(this.breedOfSelectedAnimal)}
                    selected={this.state.breed.value}
                    onChange={(value: string) =>
                      this.setLocale(value, null, FilterType.BREED)
                    }
                    expandDirection={SelectExpandDirections.BOTTOM}
                    title={
                      <TI18n
                        keyStr="lookingForAFriendPageSelectBreed"
                        default={tranlateText.lookingForAFriendPageSelectBreed}
                      />
                    }
                  />
                </li>
                <li className="item-select">
                  <Select
                    data={this.getTagsByCategory(FilterType.GENDER)}
                    selected={this.state.gender.value}
                    onChange={(value: string) =>
                      this.setLocale(value, AnimalGender, FilterType.GENDER)
                    }
                    expandDirection={SelectExpandDirections.BOTTOM}
                    title={
                      <TI18n
                        keyStr="lookingForAFriendPageSelectGender"
                        default={tranlateText.lookingForAFriendPageSelectGender}
                      />
                    }
                  />
                </li>
                <li className="item-select">
                  <Select
                    data={Object.values(AnimalAge).map(value => ({
                      label: i18n.t('AnimalAge' + value),
                      value: value,
                    }))}
                    selected={this.state.age.value}
                    onChange={(value: string) =>
                      this.setLocale(value, AnimalAge, 'age')
                    }
                    expandDirection={SelectExpandDirections.BOTTOM}
                    title={
                      <TI18n
                        keyStr="lookingForAFriendPageSelectAge"
                        default={tranlateText.lookingForAFriendPageSelectAge}
                      />
                    }
                  />
                </li>

                {this.state.kindOfAnimal.value === AnimalKind.DOG && (
                  <li className="item-select">
                    <Select
                      data={this.getTagsByCategory(FilterType.SIZE)}
                      selected={this.state.dogsize.value}
                      onChange={(value: string) =>
                        this.setLocale(value, AnimalSize, FilterType.SIZE)
                      }
                      expandDirection={SelectExpandDirections.BOTTOM}
                      title={
                        <TI18n
                          keyStr="lookingForAFriendPageSelectSize"
                          default={tranlateText.lookingForAFriendPageSelectSize}
                        />
                      }
                    />
                  </li>
                )}
              </ul>
              <div className="second-filter">
                <ul className="list-checkboxes">
                  <li className="item-checkbox">
                    <CheckBoks
                      name={<TI18n keyStr="sterilized" />}
                      setCheckboxCheck={this.setCheckboxCheck.bind(this)}
                      state={this.state.STERILIZED.check}
                      tag={this.state.STERILIZED.key}
                    />
                  </li>
                  <li className="item-checkbox">
                    <CheckBoks
                      name={<TI18n keyStr="vaccinated" />}
                      setCheckboxCheck={this.setCheckboxCheck.bind(this)}
                      state={this.state.VACCINATED.check}
                      tag={this.state.VACCINATED.key}
                    />
                  </li>
                  <li className="item-checkbox">
                    <CheckBoks
                      name={<TI18n keyStr="readytoabroad" />}
                      setCheckboxCheck={this.setCheckboxCheck.bind(this)}
                      state={this.state.READYTOABROAD.check}
                      tag={this.state.READYTOABROAD.key}
                    />
                  </li>
                </ul>
                <button
                  className="clear-filter"
                  onClick={() => this.clearFilter()}
                >
                  <i className="icon-filter"></i>
                  <TI18n
                    keyStr="lookingForAFriendPageClearFilter"
                    default={defaultText.lookingForAFriendPageClearFilter}
                  />
                </button>
              </div>
            </div>
          </div>
          <div className="box-all-animals">
            <TI18n
              keyStr="countAnimalsFirstPart"
              default={defaultText.countAnimalsFirstPart}
            />
            <span>{this.props.animalsList.totalCount}</span>
            <TI18n
              keyStr="countAnimalsSecondPart"
              default={defaultText.countAnimalsSecondPart}
            />
          </div>
          <div className="hold-content-items section-margin">
            <div className="content-block-animals">
              {this.props.animalsList.data.length &&
                this.props.animalsList.data.map(animal => (
                  <div className="animal" key={animal.id}>
                    <AnimalCard animal={animal} />
                  </div>
                ))}
            </div>
            <BtnPagination
              setProps={this.props}
              pageCount={this.props.animalsList.pageCount}
              goToPagination={this.goToPagination.bind(this)}
            />
          </div>
        </div>
        <HelpBlock
          animalsList={this.props.sickAnimalsList.data}
          title={
            <TI18n
              keyStr="canHelpBlockTitle"
              default={defaultText.canHelpBlockTitle}
            />
          }
        />
      </div>
    );
  }
}
