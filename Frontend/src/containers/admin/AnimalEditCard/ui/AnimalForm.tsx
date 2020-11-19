import React from 'react';
import { BirthdayDatePicker } from './BirthdayDatePicker';
import { EKindOfAnimal, ITag } from '../../../../api/tags';
import { AnimalKind, Gender } from '../../../../api/animals';
import { ILocation } from '../../../../api/admin';

interface IPropTypes {
  number: number;
  name: string;
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
    alternativeTitleKey?: string,
  ) => {
    // @ts-ignore
    const optionList: ITag[] = this.props[optionsKey];
    // @ts-ignore
    const selectionPropertyValue = this.props[key]; // tags === Array<string>

    const defaultValue =
      (optionList && this.findTag(optionList)) || selectionPropertyValue || '';
    return (
      <div className="form-row small-row">
        <label htmlFor="acard-status">{label}</label>
        <select
          value={defaultValue}
          id="acard-status"
          onChange={e => this.props.onChange(e, key)}
        >
          <option value="" className="default-val"></option>
          {optionList?.map((item: ITag) => {
            // @ts-ignore
            const alternativeLabel = alternativeTitleKey
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
        {this.renderSelect('Статус', 'status', 'statusOptions')}
        {this.renderSelect('Тип локации', 'locationName', 'locationOptions')}
        {this.renderSelect(
          'Назва локации',
          'locationTypeId',
          'locationTypeOptions',
          'title',
        )}
        {this.renderField('Кличка', 'name')}
        {this.renderSelect('Стать', 'gender', 'genderOptions')}
        <div className="form-row small-row">
          <BirthdayDatePicker
            birthday={this.props.birthday}
            onUpdateBirthday={this.props.onUpdateBirthday}
          />
        </div>
        {this.renderSelect('Вид', 'kindOfAnimal', 'kindOfAnimalOptions')}
        {this.renderSelect('Порода', 'tagBreed', 'breedOptions')}
        {this.props.kindOfAnimal === EKindOfAnimal.dog &&
          this.renderSelect('Розмір', 'tagSize', 'dogSizeOptions')}
      </>
    );
  }
}
