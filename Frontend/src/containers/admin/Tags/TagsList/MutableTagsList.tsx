import React, {Dispatch, useEffect} from 'react';
import {connect} from 'react-redux';
import {AnyAction} from 'redux';
import {useHistory, useParams} from 'react-router-dom';

import {ITag} from '../../../../api/tags';
import {ICustomAppState} from '../../../../store/state';
import {selectCategory, selectTagsListData} from '../../../../store/selectors/tags.selector';
import {actionAddTag, actionClearTagsList, actionGetTagsList,} from '../../../../store/actions/tags.actions';
import TagsListItem from './TagsListItem';
import './style.scss';
import {NewTagListItem} from "./NewTagListItem";
import {useRouteMatch} from "react-router";
import {buildCategory, buildFilter, buildKindOfAnimal, getLastCategory, isEditSupport, isSupportAdd} from "../helpers";
import {actionShowSnackbar} from "../../../../store/actions/snackbar.actions";
import i18n from "i18n-js";

interface IPropTypes {
    fetchTagsList: (categoryName: string, kindOfAnimal?: string) => void;
    addTag: (tag: ITag) => void;
    clearTagsList: () => void;
    tagsList: Array<ITag>;
    showSnackBar: (message: string) => void;
}


const MutableTagsList: React.FC<IPropTypes> = ({fetchTagsList, addTag, clearTagsList, tagsList, showSnackBar}) => {
    const {tagCategoryName, nested} = useParams();
    const history = useHistory();
    let match = useRouteMatch();
    const category = (tagCategoryName || '').trim();
    const kindOfAnimal = getLastCategory(nested);
    useEffect(() => {
        if (!!category) {
            fetchTagsList(category, kindOfAnimal);
        }
        return () => {
            clearTagsList();
        }
    }, [category]);

    const onTagFormSubmit = (tagForm: ITag) => {
        addTag(tagForm);
    };

    const tagRedirect = (tag: ITag) => {
        history.push(`${match.url}/${tag.id}`)
    };
    const getTagEditClick = () => isEditSupport(category, kindOfAnimal) ? undefined : tagRedirect;

    const showValidationError = () => {
        showSnackBar(i18n.t('errorTagValidation', {defaultValue: 'At least one field must be filled'}));
    };

    return (
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
                    <TagsListItem
                        key={index}
                        tag={tag}
                        onEditClick={getTagEditClick()}
                        onValidationFailure={showValidationError}
                    />
                ))}
                {isSupportAdd(category, kindOfAnimal) && (
                    <NewTagListItem
                        onTagFormSubmit={onTagFormSubmit}
                        category={buildCategory(category, kindOfAnimal)}
                        kindOfAnimal={buildKindOfAnimal(category, kindOfAnimal)}
                        onValidationFailure={showValidationError}
                    />
                )}
            </div>
        </section>
    )
};

const mapStateToProps = (state: ICustomAppState) => ({
    tagsList: selectTagsListData(state),
    category: selectCategory(state),
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
    fetchTagsList: (categoryName: string, kindOfAnimal ?: string) => dispatch(actionGetTagsList({
        filter: buildFilter(categoryName, kindOfAnimal)
    })),
    addTag: (tag: ITag) => dispatch(actionAddTag(tag)),
    clearTagsList: () => dispatch(actionClearTagsList()),
    showSnackBar: (message: string) => dispatch(actionShowSnackbar(message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MutableTagsList);