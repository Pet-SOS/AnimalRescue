import {HtmlEditor, styleCard} from "../../../../components/HtmlEditor";
import React, {useState} from "react";
import {ELocales} from "../../../../i18n/store/state";
import {BlogTypes, IBlogItem} from "../../../../api/blog";
import {CheckBoks} from "../../../../components/CheckBoks";
import {isArticle, isStory} from "../utils";
import {Button, ButtonTypes} from "../../../../components/Button";

interface IBlogEditFormProps {
    blog?: IBlogItem,
    onUpdate: (blog: IBlogItem) => void;
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

export const BlogEditForm: React.FC<IBlogEditFormProps> = ({blog, onUpdate}) => {

    const [fields, setFields] = useState(mapBlogToFields(blog));


    const onTitleChanged = (title: string) => {
        setFields((prevState: IBlogFields) => {
            return {...prevState, title: title}
        });
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

    const handleSubmit = () => {
        if (blog && blog.id)
            onUpdate({
                ...blog,
                title: fields.title,
                body: fields.text,
                type: fields.isStory ? BlogTypes.STORY : BlogTypes.ARTICLE
            })
    };

    return (
        <div>
            <div>Заголовок</div>
            <input
                type='text'
                name={ELocales.ua}
                placeholder='Заголовок'
                onChange={(e) => onTitleChanged(e.target.value)}
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

            <Button
                onClick={handleSubmit}
                styleType={ButtonTypes.Blue}
            >Зберегти зміни</Button>
        </div>
    )
};
