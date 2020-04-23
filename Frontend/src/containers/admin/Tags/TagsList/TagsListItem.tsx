import React, { Dispatch } from 'react';
import { AnyAction } from 'redux';
import { connect } from 'react-redux';

import { ITag, ITagValue } from '../../../../api/tags';
import { ELocales } from '../../../../i18n/store/state';
import { actionDeleteTag } from '../../../../store/actions/tags.actions';
import customConfirm from './../../../../components/Confirm';
import './style.scss';

interface IPropTypes {
  tag: ITag;
  deleteTag: (tagId: string) => void;
}

const TagsListItem: React.FC<IPropTypes> = ({ tag, deleteTag }) => {
  const getTagName = (lang: ELocales): string => {
    const currentValue: ITagValue | undefined = tag.values.find(value => value.lang.toLowerCase() === lang.toLowerCase());

    return !!currentValue && !!currentValue.value ? currentValue.value : '...';
  }
  const onTagDelete = async () => {
    const confirm = await customConfirm(
      `Видалити тег '${getTagName(ELocales.ua)}'?`,
      'Видалити',
      'Скасувати'
    );
    if (!!confirm) {
      deleteTag(tag.id as string)
    }
  }

  return (
      <div className="t-item">
          <div className="row">
              <div className="col col-ua">{getTagName(ELocales.ua)}</div>
              <div className="col col-en">{getTagName(ELocales.en)}</div>
              <div className="col col-de">{getTagName(ELocales.de)}</div>
              <div className="col col-ru">{getTagName(ELocales.ru)}</div>
              <div className="col col-num">0</div>
              <div className="col col-edit"><i className="icon-edit">icon</i></div>
              <div className="col col-del"><i className="icon-delete" onClick={onTagDelete}>icon</i></div>
          </div>
      </div>
  )
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
  deleteTag: (tagId: string) => dispatch(actionDeleteTag(tagId)),
});

export default connect(null, mapDispatchToProps)(TagsListItem);