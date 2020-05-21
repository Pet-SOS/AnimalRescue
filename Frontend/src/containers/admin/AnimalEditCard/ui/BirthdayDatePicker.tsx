import React from "react";
import moment from "moment";

interface IDateUnits {
  years: number;
  months: number;
  weeks: number;
}

interface IPropTypes {
  birthday?: string;
  onUpdateBirthday: (date: string) => any;
}

interface IStateTypes extends IDateUnits {
}

export class BirthdayDatePicker extends React.Component<IPropTypes, IStateTypes> {
  public limitOfDateUnits: IDateUnits = {
    years: 21,
    months: 12,
    weeks: 4
  }

  constructor(props: IPropTypes) {
    super(props);
    this.state = {
      years: 0,
      months: 0,
      weeks: 0
    }
  }

  componentDidUpdate(prevProps: Readonly<IPropTypes>) {
    if (prevProps.birthday !== this.props.birthday) {
      this.setState({...this.calculateAge()})
    }
  }

  renderDateSelect(key: string, label: string) {
    // @ts-ignore
    const selectCollection = [...Array(this.limitOfDateUnits[key])];
    // @ts-ignore
    const defaultValue = this.state[key];
    return (
      <div className="form-col">
        <label htmlFor={`birthday-${key}`}>{label}</label>
        <select
          onChange={(e) => this.updateDate(e, key)}
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

  getUpdatedDate(): string {
    let now = moment();
    // @ts-ignore
    Object.keys(this.state).forEach((unit: string) => now = now.subtract(unit, this.state[unit]))
    return now.toISOString();
  }

  updateDate(e: any, key: string) {
    const value = Number(e.target.value)
    this.setState(state => {
      return {
        ...state,
        [key]: value
      }
    }, () => this.props.onUpdateBirthday(this.getUpdatedDate()))
  }

  calculateAge(): IDateUnits {
    const {birthday} = this.props;
    const a = moment(moment().toArray().slice(0, 3));
    const b = moment(moment(birthday).toArray().slice(0, 3));
    const years = a.diff(b, 'year');
    b.add(years, 'years');
    const months = a.diff(b, 'months');
    b.add(months, 'months');
    const weeks = a.diff(b, 'weeks');
    return {years, months, weeks}
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
