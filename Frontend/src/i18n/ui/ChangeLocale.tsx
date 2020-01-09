import React from 'react';
import {connect} from 'react-redux';
import {ILocales, locales} from "../store/state";
import {ICustomAppState} from "../../store/state";
import {actionSetLocale} from "../store/actions";
import {Select} from "../../components/Select";
import '../styles/index.scss';

interface ISelectLocale {
    setLocale: (locale: string) => void;
    selected: string;
}

const ChangeLocaleMain = (props: ISelectLocale) => {
    const {selected, setLocale} = props;
    return (
        <Select
            data={locales.map((locale: ILocales) => ({label: locale.value.toUpperCase(), value: locale.value}))}
            selected={selected}
            onChange={(value: string) => setLocale(value)}
            mainStyles={{color: '#0D2B4B', fontSize: '1rem'}}
        />
    )
};

const selectLocaleMapStateToProps = (state: ICustomAppState) => ({
    selected: state.i18n.locale
});

export const ChangeLocale = connect(selectLocaleMapStateToProps, {
    setLocale: actionSetLocale
})(ChangeLocaleMain);