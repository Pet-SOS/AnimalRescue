import React, {useEffect} from "react";
import {BtnPagination} from "../../../client/Blog/ui/BtnPagination";
import {useHistory, useLocation, useParams, useRouteMatch} from "react-router";
import {IBlogItem, IBlogListResponse} from "../../../../api/blog";
import {BlogContainerPage} from "./BlogContainerPage";
import {BlogListItem} from "./BlogListItem";
import '../styles/styles.scss'
import {TI18n} from "../../../../i18n";
import {BlogFilter} from "./BlogFilter";
import {RequestFilterOperators} from "../../../../api/requestOptions";


interface IBlogListPageProps {
    blogList: IBlogListResponse,
    fetchBlogList: (params?: any) => void;
    clearList: () => void;
}


export const BlogList: React.FC<IBlogListPageProps> = ({blogList, fetchBlogList, clearList}) => {
    const contentSize = 10;
    const match = useRouteMatch();
    const {page} = useParams();
    const history = useHistory();
    const location = useLocation();

    let search: string = '';
    if (location.search !== '') {
        search = location.search.split('=')[1];
    }

    useEffect(() => {

        if (blogList.totalCount === 0) {
            if (location.search !== '') {
                filterParams.value = search;
                fetchBlogList({
                    page: +(page || 1),
                    size: contentSize,
                    filter: filterParams
                });

            } else {
                fetchBlogList({
                    page: +(page || 1),
                    size: contentSize
                });
            }
        }
    });

    let filterParams = {
        fieldName: 'type',
        operator: RequestFilterOperators.EQ,
        value: ''
    };

    const handleGoToPage = (toPage: string) => {
        onUpdate(toPage);
    };

    const handleOnItemEditCLick = (blogItem: IBlogItem) => {
        history.push({
            pathname: `/admin/blog/${blogItem.id}`,
        });
    };

    const handleOnItemDeleteCLick = (blogItem: IBlogItem) => {
        // TODO
    };

    const filterItemInBlog = (filter: string) => {
        onUpdate(undefined, filter, true)
    };

    const onUpdate = (toPage: string = (page || '1'), filter: string = search, reset: boolean = false) => {
        let toSearch = !filter || filter === 'all' ? '' : filter;
        let targetPage = reset ? '1' : toPage;

        clearList();
        if (toSearch !== '') {
            filterParams.value = toSearch;
            fetchBlogList({
                page: targetPage,
                size: contentSize,
                filter: filterParams
            });

        } else {
            fetchBlogList({
                page: targetPage,
                size: contentSize
            });
        }

        history.push({
            pathname: `/admin/blog/page/${targetPage}`,
            search: toSearch ? "?type=" + toSearch : ''
        })
    };


    return (
        <BlogContainerPage>
            <header><h3><TI18n keyStr="blogPageTitle" default={'Блог'}/></h3></header>
            <BlogFilter
                initial={search}
                filterItemInBlog={filterItemInBlog}
            />
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



