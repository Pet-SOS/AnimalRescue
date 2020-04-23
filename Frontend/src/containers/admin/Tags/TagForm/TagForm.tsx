import React from 'react';

import { ITag } from '../../../../api/tags';
import { ELocales } from '../../../../i18n/store/state';
import './style.scss';
import useForm from '../../../../shared/hooks/useForm';

export interface ITagForm {
  [ELocales.ua]?: string;
  [ELocales.en]?: string;
  [ELocales.de]?: string;
  [ELocales.ru]?: string;
}

interface IPropTypes {
  tag?: ITag;
  onSubmit: (tagForm: ITagForm) => void;
  onCancel: () => void;
}

export const TagForm: React.FC<IPropTypes> = ({ onSubmit, onCancel }) => {
  const { fields, handleFieldChange, handleSubmit } = useForm(() => { onSubmit(fields) });
  
  return (
    <form onSubmit={handleSubmit}>
        <div className="t-item">
          <div className="row">
              <div className="col">
                  <input
                    type='text'
                    name={ELocales.ua}
                    placeholder='Українська'
                    onInput={handleFieldChange}
                  />
              </div>
              <div className="col">
                  <input
                    type='text'
                    name={ELocales.en}
                    placeholder='Англійська'
                    onInput={handleFieldChange}
                  />
              </div>
              <div className="col">
                  <input
                    type='text'
                    name={ELocales.de}
                    placeholder='Німецька'
                    onInput={handleFieldChange}
                  />
              </div>
              <div className="col">
                  <input
                    type='text'
                    name={ELocales.ru}
                    placeholder='Російська'
                    onInput={handleFieldChange}
                  />
              </div>
            <div className="col col-num">...</div>
              <div className="col col-edit"><button className="btn-checked" type="submit">Save</button></div>
              <div className="col col-del"><button className="cancel" type="button" onClick={onCancel}>Cancel</button></div>
          </div>
        </div>
    </form>
  )
}