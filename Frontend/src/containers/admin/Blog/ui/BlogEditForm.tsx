import {HtmlEditor, styleCard} from "../../../../components/HtmlEditor";
import React, {useEffect, useState} from "react";
import {ELocales} from "../../../../i18n/store/state";
import {IBlogItem} from "../../../../api/blog";
import {CheckBoks} from "../../../../components/CheckBoks";
import {isArticle, isStory} from "../utils";

interface IBlogEditFormProps {
    blog?: IBlogItem
}

interface IBlogFields {
    id?: string
    title: string;
    text: string;
    isStory: boolean,
    isArticle: boolean,
}

const DEFAULT_BLOG_FIELDS: IBlogFields = {
    title: '',
    text: '',
    isStory: false,
    isArticle: false,

};

const mapBlogToFields = (blog?: IBlogItem): IBlogFields => {
    if (blog) {
        return {
            id: blog.id,
            title: blog.title || '',
            text: blog.body || '',
            isStory: isStory(blog),
            isArticle: isArticle(blog),
        }
    } else {
        return {...DEFAULT_BLOG_FIELDS}
    }


};

export const BlogEditForm: React.FC<IBlogEditFormProps> = ({blog}) => {

    const [fields, setFields] = useState(mapBlogToFields(blog));

    useEffect(() => {

    });

    const onFieldChanged = () => {
    };

    const onChange = (editorState: any) => {
        setFields((prevState: IBlogFields) => {
            return {...prevState, text: editorState}
        });
    };

    const onCheckBoxChanged = (tag: string) => {
        setFields((prevState: IBlogFields) => {
            let article = prevState.isArticle;
            let story = prevState.isStory;
            if (tag === 'isArticle') {
                story = prevState.isArticle;
                article = !story
            }
            if (tag === 'isStory') {
                article = prevState.isStory;
                story = !article
            }
            return {
                ...prevState,
                isStory: story,
                isArticle: article
            }
        })
    };

    return (
        <div>
            <div>Заголовок</div>
            <input
                type='text'
                name={ELocales.ua}
                placeholder='Українська'
                onChange={(e) => onFieldChanged()}
                value={fields.title}
            />
            <div>Розділ</div>
            <div>
                <CheckBoks
                    name={"Корисні статті"}
                    setCheckboxCheck={onCheckBoxChanged}
                    state={fields.isArticle}
                    tag={"isArticle"}
                />
                <CheckBoks
                    name={"Історії успіху"}
                    setCheckboxCheck={onCheckBoxChanged}
                    state={fields.isStory}
                    tag={"isStory"}
                />
            </div>

            <div>Текст</div>
            <HtmlEditor
                editorState={fields.text}
                onChange={onChange}
                classList={styleCard}
            />
        </div>
    )
};
