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
      <table>
        <tbody>
          <tr>
            <td>
              <input
                type='text'
                name={ELocales.ua}
                placeholder='Українська'
                onInput={handleFieldChange}
              />
            </td>
            <td>
              <input
                type='text'
                name={ELocales.en}
                placeholder='Англійська'
                onInput={handleFieldChange}
              />
            </td>
            <td>
              <input
                type='text'
                name={ELocales.de}
                placeholder='Німецька'
                onInput={handleFieldChange}
              />
            </td>
            <td>
              <input
                type='text'
                name={ELocales.ru}
                placeholder='Російська'
                onInput={handleFieldChange}
              />
            </td>
            <td>...</td>
            <td><button type="submit">Save</button></td>
            <td><button type="button" onClick={onCancel}>Cancel</button></td>
          </tr>
        </tbody>
      </table>
    </form>
  )
}