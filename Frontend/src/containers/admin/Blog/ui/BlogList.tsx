import React, {useEffect} from "react";
import {BtnPagination} from "../../../client/Blog/ui/BtnPagination";
import {useParams, useRouteMatch} from "react-router";
import {IBlogItem, IBlogListResponse} from "../../../../api/blog";
import {BlogContainerPage} from "./BlogContainerPage";


interface IBlogListPageProps {
    blogList: IBlogListResponse,
    fetchBlogList: (params?: any) => any;
}


export const BlogList: React.FC<IBlogListPageProps> = ({blogList, fetchBlogList}) => {
    const contantSize = 15;
    const match = useRouteMatch();
    const {page} = useParams();

    useEffect(() => {
        if (blogList.totalCount === 0) {
            fetchBlogList({
                page: +(page || 1),
                size: contantSize
            });
        }
    });

    const handleGoToPage = (ulr: string) => {

    };


    return (
        <BlogContainerPage>
            <>
                {blogList.data && blogList.data.map((item: IBlogItem, i: number) => (
                    <li key={i}>
                        {item.title}
                    </li>))}

                <BtnPagination
                    pageCount={blogList.pageCount}
                    setProps={{match}}
                    goToPagination={handleGoToPage}
                />
            </>
        </BlogContainerPage>
    );
};



