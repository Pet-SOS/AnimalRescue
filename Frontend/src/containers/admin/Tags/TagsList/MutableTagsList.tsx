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
import { prepareTagValues } from '../tags.helper';

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
      values: prepareTagValues(tagForm)
    }
    addTag(newTag);
  };

  return (
    <div className='boxAdmin'>
      <AdminMenu selectedKey={'tags'} openKeys={['sub2', 'sub1']}/>
      <main>
        <div className="container">
          <section className="section-tags-list">
            <header>
              <BlockLink
                  title={'Повернутися до тегів'}
                  href={'/admin/tags'}
                  isBack
              />
              <h4>{<TI18n keyStr={`${tagCategoryName}TagCategory`} default={tagCategoryName} locale={ELocales.ua}/>}</h4>
            </header>
            <div className="page-content">
              <section className='section-table tags-table'>
                <header>
                  <div className="row">
                    <div className="col col-ua">Українська</div>
                    <div className="col col-en">Англійська</div>
                    <div className="col col-de">Німецька</div>
                    <div className="col col-ru">Російська</div>
                    <div className="col col-num"></div>
                    <div className="col col-edit"></div>
                    <div className="col col-del"></div>
                  </div>
                </header>
                <div className="t-list">
                  {!!tagsList && !!tagsList.length && tagsList.map((tag, index) => (
                      <TagsListItem key={index} tag={tag}/>
                  ))}
                  {!isTagFormActive && (
                  <div className="t-item">
                    <div className="row">
                          <React.Fragment>
                            <div className="col col-ua">
                              <a onClick={() => setIsTagFormActive(true)}>+ новый тег</a>
                            </div>
                            <div className="col col-en">...</div>
                            <div className="col col-de">...</div>
                            <div className="col col-ru">...</div>
                            <div className="col col-num"></div>
                            <div className="col col-edit"></div>
                            <div className="col col-del"></div>
                          </React.Fragment>

                    </div>
                  </div>
                  )
                  }
                  {isTagFormActive && (<TagForm onSubmit={onTagFormSubmit} onCancel={() => {setIsTagFormActive(false)}}/>)}
                </div>
              </section>
            </div>
          </section>
        </div>
      </main>
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
      operator: RequestFilterOperators.EQ,
      value: categoryName
    }
  })),
  addTag: (tag: ITag) => dispatch(actionAddTag(tag)),
  clearTagsList: () => dispatch(actionClearTagsList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TagsList);
