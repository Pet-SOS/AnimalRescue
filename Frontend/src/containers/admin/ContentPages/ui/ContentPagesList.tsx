import React from 'react';
import {
  useHistory,
} from 'react-router';

import '../styles/styles.scss';
import { ContentPagesListItem } from './ContentPagesListItem';
import { ContentPagesContainerPage } from './ContentPagesContainerPage';

export const ContentPagesList: React.FC = () => {
  const history = useHistory();

  const handleOnItemEditClick = (path: string) => {
    history.push({
      pathname: `/admin/contentPages/${path}`,
    });
  };
  return (
    <ContentPagesContainerPage>
      <header>
        <h3>Контентні сторінки</h3>
      </header>
      <div className="section-table-wrapper">
        <div className={'section-table blog-table'}>
          <header>
            <div className="row">
              <div className="col col-title">
                Сторінка
              </div>
              <div className="col"></div>
              <div className="col"></div>
              {/* This is to compensate two columns with buttons in the table body */}
              <div className="col"></div>
              <div className="col"></div>
            </div>
          </header>
          <ContentPagesListItem
            title="Головна"
            path="home"
            onEditClick={handleOnItemEditClick}
          />
          <ContentPagesListItem
            title="Про службу порятунку"
            path="about"
            onEditClick={handleOnItemEditClick}
          />
          <ContentPagesListItem
            title="Правила взаємодії зі службою"
            path="about-rules"
            onEditClick={handleOnItemEditClick}
          />
          <ContentPagesListItem
            title="Як я можу допомогти"
            path="how-to-help"
            onEditClick={handleOnItemEditClick}
          />
        </div>
      </div>
    </ContentPagesContainerPage>
  )
}

