import {createAction} from 'typesafe-actions';

export const actionSetLocale = createAction(
    'SET_LANGUAGE',
    (resolve) => (locale: string) => resolve(locale)
);