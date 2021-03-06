import React from 'react';
import { Popconfirm } from 'antd';
import { IBlogItem } from '../../../../api/blog';
import moment from 'moment';
import { TI18n } from '../../../../i18n';

export interface IBlogListItem {
  blogItem: IBlogItem;
  onEditClick: (blogItem: IBlogItem) => void;
  onDeleteClick: (blogItem: IBlogItem) => void;
}

export const BlogListItem: React.FC<IBlogListItem> = ({
  blogItem,
  onEditClick,
  onDeleteClick,
}) => {
  const types: { [key: string]: any } = {
    story: <TI18n keyStr="blogstory" />,
    article: <TI18n keyStr="blogarticle" />,
  };
  const handleOnEditClick = () => {
    onEditClick(blogItem);
  };

  const handleOnDeleteClick = () => {
    onDeleteClick(blogItem);
  };

  const modified = moment(blogItem.modifiedAt || blogItem.createdAt).format(
    'DD.MM.YYYY',
  );

  const getTypes = () => {
    return types[blogItem.type];
  };
  return (
    <div className="t-item row">
      <div className="col col-title">{blogItem.title}</div>
      <div className="col col-type">{getTypes()}</div>
      <div className="col col-modified">{modified}</div>
      <div className="col col-btn">
        <i className="icon-edit" onClick={handleOnEditClick} />
      </div>
      <div className="col col-btn">
        <Popconfirm
          title={
            <TI18n
              keyStr="areYouSureYouWantToDeleteArticle"
              default="Are you sure you want to delete this article?"
            />
          }
          onConfirm={handleOnDeleteClick}
          okText={<TI18n keyStr="confirmTitle" default="Confirm" />}
          cancelText={<TI18n keyStr="cancelTitle" default="Cancel" />}
        >
          <i className="icon-delete" onClick={() => {}} />
        </Popconfirm>
      </div>
    </div>
  );
};
