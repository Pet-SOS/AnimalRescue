import React, {Dispatch, useEffect, useState} from 'react';
import {AnyAction} from 'redux';
import {connect} from 'react-redux';

import {ITag} from '../../../../api/tags';
import {ELocales} from '../../../../i18n/store/state';
import {actionDeleteTag, actionUpdateTag} from '../../../../store/actions/tags.actions';
import customConfirm from './../../../../components/Confirm';
import './style.scss';
import {ITagForm, TagForm} from '../TagForm/TagForm';
import {getTagNameByLang, prepareTagValues} from '../tags.helper';

interface IPropTypes {
    tag: ITag;
    updateTag: (tag: ITag) => void;
    deleteTag: (tagId: string) => void;
    onLevelClick?: (tag: ITag) => void;
    onValidationFailure?: () => void;
}

const TagsListItem: React.FC<IPropTypes> = ({tag, updateTag, deleteTag, onLevelClick, onValidationFailure}) => {
    const [isEdit, setIsEdit] = useState(false);
    useEffect(() => {
        if (isEdit) {
            setIsEdit(false);
        }
    }, [tag]);
    const getTagName = (lang: ELocales): string => {
        const tagName: string = getTagNameByLang(tag, lang);

        return !!tagName ? tagName : '...';
    };
    const onEditSubmit = (tagForm: ITagForm) => {
        updateTag({
            ...tag,
            values: prepareTagValues(tagForm)
        })
    };
    const onTagDelete = async () => {
        if (tag.isDeletable) {
            const confirm = await customConfirm(
                `Видалити тег '${getTagName(ELocales.ua)}'?`,
                'Видалити',
                'Скасувати'
            );
            if (!!confirm) {
                deleteTag(tag.id as string)
            }
        }
    };

    const handleOnEditClick = () => {
        setIsEdit(true);
    };

    const handleOnLevelClick = () => {
        if (!!onLevelClick) {
            onLevelClick(tag);
        }
    };

    const onCancelEdit = () => {
        setIsEdit(false);
    };

    return isEdit
        ? <TagForm onSubmit={onEditSubmit} onCancel={onCancelEdit} tag={tag} onValidationFailure={onValidationFailure}/>
        : (
            <div className="t-item">
                <div className="row">
                    <div className="col col-ua">{getTagName(ELocales.ua)}</div>
                    <div className="col col-en">{getTagName(ELocales.en)}</div>
                    <div className="col col-de">{getTagName(ELocales.de)}</div>
                    <div className="col col-ru">{getTagName(ELocales.ru)}</div>
                    {!!onLevelClick &&
                    <div className="col col-edit"><i 
                        className="icon-delete"
                        onClick={handleOnLevelClick}>icon</i>
                    </div>                    
                    } 
                    <div className="col col-del"><i className="icon-edit" onClick={handleOnEditClick}>icon</i>
                    </div>
                    <div className="col col-del"><i
                        className={`icon-delete ${tag.isDeletable ? '' : 'disabled'}`}
                        onClick={onTagDelete}>icon</i>
                    </div>
                </div>
            </div>
        )
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
    deleteTag: (tagId: string) => dispatch(actionDeleteTag(tagId)),
    updateTag: (tag: ITag) => dispatch(actionUpdateTag(tag))
});

export default connect(null, mapDispatchToProps)(TagsListItem);
