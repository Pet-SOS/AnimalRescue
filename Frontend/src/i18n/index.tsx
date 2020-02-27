import React from 'react';
import {connect} from 'react-redux';
import i18n from 'i18n-js';
import {ICustomAppState} from "../store/state";
import {ELocales} from "./store/state";
import en from './translations/en';
import ru from './translations/ru';
import ua from './translations/ua';
import de from './translations/de';

i18n.defaultLocale = ELocales.Ua;
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
   currentLocale: state.i18n.locale
});

const TI18n = connect(I18nMainMapStateToProps)(TI18nMain);

export { TI18n };
export * from './ui/ChangeLocale'
