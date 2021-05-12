import React from 'react';
import { connect } from 'react-redux';
import { ILocales, locales } from '../store/state';
import { ICustomAppState } from '../../store/state';
import { actionSetLocale } from '../store/actions';
import { Select, SelectExpandDirections } from '../../components/Select';
import '../styles/index.scss';
import { APP_LANGUAGE_KEY } from '../store/reducer';
import { IAvailableLanguagesState } from '../../containers/client/Home/store/state';
import { selectAvailableLanguages } from '../../containers/client/Home/store/selectors';

interface ISelectLocale {
  setLocale: (locale: string) => void;
  selected: string;
  expandDirection?: SelectExpandDirections;
  availableLanguages: IAvailableLanguagesState;
}

const ChangeLocaleMain: React.FC<ISelectLocale> = ({
  selected,
  setLocale,
  expandDirection,
  availableLanguages,
}) => {
  //@ts-ignore
  const availableLocales = locales.filter((locale: ILocales) => availableLanguages.data.languages[locale.value]);
  return (
    <Select
      data={availableLocales.map((locale: ILocales) => ({
        label: locale.value.toUpperCase(),
        value: locale.value,
      }))}
      selected={selected}
      onChange={(value: string) => setLocale(value)}
      expandDirection={expandDirection}
      title={false}
    />
  )
};

const selectLocaleMapStateToProps = (state: ICustomAppState) => ({
  selected: state[APP_LANGUAGE_KEY],
  availableLanguages: selectAvailableLanguages(state),
});

export const ChangeLocale = connect(selectLocaleMapStateToProps, {
  setLocale: actionSetLocale,
})(ChangeLocaleMain);
