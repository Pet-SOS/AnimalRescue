import React from 'react';
import {connect} from 'react-redux';
import {ILocales, locales} from "../store/state";
import {ICustomAppState} from "../../store/state";
import {actionSetLocale} from "../store/actions";
import '../styles/index.scss';

interface ISelectLocale {
    setLocale: (locale: string) => void;
}

const ChangeLocaleMain = (props: ISelectLocale) => {
    return (
        <div className="language">
            <select onChange={(e: any) => props.setLocale(e.target.value)}>
                {locales.map((locale: ILocales) => (
                    <option key={locale.value} value={locale.value}>
                        {`^${locale.value.toUpperCase()}`}
                    </option>
                ))}
            </select>
        </div>
    )
};

const selectLocaleMapStateToProps = (state: ICustomAppState) => ({});

export const ChangeLocale = connect(selectLocaleMapStateToProps, {
    setLocale: actionSetLocale
})(ChangeLocaleMain);