import React, { useEffect, useState } from 'react';

import { ITag } from '../../../../api/tags';
import { ELocales } from '../../../../i18n/store/state';
import './style.scss';
import useForm from '../../../../shared/hooks/useForm';
import { getTagNameByLang } from '../tags.helper';

export interface ITagForm {
  [ELocales.ua]?: string;
  [ELocales.en]?: string;
  [ELocales.de]?: string;
  [ELocales.ru]?: string;
}

interface IPropTypes {
  tag?: ITag;
  hasExtraCol?: boolean;
  onSubmit: (tagForm: ITagForm) => void;
  onCancel: () => void;
  onValidationFailure?: () => void;
}

export const TagForm: React.FC<IPropTypes> = ({
  onSubmit,
  onCancel,
  tag,
  hasExtraCol,
  onValidationFailure,
}) => {
  const getTagName = (lang: ELocales): string =>
    !!tag ? getTagNameByLang(tag, lang) : '';
  const [tagValues, setTagValues] = useState({
    [ELocales.ua]: getTagName(ELocales.ua),
    [ELocales.en]: getTagName(ELocales.en),
    [ELocales.de]: getTagName(ELocales.de),
    [ELocales.ru]: getTagName(ELocales.ru),
  });
  useEffect(() => {
    if (!!tag) {
      initFields(tagValues);
    }
  }, []);

  const isValid = (form: ITagForm) => !!Object.values(form).find(v => !!v);

  const { fields, handleFieldChange, handleSubmit, initFields } = useForm(
    () => {
      if (!onValidationFailure || isValid(fields)) {
        onSubmit(fields);
      } else {
        onValidationFailure();
      }
    },
  );
  const onInput = (fieldName: ELocales, event: any) => {
    handleFieldChange(event);
    setTagValues({
      ...tagValues,
      [fieldName]: event.target.value,
    });
  };

  return (
    <form className="c-list" onSubmit={handleSubmit}>
      <div className="row">
        <div className="col">
          <input
            type="text"
            name={ELocales.ua}
            placeholder="Українська"
            onChange={e => onInput(ELocales.ua, e)}
            value={tagValues[ELocales.ua]}
          />
        </div>
        <div className="col">
          <input
            type="text"
            name={ELocales.en}
            placeholder="Англійська"
            onChange={e => onInput(ELocales.en, e)}
            value={tagValues[ELocales.en]}
          />
        </div>
        <div className="col">
          <input
            type="text"
            name={ELocales.de}
            placeholder="Німецька"
            onChange={e => onInput(ELocales.de, e)}
            value={tagValues[ELocales.de]}
          />
        </div>
        <div className="col">
          <input
            type="text"
            name={ELocales.ru}
            placeholder="Російська"
            onChange={e => onInput(ELocales.ru, e)}
            value={tagValues[ELocales.ru]}
          />
        </div>
        {/* <div className="col col-num">...</div> */}
        {hasExtraCol && <div className="col col-icon"></div>}
        <div className="col col-icon">
          <button className="btn-checked" type="submit">
            Save
          </button>
        </div>
        <div className="col col-icon">
          <button className="cancel" type="button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};
