import React, {useEffect} from "react";
import {BtnPagination} from "../../../client/Blog/ui/BtnPagination";
import {useHistory, useParams, useRouteMatch} from "react-router";
import {IBlogItem, IBlogListResponse} from "../../../../api/blog";
import {BlogContainerPage} from "./BlogContainerPage";
import {BlogListItem} from "./BlogListItem";
import '../styles/styles.scss'
import {TI18n} from "../../../../i18n";


interface IBlogListPageProps {
    blogList: IBlogListResponse,
    fetchBlogList: (params?: any) => any;
}


export const BlogList: React.FC<IBlogListPageProps> = ({blogList, fetchBlogList}) => {
    const contentSize = 10;
    const match = useRouteMatch();
    const {page} = useParams();
    const history = useHistory();

    useEffect(() => {
        if (blogList.totalCount === 0) {
            fetchBlogList({
                page: +(page || 1),
                size: contentSize
            });
        }
    });

    const handleGoToPage = (toPage: string) => {
        fetchBlogList({
            page: toPage,
            size: contentSize
        });
        history.push({
            pathname: `/admin/blog/page/${toPage}`,
        });
    };

    const handleOnItemEditCLick = (blogItem: IBlogItem) => {
    };

    const handleOnItemDeleteCLick = (blogItem: IBlogItem) => {
    };


    return (
        <BlogContainerPage>
            <header><h3><TI18n keyStr="blogPageTitle" default={'Блог'}/></h3></header>
            <div className={'section-table blog-table'}>
                <header>
                    <div className="row">
                        <div className="col col-title">
                            <TI18n keyStr="blogTitle" default={'Title'}/>
                        </div>
                        <div className="col col-type">
                            <TI18n keyStr="blogSection" default={'Section'}/>
                        </div>
                        <div className="col col-modified">
                            <TI18n keyStr="blogLastModified" default={'Last modified'}/>
                        </div>
                    </div>
                </header>

                {blogList.data && blogList.data.map((item: IBlogItem, i: number) => (
                    <BlogListItem
                        key={i}
                        blogItem={item}
                        onEditClick={handleOnItemEditCLick}
                        onDeleteClick={handleOnItemDeleteCLick}
                    />
                ))}
                <BtnPagination
                    pageCount={blogList.pageCount}
                    setProps={{match}}
                    goToPagination={handleGoToPage}
                />
            </div>
        </BlogContainerPage>
    );
};



