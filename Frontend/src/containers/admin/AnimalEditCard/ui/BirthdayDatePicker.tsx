import React from "react";

interface IDateProps {
  date?: any;
  years?: string;
  months?: string;
  weeks?: string;
  onDateChange?: any;
}

export class BirthdayDatePicker extends React.Component<IDateProps> {
  // public state: IDateProps;
  public limitOfAnimalAge = {
    years: 21,
    months: 12,
    weeks: 4
  }
  // public currDate: Date = new Date();

  constructor(props: IDateProps) {
    super(props);
    // this.state = {
    //   date: props.date || this.currDate,
    //   years: '',
    //   months: '',
    //   weeks: ''
    // };
  }

  // compileData(event: any, period: string) {
  //   this.setState({[period]: event.target.value});
  //
  //   const weeksToMs: number = (period === 'weeks' ? event.target.value : parseInt(this.state.weeks || '0')) * 7 * 24 * 60 * 60 * 1000;
  //   const monthsToMs: number = (period === 'months' ? event.target.value : parseInt(this.state.months || '0')) * 30 * 24 * 60 * 60 * 1000
  //   const yearsToMs: number = (period === 'years' ? event.target.value : parseInt(this.state.years || '0')) * 365 * 24 * 60 * 60 * 1000;
  //   const msAmount = yearsToMs + monthsToMs + weeksToMs;
  //   const birthTimestamp = this.currDate.getTime() - msAmount;
  //
  //   this.props.onDateChange(new Date(birthTimestamp).toISOString());
  // }

  renderDateSelect(key: string, label: string, defaultValue: any) {
    // @ts-ignore
    const selectCollection = [...Array(this.limitOfAnimalAge[key])];
    return (
      <div className="form-col">
        <label htmlFor={`birthday-${key}`}>{label}</label>
        <select value={defaultValue} id="birthday-weeks" onChange={(e) => this.compileData(e, key)}>
          {selectCollection.map((curr, currWeek) => {
            return (
              <option
                key={currWeek} value={currWeek}
                // selected={week === currWeek.toString() ? true : false}
              >{currWeek}</option>
            );
          })}
        </select>
      </div>
    );
  }

  calculateAge() {

  }

  render() {
    // const dateDelta = this.currDate.getTime() - new Date(this.state.date).getTime();
    // const year = Math.floor(dateDelta / 31536000000).toString();
    // const month = Math.floor(new Date(dateDelta % 31536000000).getMonth()).toString();
    // const week = '0'; // TODO
    // console.log(Array(this.limitOfAnimalAge.months));


    // if (!this.state.years || !this.state.months || !this.state.weeks) {
    //   this.setState({
    //     years: year,
    //     months: month,
    //     weeks: week,
    //   });
    // }

    return (
      <div className="form-cols-group">
        {this.renderDateSelect('weeks', 'Неділя', week)}
        {this.renderDateSelect('months', 'Місяць', month)}
        {this.renderDateSelect('years', 'Рік', year)}
      </div>
    );
  }
}
