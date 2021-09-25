import React, { Dispatch, useEffect } from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';

import { ICustomAppState } from '../../../../store/state';
import {
  actionClearTagsList,
  actionGetTagsList,
  actionSelectTagsCategory,
} from '../../../../store/actions/tags.actions';
import { IRequestParams } from '../../../../api/requestOptions';
import { AdminMenu } from '../../AdminMenu';
import { selectTagsCategoryListData } from '../../../../store/selectors/tags.selector';
import { ITag } from '../../../../api/tags';
import './style.scss';
import { TagsCategoryItem } from './TagsCategoryItem';

interface IPropTypes {
  fetchTagsList: (requestParams?: IRequestParams) => void;
  categoryList: { [key: string]: Array<ITag> };
  selectCategory: (category: string) => void;
}

const TagsCategoryList: React.FC<IPropTypes> = ({
  fetchTagsList,
  categoryList,
  selectCategory,
}) => {
  useEffect(() => {
    fetchTagsList({ size: 100 });
  }, []);

  const onListItemSelected = (category: string) => {
    selectCategory(category);
  };

  const renderList = () => {
    return (
      <>
        {!!categoryList &&
          !!Object.keys(categoryList).length &&
          Object.keys(categoryList).map((categoryName, index) => (
            <TagsCategoryItem
              key={index}
              category={categoryName}
              tags={categoryList[categoryName]}
              onEditClick={onListItemSelected}
            />
          ))}
      </>
    );
  };

  return (
    <div className="boxAdmin">
      <AdminMenu selectedKey={'tags'} openKeys={[]} />
      <main>
        <div className="container">
          <section className="section-categories">
            <header>
              <h3>Теги</h3>
            </header>
            <div className="page-content">
              <div className="section-table-wrapper">
                <section className="section-table categories-table">
                  <header>
                    <div className="row">
                      <div className="col col-category">Категорія</div>
                      <div className="col col-value xs-phone-hidden">
                        Значення
                      </div>
                      <div className="col col-icon">&nbsp;</div>
                    </div>
                  </header>
                  {renderList()}
                </section>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

const mapStateToProps = (state: ICustomAppState) => ({
  categoryList: selectTagsCategoryListData(state),
});
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
  fetchTagsList: (requestParams?: IRequestParams) =>
    dispatch(actionGetTagsList(requestParams)),
  selectCategory: (category: string) =>
    dispatch(actionSelectTagsCategory(category)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TagsCategoryList);
