import React, { useEffect, Dispatch, useState } from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { useParams } from 'react-router-dom';

import { ITag } from '../../../../api/tags';
import { ICustomAppState } from '../../../../store/state';
import { selectTagsListData } from '../../../../store/selectors/tags.selector';
import { actionGetTagsList, actionClearTagsList, actionAddTag } from '../../../../store/actions/tags.actions';
import { RequestFilterOperators } from '../../../../api/requestOptions';
import { AdminMenu } from '../../AdminMenu';
import { TI18n } from '../../../../i18n';
import { ELocales } from '../../../../i18n/store/state';
import TagsListItem from './TagsListItem';
import { BlockLink } from '../../../../components/BlockLink';
import './style.scss';
import { TagForm, ITagForm } from '../TagForm/TagForm';

interface IPropTypes {
  fetchTagsList: (categoryName: string) => void;
  addTag: (tag: ITag) => void;
  clearTagsList: () => void;
  tagsList: Array<ITag>;
}

const TagsList: React.FC<IPropTypes> = ({ fetchTagsList, addTag, clearTagsList, tagsList }) => {
  const { tagCategoryName } = useParams();
  const [isTagFormActive, setIsTagFormActive] = useState(false);
  useEffect(() => {
    if (!!tagCategoryName) {
      fetchTagsList(tagCategoryName.toLowerCase().trim());
    }
    return () => {
      clearTagsList();
    }
  }, [tagCategoryName]);
  useEffect(() => {
    if (isTagFormActive) {
      setIsTagFormActive(false)
    }
  }, [tagsList.length])

  const onTagFormSubmit = (tagForm: ITagForm) => {
    const newTag: ITag = {
      category: tagCategoryName || '',
      kindOfAnimal: '',
      code: `#${tagCategoryName}`,
      values: Object.keys(tagForm).map(key => ({
        lang: key as ELocales,
        value: tagForm[key as ELocales] || ''
      }))
    }
    addTag(newTag);
  }

  return (
    <div className='boxAdmin'>
      <AdminMenu selectedKey={'tags'} openKeys={['sub2', 'sub1']}/>
      <div className='tags-list-holder'>
        <BlockLink
          title={'Повернутися до тегів'}
          href={'/admin/tags'}
          isBack
        />
        <h2 className='title'>
          {<TI18n keyStr={`${tagCategoryName}TagCategory`} default={tagCategoryName} locale={ELocales.ua}/>}
        </h2>
        <table>
          <thead>
            <tr>
              <th>Українська</th>
              <th>Англійська</th>
              <th>Німецька</th>
              <th>Російська</th>
              <th>&nbsp;</th>
              <th>&nbsp;</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {!!tagsList && !!tagsList.length && tagsList.map((tag, index) => (
              <TagsListItem key={index} tag={tag}/>
            ))}
            <tr>
              {!isTagFormActive && (
                  <React.Fragment>
                    <td>
                      <button onClick={() => setIsTagFormActive(true)}>+ новый тег</button>
                    </td>
                    <td>...</td>
                    <td>...</td>
                    <td>...</td>
                    <td>...</td>
                    <td>...</td>
                    <td>...</td>
                  </React.Fragment>
                )
              }
            </tr>
          </tbody>
        </table>
        {isTagFormActive && (<TagForm onSubmit={onTagFormSubmit} onCancel={() => {setIsTagFormActive(false)}}/>)}
      </div>
    </div>
  )
}

const mapStateToProps = (state: ICustomAppState) => ({
  tagsList: selectTagsListData(state),
});
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
  fetchTagsList: (categoryName: string) => dispatch(actionGetTagsList({
    filter: {
      fieldName: 'category',
      opeartor: RequestFilterOperators.ALL,
      value: categoryName
    }
  })),
  addTag: (tag: ITag) => dispatch(actionAddTag(tag)),
  clearTagsList: () => dispatch(actionClearTagsList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TagsList);