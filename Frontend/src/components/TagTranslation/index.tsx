import React from 'react';
import './index.scss';
import { APP_LANGUAGE_KEY } from '../../i18n/store/reducer';
import { ITag } from '../../api/tags';
import { useSelector, shallowEqual } from 'react-redux';
import { selectTagsListData } from '../../store/selectors/tags.selector';
import { store } from '../../store';

interface IPropTypes {
  tagId: string;
}

export const TagTranslation: React.FC<IPropTypes> = ({ tagId }: IPropTypes) => {
  const tagsList: ITag[] = useSelector(() => {
    return selectTagsListData(store.getState());
  }, shallowEqual);

  const getTagFromStore = (str: string): any => {
    const useLocale: string = localStorage.getItem(APP_LANGUAGE_KEY) || 'ua';
    const currentTag: ITag[] = tagsList.filter(
      tag => tag.id?.toLowerCase() === str.toLowerCase(),
    );
    const newLocal =
      !!currentTag && !!currentTag.length ? currentTag[0] : undefined;
    const translations =
      !!newLocal && newLocal.values.filter(t => t.lang === useLocale);
    const currentTranslation =
      !!translations && !!translations.length ? translations[0].value : '';
    return currentTranslation;
  };

  const capitalizedString = (str: string): string => {
    const currentTag: string = getTagFromStore(str);
    const newStr: string =
      !!currentTag && !!currentTag.length
        ? currentTag.trim().toLowerCase()
        : str.trim().toLowerCase();
    return !!newStr ? `${newStr[0].toUpperCase()}${newStr.slice(1)}` : newStr;
  };

  return (
    <span>
      <React.Fragment>{capitalizedString(tagId)}</React.Fragment>
    </span>
  );
};
