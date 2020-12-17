import { ITagForm } from './TagForm/TagForm';
import { ELocales } from '../../../i18n/store/state';
import { ITagValue, ITag } from '../../../api/tags';

export const prepareTagValues = (tagForm: ITagForm) =>
  Object.keys(tagForm).map(key => ({
    lang: key as ELocales,
    value: tagForm[key as ELocales] || '',
  }));

export const getTagNameByLang = (tag: ITag, lang: ELocales): string => {
  const currentValue: ITagValue | undefined = tag?.values.find(
    value => value.lang.toLowerCase() === lang.toLowerCase(),
  );

  return !!currentValue && !!currentValue.value ? currentValue.value : '';
};
