import React from 'react';
import '../style/btnPagination.scss';

import { IRequestParams } from '../../../../api/requestOptions';


interface IPropTypes {
    fetchBlogList:(params: IRequestParams) => any;
    pageCount: number;
    pageNumber: number;
} 

export const BtnPagination: React.FC<any> = ({pageCount, setProps, goToPagination})=>{
    let arrForPage: number[]= new Array();
    for (let i = 0; i < pageCount; i++) {
        arrForPage.push(i+1);
    }
    const startPagination = arrForPage[0];
    const endPagination = arrForPage[arrForPage.length -1]
    
    const { match } = setProps;
    const goToStepPrev=()=> {
        if((match.params && match.params.page) > startPagination){
            const urlPage = +match.params.page-1;
            goToPagination(urlPage);
        }
    }

    const goToSelectNext=()=> {
        if((match.params && match.params.page) < endPagination){
            const urlPage = +match.params.page+1;
            goToPagination(urlPage);
        }
    }

    const classList =(obj: any)=> {
        let strList = '';
        for(let key in obj){
            if(obj[key]){
                
                strList = strList + ' '+ key
            }
        }
        return strList;
    }

   const isHidePages = (iter:number)=> {
        if(+match.params.page < 5 && iter > 5 && iter !== endPagination){
            return true;
        }
        if(+match.params.page >= 5 && +match.params.page - 2 > iter && iter!== startPagination){
            return true;
        }
        if(+match.params.page >= 5 && +match.params.page + 2 < iter && iter!==endPagination){
            return true;
        }
    }

    const isLastPage=(iter:number)=> {
        if(+match.params.page!==endPagination &&
            iter === endPagination &&
            +match.params.page+2 < endPagination &&
            +match.params.page+3 != endPagination){
            return true;
        }
    }

    const isFirstPage =(iter:number)=> {
        if(iter === startPagination && +match.params.page-3 > startPagination){
            return true;
        }
    }

    return(
        <>
        {arrForPage.length > 0 &&
            <div className='box-pagination'>
               {+match.params.page >1 && <div className="prev" onClick={()=>{goToStepPrev()}}></div>}
                {
                    arrForPage.map((iter, index)=>
                        <div
                            onClick={()=>{goToPagination(iter)}}
                            key={index}
                            className = {classList({
                                'pagination': true,
                                'first':isFirstPage(iter),
                                'last': isLastPage(iter),
                                'active': +match.params.page === iter,
                                'hide': isHidePages(iter)
                            })}
                        >{iter}
                        </div>
                    )
                }
                {+match.params.page < endPagination &&<div className="next" onClick={()=>{goToSelectNext()}}></div>}
            </div>
        }
        </>
    ) 
}