import React, {useState} from "react";
import {TI18n} from "../../../../i18n";
import defaultText from "../../../../i18n/translations/ru";

export interface IBlogFilterProps {
    filterItemInBlog: (item: string) => void;
    initial: string;
}

export const BlogFilter: React.FC<IBlogFilterProps> = ({filterItemInBlog, initial}) => {
    const [activeBtn, setActiveBtn] = useState(initial || 'all');

    const blogFilter: { [key: string]: React.ReactNode } = {
        story: <TI18n keyStr='blogstory'/>,
        article: <TI18n keyStr='blogarticle'/>
    };

    const onItemClick = (item: string) => {
        setActiveBtn(item);
        filterItemInBlog(item);
    };

    return (
        <ul className='box-btn'>
            <li
                className={activeBtn === 'all' ? `active all` : 'all'}
                onClick={() => onItemClick('all')}>
                <TI18n keyStr='blogBtnAll' default={defaultText.blogBtnAll}/>
            </li>
            {
                Object.keys(blogFilter).map((item, i) =>
                    <li
                        onClick={() => onItemClick(item)}
                        key={i}
                        className={activeBtn === item ? `active ${item}` : item}>
                        {blogFilter[item]}
                    </li>
                )
            }
        </ul>
    )
};
