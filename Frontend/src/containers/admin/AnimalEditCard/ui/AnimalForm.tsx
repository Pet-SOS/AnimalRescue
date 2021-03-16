import React from 'react';
import { BirthdayDatePicker } from './BirthdayDatePicker';
import { EKindOfAnimal, ITag } from '../../../../api/tags';
import { AnimalKind, Gender } from '../../../../api/animals';
import { ILocation } from '../../../../api/admin';

interface IPropTypes {
  number: number;
  name: string;
  englishName: string;
  kindOfAnimal: string | AnimalKind;
  gender: string | Gender;
  birthday?: string;
  status: string;
  statusOptions?: ITag[];
  genderOptions?: ITag[];
  kindOfAnimalOptions?: ITag[];
  locationOptions?: ITag[];
  breedOptions?: ITag[];
  dogSizeOptions?: ITag[];
  locationTypeOptions?: ILocation[];
  tags: string[];
  onChange: (e: any, key: string) => any;
  onUpdateBirthday: (date: string) => any;
}

export class AnimalForm extends React.PureComponent<IPropTypes> {
  public currentLang: string = localStorage.getItem('appLanguage') || 'ua';

  findLocaleStatusValue(status: ITag): string {
    const resultStatus = status.values?.filter(
      val => val.lang === this.currentLang,
    );
    return resultStatus?.length ? resultStatus[0].value : '';
  }

  renderField = (label: string, key: string, readOnly?: boolean) => {
    const id = `acard-${key}`;
    // @ts-ignore
    const value = this.props[key];
    return (
      <div className="form-row small-row">
        <label htmlFor={id}>{label}</label>
        <input
          type="text"
          id={id}
          disabled={readOnly}
          value={value}
          onChange={e => this.props.onChange(e, key)}
        />
      </div>
    );
  };

  findTag = (optionList: ITag[]) => {
    const { tags } = this.props;
    for (let i = 0; i < optionList.length; i++) {
      const selectedTag = tags.find((tag: string) => {
        return tag === optionList[i].id;
      });
      if (selectedTag) {
        return selectedTag;
      }
    }

    return '';
  };

  renderSelect = (
    label: string,
    key: string,
    optionsKey: string,
    isRequired: boolean,
    alternativeTitleKey?: string,
  ) => {
    const id = `acard-status-${key}`;
    // @ts-ignore
    const optionList: ITag[] = this.props[optionsKey];
    // @ts-ignore
    const selectionPropertyValue = this.props[key]; // tags === Array<string>

    const defaultValue =
      (optionList && this.findTag(optionList)) || selectionPropertyValue || '';

    const getValidationClass = (value: string, isRequired: boolean) => isRequired && value === '' ? 'in-valid' : '';

    let validationClass = getValidationClass(defaultValue, isRequired);

    const onChange = (e: any) => {
        this.props.onChange(e, key);
        validationClass = getValidationClass(e.target.value, isRequired);
    };

    return (
      <div className="form-row small-row">
        <label htmlFor={id}>{label}</label>
        <select
          className={validationClass}
          value={defaultValue}
          id={id}
          onChange={onChange}>
          <option value="" className="default-val"></option>
          {optionList?.map((item: ITag) => {
            const alternativeLabel = alternativeTitleKey
              // @ts-ignore
              ? item[alternativeTitleKey]
              : '';
            return (
              <option value={item.id} key={item.id}>
                {this.findLocaleStatusValue(item) ||
                  alternativeLabel ||
                  'Unknown'}
              </option>
            );
          })}
        </select>
      </div>
    );
  };

  render() {
    return (
      <>
        {this.renderField('Номер', 'number', true)}
        {this.renderSelect('Статус', 'status', 'statusOptions', true)}
        {this.renderSelect('Тип локації', 'locationName', 'locationOptions', true)}
        {this.renderSelect(
          'Назва локації',
          'locationTypeId',
          'locationTypeOptions',
          true,
          'title',
        )}
        <fieldset>
          {this.renderField('Кличка', 'name')}
          {this.renderField('Кличка латиницею', 'englishName')}
        </fieldset>
        {this.renderSelect('Стать', 'gender', 'genderOptions', false)}
        <div className="form-row small-row">
          <BirthdayDatePicker
            birthday={this.props.birthday}
            onUpdateBirthday={this.props.onUpdateBirthday}
          />
        </div>
        {this.renderSelect('Вид', 'kindOfAnimal', 'kindOfAnimalOptions', true)}
        {this.renderSelect('Порода', 'tagBreed', 'breedOptions', false)}
        {this.props.kindOfAnimal === EKindOfAnimal.dog &&
          this.renderSelect('Розмір', 'tagSize', 'dogSizeOptions', false)}
      </>
    );
  }
}
