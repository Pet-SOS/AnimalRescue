import React from 'react';
import '../style/btnPagination.scss';

import { IRequestParams } from '../../../../api/requestOptions';
import { Link } from 'react-router-dom';

interface IPropTypes {
    fetchBlogList:(params: IRequestParams) => any;
    pageCount: number;
    pageNumber: number;
} 

export const BtnPagination: React.FC<any> = ({pageCount, setProps, goToPagination})=>{
    
    let arrForPage: number[]=[];
    for (let i = 0; i < pageCount; i++) {
        arrForPage.push(i+1);
    }

    const startPagination = arrForPage[0];
    const endPagination = arrForPage[arrForPage.length -1]

    const { match } = setProps;

    const goToStepPrev=()=>{
        if((match.params && match.params.page) > startPagination){
            const urlPage = +match.params.page-1;
            goToPagination(urlPage);
        }
    }
    const goToSelectNext=()=>{
        if((match.params && match.params.page) < endPagination){
            const urlPage = +match.params.page+1;
            goToPagination(urlPage);
        }
    }
    return(
        <div className='box-pagination'>
        <div className="prev" onClick={()=>{goToStepPrev()}}></div>
       {
        arrForPage.map((iter, index)=>
            <div className = {+match.params.page === iter?'pagination active': 'pagination'} onClick={()=>{goToPagination(iter)}}>{iter}</div>
        )
       }
        <div className="next" onClick={()=>{goToSelectNext()}}></div>
    </div>
    ) 
}