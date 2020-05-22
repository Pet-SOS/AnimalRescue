import React from "react";
import {BlogContainerPage} from "./BlogContainerPage";
import {Button, ButtonTypes} from "../../../../components/Button";
import {useHistory} from "react-router";
import {TI18n} from "../../../../i18n";

export interface IBlogEditItemProps {

}

export const BlogEditItem: React.FC<IBlogEditItemProps> = ({}) => {
    const history = useHistory();

    return (
        <BlogContainerPage>
            <header>
                <Button
                    className="icon-arrow-left"
                    styleType={ButtonTypes.WhiteCircle}
                    onClick={history.goBack}
                />
                <h3><TI18n keyStr="blogPageTitle" default={'Блог'}/></h3>
            </header>
        </BlogContainerPage>
    )
};
