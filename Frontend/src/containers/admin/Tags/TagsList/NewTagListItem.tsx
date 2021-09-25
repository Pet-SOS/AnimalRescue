import React, { useEffect, useState } from 'react';
import { ITagForm, TagForm } from '../TagForm/TagForm';
import { ITag } from '../../../../api/tags';
import { prepareTagValues } from '../tags.helper';
import { TI18n } from '../../../../i18n';
import { ELocales } from '../../../../i18n/store/state';

interface INewTagListItemProps {
  onTagFormSubmit: (tagForm: ITag) => void;
  category: string;
  kindOfAnimal?: string;
  onValidationFailure?: () => void;
}

export const NewTagListItem: React.FC<INewTagListItemProps> = ({
  category,
  kindOfAnimal,
  onTagFormSubmit,
  onValidationFailure,
}) => {
  const [isTagFormActive, setIsTagFormActive] = useState(false);
  useEffect(() => {
    if (isTagFormActive) {
      setIsTagFormActive(false);
    }
  }, [category, kindOfAnimal, onTagFormSubmit]);

  const onSubmit = (tagForm: ITagForm) => {
    const newTag: ITag = {
      category: category || '',
      kindOfAnimal: kindOfAnimal || '',
      values: prepareTagValues(tagForm),
      isDeletable: true,
    };
    onTagFormSubmit(newTag);
  };

  const onCancel = () => {
    setIsTagFormActive(false);
  };

  const onNewClick = () => {
    setIsTagFormActive(true);
  };

  return isTagFormActive ? (
    <TagForm
      onSubmit={onSubmit}
      onCancel={onCancel}
      onValidationFailure={onValidationFailure}
    />
  ) : (
    <div className="row">
      <React.Fragment>
        <div className="col col-ua">
          <a onClick={onNewClick}>
            {
              <TI18n
                keyStr="newTag"
                default={'+ New Tag'}
                locale={ELocales.ua}
              />
            }
          </a>
        </div>
        <div className="col col-en">...</div>
        <div className="col col-de">...</div>
        <div className="col col-ru">...</div>
        {/* <div className="col col-num"></div> */}
        <div className="col col-icon"></div>
        <div className="col col-icon"></div>
      </React.Fragment>
    </div>
  );
};
