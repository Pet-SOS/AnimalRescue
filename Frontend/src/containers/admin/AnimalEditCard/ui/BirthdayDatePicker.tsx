import React from "react";
import moment from "moment";

interface IDateOfBirthday {
  years: number;
  months: number;
  weeks: number;
}

interface IPropTypes {
  birthday?: string;
}

export class BirthdayDatePicker extends React.Component<IPropTypes> {
  public limitOfDateUnits: IDateOfBirthday = {
    years: 21,
    months: 12,
    weeks: 4
  }

  constructor(props: IPropTypes) {
    super(props);
  }

  renderDateSelect(key: string, label: string) {
    // @ts-ignore
    const selectCollection = [...Array(this.limitOfDateUnits[key])];
    // @ts-ignore
    const defaultValue = this.calculateAge()[key];
    console.log('selectCollection defaultValue', defaultValue)

    return (
      <div className="form-col">
        <label htmlFor={`birthday-${key}`}>{label}</label>
        <select
          value={defaultValue}
          id="birthday-weeks"
        >
          {selectCollection.map((unit, i) => {
            return (
              <option key={i} value={i}>{i}</option>
            );
          })}
        </select>
      </div>
    );
  }

  calculateAge(): IDateOfBirthday {
    const { birthday } = this.props;
    const a = moment(moment().toArray().slice(0, 3));
    const b = moment(moment(birthday).toArray().slice(0, 3));
    const years = a.diff(b, 'year');
    b.add(years, 'years');
    const months = a.diff(b, 'months');
    b.add(months, 'months');
    const weeks = a.diff(b, 'weeks');
    return { years, months, weeks }
  }

  render() {
    return (
      <div className="form-cols-group">
        {this.renderDateSelect('weeks', 'Неділя')}
        {this.renderDateSelect('months', 'Місяць')}
        {this.renderDateSelect('years', 'Рік')}
      </div>
    );
  }
}
