import React, {useEffect, useState} from "react";
import {ITagForm, TagForm} from "../TagForm/TagForm";
import {ITag} from "../../../../api/tags";
import {prepareTagValues} from "../tags.helper";


interface INewTagListItemProps {
    onTagFormSubmit: (tagForm: ITag) => void;
    category: string;
    kindOfAnimal?: string;
}

export const NewTagListItem: React.FC<INewTagListItemProps> = ({category, kindOfAnimal, onTagFormSubmit}) => {
    const [isTagFormActive, setIsTagFormActive] = useState(false);
    useEffect(() => {
        if (isTagFormActive) {
            setIsTagFormActive(false)
        }
    });

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
        setIsTagFormActive(false)
    };

    const onNewClick = () => {
        setIsTagFormActive(true)
    };

    return isTagFormActive ? (<TagForm onSubmit={onSubmit} onCancel={onCancel}/>) : (
        <div className="t-item">
            <div className="row">
                <React.Fragment>
                    <div className="col col-ua">
                        <a onClick={onNewClick}>+ новый тег</a>
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
    );
};
