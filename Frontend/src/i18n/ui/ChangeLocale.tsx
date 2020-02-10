import React from 'react';
import {connect} from 'react-redux';
import {ILocales, locales} from "../store/state";
import {ICustomAppState} from "../../store/state";
import {actionSetLocale} from "../store/actions";
import {Select, SelectExpandDirections} from "../../components/Select";
import '../styles/index.scss';

interface ISelectLocale {
  setLocale: (locale: string) => void;
  selected: string;
  expandDirection?: SelectExpandDirections;
}

const ChangeLocaleMain: React.FC<ISelectLocale> = ({ selected, setLocale, expandDirection }) => (
  <Select
      data={locales.map((locale: ILocales) => ({label: locale.value.toUpperCase(), value: locale.value}))}
      selected={selected}
      onChange={(value: string) => setLocale(value)}
      expandDirection={expandDirection}
      title={false}
  />
)

const selectLocaleMapStateToProps = (state: ICustomAppState) => ({
    selected: state.i18n.locale
});

export const ChangeLocale = connect(selectLocaleMapStateToProps, {
    setLocale: actionSetLocale
})(ChangeLocaleMain);