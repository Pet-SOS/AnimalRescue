import React, { useState, useEffect } from 'react';
import '../style/btnPagination.scss';
import { IInfoCard, IInfoContacts } from '../../Home/store/state';
import { IBlogListResponse } from '../../../../api/blog';
import { IRequestParams } from '../../../../api/requestOptions';
import { Link } from 'react-router-dom';

interface IPropTypes {
    fetchBlogList:(params: IRequestParams) => any;
    pageCount: number;
    pageNumber: number;
} 

export const BtnPagination: React.FC<any> = ({pageCount, fetchBlogList, setProps})=>{
    
    let arrForPage: number[]=[];
    for (let i = 0; i < pageCount; i++) {
        arrForPage.push(i+1);
    }

    const startPagination = arrForPage[0];
    const endPagination = arrForPage[arrForPage.length -1]

    const { match, history } = setProps;

      const goToSelectPage = (iter: number) => {
        fetchBlogList({
            page:iter
        })
    }
    const goToStepPrev=()=>{
        if((match.params && match.params.page) > startPagination){
            const urlPage = +match.params.page-1;
            history.push(`/blog/page/${urlPage}`)
            fetchBlogList({
                page:urlPage
            })
        }
    }
    const goToSelectNext=()=>{
        if((match.params && match.params.page) < endPagination){
            const urlPage = +match.params.page+1;
            history.push(`/blog/page/${+match.params.page+1}`)
            fetchBlogList({
                page:urlPage
            })
        }
    }
    return(
        <div className='box-pagination'>
        <div className="prev" onClick={()=>{goToStepPrev()}}></div>
       {
        arrForPage.map((iter, index)=>
            <Link to={`/blog/page/${iter}`} className = {+match.params.page === iter?'pagination active': 'pagination'} onClick={()=>{goToSelectPage(iter)}}>{iter}</Link>
        )
       }
        <div className="next" onClick={()=>{goToSelectNext()}}></div>
    </div>
    ) 
}