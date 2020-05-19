import React from "react";
import { DateParser } from './DateParser';
import { ITag } from '../../../../api/tags';
import { AnimalKind, Gender } from '../../../../api/animals';

interface IAnimalProps {
  number: number;
  name: string;
  kindOfAnimal: string | AnimalKind;
  gender: string | Gender;
  age: number;
  birthday?: string;
  status: string;
  availableStatuses?: ITag[];
  tags: string[];
}

interface IAnimalData {
  animaldata: IAnimalProps;
}

export class AnimalForm extends React.Component<IAnimalData> {
  public state: IAnimalProps;
  public currentLang: string = localStorage.getItem('appLanguage') || 'ua';

  constructor(props: IAnimalData) {
    super(props);
    this.state = {
      number: props.animaldata.number,
      name: props.animaldata.name,
      kindOfAnimal: props.animaldata.kindOfAnimal,
      gender: props.animaldata.gender,
      age: props.animaldata.age,
      birthday: props.animaldata.birthday,
      status: props.animaldata.status,
      availableStatuses: props.animaldata.availableStatuses,
      tags: props.animaldata.tags
    };
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  findLocaleStatusValue(status: ITag): string {
      const resultStatus = status.values.filter(val => val.lang === this.currentLang);
      return resultStatus.length ? resultStatus[0].value : '';
  }

  handleDateChange(date: string) {
      this.setState({date: date});
  }

  changeValue = (e: any, key: any) => {
    this.setState({[key]: e.target.value})
  };

  render() {
    const {
      availableStatuses, number, name, kindOfAnimal, gender,  status, birthday, age, tags
    } = this.state;

    return (
      <>
        <div className="form-row small-row">
          <label htmlFor="acard-number">Номер</label>
          <input id="acard-number" disabled value={number} onChange={(e) => this.changeValue(e, 'number')}/>
        </div>
        <div className="form-row small-row">
          <label htmlFor="acard-status">Статус</label>
          <select id="acard-status" onChange={(e) => this.changeValue(e, 'status')}>
            <option className="default-val">&ndash;</option>
            {availableStatuses ? availableStatuses.map((stat: ITag) => {
              return (
                <option key={stat.id}
                    selected={this.findLocaleStatusValue(stat) === status ? true : false}>
                  {this.findLocaleStatusValue(stat) || 'Unknown'}
                </option>
              );
            }) : null}
          </select>
        </div>
        <div className="form-row small-row">
          <label htmlFor="acard-name">Кличка</label>
          <input id="acard-name" value={name} onChange={(e) => this.changeValue(e, 'name')}/>
        </div>
        <div className="form-row small-row">
          <label htmlFor="acard-kind">Вид</label>
          <input id="acard-kind" value={kindOfAnimal}
                  onChange={(e) => this.changeValue(e, 'kindOfAnimal')}/>
                </div>
        <div className="form-row small-row">
          <label htmlFor="acard-gender">Стать</label>
          <input id="acard-gender" value={gender} onChange={(e) => this.changeValue(e, 'gender')}/>
        </div>
        <div className="form-row small-row">
          <label htmlFor="acard-age">age</label>
          <input id="acard-age" value={age} onChange={(e) => this.changeValue(e, 'age')}/>
        </div>
        <div className="form-row small-row">
          <DateParser date={birthday} onDateChange={this.handleDateChange} />
        </div>
        <div className="form-row small-row">
          <label htmlFor="acard-tags">tags</label>
          <input id="acard-tags" value={tags} onChange={(e) => this.changeValue(e, 'tags')}/>
        </div>
      </>
    );
  }
}