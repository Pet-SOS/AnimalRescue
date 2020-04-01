import React, { useEffect, Dispatch } from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { useParams } from 'react-router-dom';

import { ITag } from '../../../../api/tags';
import { ICustomAppState } from '../../../../store/state';
import { selectTagsListData } from '../../../../store/selectors/tags.selector';
import { actionGetTagsList, actionClearTagsList } from '../../../../store/actions/tags.actions';
import { RequestFilterOperators } from '../../../../api/requestOptions';
import { AdminMenu } from '../../AdminMenu';
import { TI18n } from '../../../../i18n';
import { ELocales } from '../../../../i18n/store/state';
import { TagsListItem } from './TagsListItem';
import { BlockLink } from '../../../../components/BlockLink';
import './style.scss';

interface IPropTypes {
  fetchTagsList: (categoryName: string) => void;
  clearTagsList: () => void;
  tagsList: Array<ITag>;
}

const TagsList: React.FC<IPropTypes> = ({ fetchTagsList, clearTagsList, tagsList }) => {
  const { tagCategoryName } = useParams();
  useEffect(() => {
    if (!!tagCategoryName) {
      fetchTagsList(tagCategoryName.toLowerCase().trim());
    }
    return () => {
      clearTagsList();
    }
  }, [tagCategoryName]);

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
              <td>
                <button>+ новый тег</button>
              </td>
              <td>...</td>
              <td>...</td>
              <td>...</td>
              <td>...</td>
              <td>...</td>
              <td>...</td>
            </tr>
          </tbody>
        </table>
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
  clearTagsList: () => dispatch(actionClearTagsList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TagsList);