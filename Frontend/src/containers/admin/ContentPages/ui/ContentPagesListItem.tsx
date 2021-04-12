import React from 'react';

export interface IContentPagesListItem {
  title: string;
  path: string;
  onEditClick: (contentPage: any) => void;
}

export const ContentPagesListItem: React.FC<IContentPagesListItem> = ({
  title,
  path,
  onEditClick,
}) => {
  const handleOnEditClick = () => {
    onEditClick(path);
  };
  return (
    <div className="t-item row">
      <div className="col col-title">{title}</div>
      <div className="col col-btn"></div>
      <div className="col col-btn"></div>
      <div className="col col-btn"></div>
      <div className="col col-btn">
        <i className="icon-edit" onClick={handleOnEditClick} />
      </div>
    </div>
  )
}