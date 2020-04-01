import React, { Dispatch } from 'react';
import { AnyAction } from 'redux';
import { connect } from 'react-redux';

import { ITag, ITagValue } from '../../../../api/tags';
import { ELocales } from '../../../../i18n/store/state';
import { actionDeleteTag } from '../../../../store/actions/tags.actions';
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

  return (
    <tr>
      <td>{getTagName(ELocales.ua)}</td>
      <td>{getTagName(ELocales.en)}</td>
      <td>{getTagName(ELocales.de)}</td>
      <td>{getTagName(ELocales.ru)}</td>
      <td>0</td>
      <td><button type="button">Edit</button></td>
      <td><button type="button" onClick={() => deleteTag(tag.id as string)}>Delete</button></td>
    </tr>
  )
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
  deleteTag: (tagId: string) => dispatch(actionDeleteTag(tagId)),
});

export default connect(null, mapDispatchToProps)(TagsListItem);