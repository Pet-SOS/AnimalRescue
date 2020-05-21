import React, {ChangeEvent} from "react";
import { BirthdayDatePicker } from './BirthdayDatePicker';
import { ITag } from '../../../../api/tags';
import { AnimalKind, Gender } from '../../../../api/animals';

interface IPropTypes {
  number: number;
  name: string;
  kindOfAnimal: string | AnimalKind;
  gender: string | Gender;
  birthday?: string;
  status: ITag;
  availableStatuses?: ITag[];
  tags: string[];
  onChange: (e: any, key: string) => any;
}

export class AnimalForm extends React.Component<IPropTypes> {
  public currentLang: string = localStorage.getItem('appLanguage') || 'ua';

  findLocaleStatusValue(status: ITag): string {
      const resultStatus = status.values.filter(val => val.lang === this.currentLang);
      return resultStatus.length ? resultStatus[0].value : '';
  }

  handleDateChange(date: string) {
      this.setState({date: date});
  }

  renderField = (label: string, key: string, readOnly?: boolean) => {
    const id = `acard-${key}`;
    // @ts-ignore
    const value = this.props[key];
    return (
      <div className="form-row small-row">
        <label htmlFor={id}>{label}</label>
        <input  id={id} disabled={readOnly} defaultValue={value} onChange={(e) => this.props.onChange(e, key)}/>
      </div>
    );
  }

  renderStatusSelect = () => {
    const { availableStatuses, status: defaultValue } = this.props;
    return (
      <div className="form-row small-row">
        <label htmlFor="acard-status">Статус</label>
        <select value={defaultValue.id} id="acard-status" onChange={(e) => this.props.onChange(e, 'status')}>
          {availableStatuses?.map((status: ITag) => {
            return (
              <option
                value={status.id}
                key={status.id}>
                {this.findLocaleStatusValue(status) || 'Unknown'}
              </option>
            );
          })}
        </select>
      </div>
    )
  }

  render() {
    return (
      <>
        {this.renderField('Номер', 'number', true)}
        {this.renderStatusSelect()}
        {this.renderField('Кличка', 'name')}
        {this.renderField('Вид', 'kindOfAnimal')}
        {this.renderField('Стать', 'gender')}
        <div className="form-row small-row">
          <BirthdayDatePicker birthday={this.props.birthday} />
        </div>

        {this.renderField('tags', 'tags')}
      </>
    );
  }
}
