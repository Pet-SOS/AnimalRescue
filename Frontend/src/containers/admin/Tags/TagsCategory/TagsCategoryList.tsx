import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { Dispatch } from "react";
import { AnyAction } from "redux";

import { ICustomAppState } from "../../../../store/state";
import { actionGetTagsList, actionClearTagsList } from '../../../../store/actions/tags.actions';
import { IRequestParams } from '../../../../api/requestOptions';
import { AdminMenu } from '../../AdminMenu';
import { selectTagsListData } from '../../../../store/selectors/tags.selector';
import { ITag } from '../../../../api/tags';
import './style.scss';
import { TagsCategoryItem } from './TagsCategoryItem';

interface IPropTypes {
  fetchTagsList: (requestParams?: IRequestParams) => void;
  clearTagsList: () => void;
  tagsList: Array<ITag>;
}

const TagsCategoryList: React.FC<IPropTypes> = ({ fetchTagsList, clearTagsList, tagsList }) => {
  const [sortedTagsList, setSortedTagsList] = useState<{ [key: string]: Array<ITag> }>({});
  const sortTagsList = (): { [key: string]: Array<ITag> } => {
    const sortedTags: { [key: string]: Array<ITag> } = {};
    tagsList.forEach(tag => {
      sortedTags[tag.category] = !!sortedTags[tag.category] ? [...sortedTags[tag.category], tag] : [tag]
    });
    return sortedTags;
  }

  useEffect(() => {
    fetchTagsList();
    return () => {
      clearTagsList();
    }
  }, []);
  
  useEffect(() => {
    setSortedTagsList(sortTagsList());
  }, [tagsList]);

  return (
    <div className='boxAdmin'>
      <AdminMenu selectedKey={'tags'} openKeys={'sub-1'} />
      <div className='tags-category-holder'>
        <h2 className='title'>Теги</h2>
        <table>
          <thead>
            <tr>
              <th>Категорія</th>
              <th>Значення</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {!!sortedTagsList && !!Object.keys(sortedTagsList).length && Object.keys(sortedTagsList).map((categoryName, index) => (
              <TagsCategoryItem key={index} category={categoryName} tags={sortedTagsList[categoryName]} />
            ))}
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
  fetchTagsList: (requestParams?: IRequestParams) => dispatch(actionGetTagsList(requestParams)),
  clearTagsList: () => dispatch(actionClearTagsList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TagsCategoryList);