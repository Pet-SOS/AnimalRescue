import React from 'react';
import './index.scss';
import moment from 'moment';
import { TI18n } from '../../i18n';

interface IPropTypes {
    birthday? : string;
  }
  
  export const Age: React.FC<IPropTypes> = ({ birthday }: IPropTypes) => {
    let today = moment()
    let duration = moment.duration(today.diff(birthday))
    let years = duration.get('years')
    let yearsWord = (x : number) : string => {
      switch(x) {
        case 1: {
          return 'year';
        }
        case 21: {
          return 'year';
        }
        case 2 : {
          return 'fromTwoToFourYears';
        }
        case 3 : {
          return 'fromTwoToFourYears';
        }
        case 4 : {
          return 'fromTwoToFourYears';
        }
        case 22 : {
          return 'fromTwoToFourYears';
        }
        case 23 : {
          return 'fromTwoToFourYears';
        }
        case 24 : {
          return 'fromTwoToFourYears';
        }
        default: { 
          return 'fromFiveToTwentyYears';
        }
    }
  }

    let months = duration.get('months')
    let monthsWord = (x: number): string => {
      switch(x) {
        case 1: {
          return 'month';
        }
        case 2 : {
          return 'fromTwoToFourMonths';
        }
        case 3 : {
          return 'fromTwoToFourMonths';
        }
        case 4 : {
          return 'fromTwoToFourMonths';
        }
        default: { 
          return 'fromFiveToTwelveMonths';
        }
      }
    }

    let weeks = duration.get('weeks')
    let weeksWord = (x: number): string => { return (x == 1) ? 'week' : 'fromTwoToFourWeeks'; }

    return (
        <span>
          {(!!years || years !== 0) && <React.Fragment>{years} <TI18n keyStr={yearsWord(years)} default="рік" /></React.Fragment>} 
          {(!!years || years !== 0) && (!!months || months !== 0) && <React.Fragment>, </React.Fragment>}
          {(!!months || months !== 0) && <React.Fragment>{months} <TI18n keyStr={monthsWord(months)} default="місяць" /></React.Fragment>}
          {(!!weeks || weeks !== 0) && years === 0 && (!!months || months !== 0) && <React.Fragment>, </React.Fragment>}
          {(!!weeks || weeks !== 0) && years === 0 && <React.Fragment>{weeks} <TI18n keyStr={weeksWord(weeks)} default="тиждень" /></React.Fragment>}
        </span>
    );     
  }
