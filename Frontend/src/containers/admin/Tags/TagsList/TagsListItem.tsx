import React from 'react';

import { ITag, ITagValue } from '../../../../api/tags';
import { ELocales } from '../../../../i18n/store/state';
import './style.scss';

interface IPropTypes {
  tag: ITag;
}

export const TagsListItem: React.FC<IPropTypes> = ({ tag }) => {
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
      <td><button type="button">Delete</button></td>
    </tr>
  )
}