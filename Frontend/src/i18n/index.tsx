import React from 'react';
import {connect} from 'react-redux';
import i18n from 'i18n-js';
import {ICustomAppState} from "../store/state";
import { getDefaultLocale } from "./store/state";
import en from './translations/en';
import ru from './translations/ru';
import ua from './translations/ua';
import de from './translations/de';
import { APP_LANGUAGE_KEY } from './store/reducer';

i18n.defaultLocale = getDefaultLocale();
i18n.translations = { en, ru, ua, de };

interface IPropTypes {
  keyStr: string;
  currentLocale: string;
  default?: string;
}

const TI18nMain = (props: IPropTypes) => {
  i18n.locale = props.currentLocale;
  const params: any = {};
  if(props.default){
    params.defaultValue = props.default
  }

  return (<>{i18n.t(props.keyStr, params)}</>)
};

const I18nMainMapStateToProps = (state: ICustomAppState) => ({
  currentLocale: state[APP_LANGUAGE_KEY]
});

const TI18n = connect(I18nMainMapStateToProps)(TI18nMain);

export { TI18n };
export * from './ui/ChangeLocale'
