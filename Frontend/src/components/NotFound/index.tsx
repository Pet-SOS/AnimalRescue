import React from 'react';
import { TI18n } from './../../i18n';
import './index.scss';

export const NotFound = () => (
  <div className="not-found content">
    <h1 className="title">404</h1>
    <strong>
      <TI18n keyStr="pageNotFound" default="Page not found" />
      &nbsp;:(
    </strong>
  </div>
);
