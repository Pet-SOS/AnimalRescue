import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {Dispatch} from "react";
import {AnyAction} from "redux";

import {ICustomAppState} from "../../../../store/state";
import {actionGetTagsList, actionClearTagsList} from '../../../../store/actions/tags.actions';
import {IRequestParams} from '../../../../api/requestOptions';
import {AdminMenu} from '../../AdminMenu';
import {selectTagsCategoryListData, selectTagsListData} from '../../../../store/selectors/tags.selector';
import {ITag} from '../../../../api/tags';
import './style.scss';
import {TagsCategoryItem} from './TagsCategoryItem';

interface IPropTypes {
    fetchTagsList: (requestParams?: IRequestParams) => void;
    clearTagsList: () => void;
    categories: { [key: string]: Array<ITag> };
}

const TagsCategoryList: React.FC<IPropTypes> = ({fetchTagsList, clearTagsList, categories}) => {
    useEffect(() => {
        fetchTagsList({size: 100});
        return () => {
            clearTagsList();
        }
    }, []);

    return (
        <div className='boxAdmin'>
            <AdminMenu selectedKey={'tags'} openKeys={['sub2', 'sub1']}/>
            <main>
                <div className="container">
                    <section className="section-categories">
                        <header><h3>Теги</h3></header>
                        <div className="page-content">
                            <section className='section-table categories-table'>
                                <header>
                                    <div className="row">
                                        <div className="col col-category">Категорія</div>
                                        <div className="col col-value">Значення</div>
                                        <div className="col col-btn">Edit</div>
                                    </div>
                                </header>
                                <div className="с-list">
                                    {!!Object.keys(categories).length && Object.keys(categories).map((categoryName, index) => (
                                        <TagsCategoryItem key={index} category={categoryName}
                                                          tags={categories[categoryName]}/>
                                    ))}
                                </div>
                            </section>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    )
};

const mapStateToProps = (state: ICustomAppState) => ({
    categories: selectTagsCategoryListData(state),
});
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
    fetchTagsList: (requestParams?: IRequestParams) => dispatch(actionGetTagsList(requestParams)),
    clearTagsList: () => dispatch(actionClearTagsList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TagsCategoryList);
