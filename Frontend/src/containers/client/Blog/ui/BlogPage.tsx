import React from "react";
import '../style/blogPage.scss';
import { TI18n } from "../../../../i18n";
import  defaultText  from '../../../../i18n/translations/ru';
import { store } from "../../../../store";
import { IInfoCard, IInfoContacts } from "../../Home/store/state";
import { IBlogItem, IBlogListResponse } from "../../../../api/blog";
import { BlogItem } from "../../../../components/BlogBlock/item";
import { BtnPagination } from "./BtnPagination";
import { IRequestParams, RequestFilterOperators, IRequestFilterParams } from "../../../../api/requestOptions";
import { RouteProps, RouteComponentProps, RouteChildrenProps } from "react-router";

interface IPropTypes {
    infoCard: IInfoCard,
    match: any,
    history: any,
    location:any,
    infoContacts: IInfoContacts,
    blogList:IBlogListResponse,
    fetchBlogList:(params?:any) => any;
    fetchInfoCard:() => void;
    fetchInfoContacts:() => void;
} 
type MyState = { activeBtn: string };
interface RouteParams {id: string, params?: string}
export class BlogPage extends React.Component<IPropTypes , MyState> {
    blogFilter : {[key: string]: string}= {
        blog: 'Блог',
        story:'Истории успеха',
        article:'Полезные советы'
    }
    blogType:any = new Object();
 
    constructor(props:IPropTypes) {
        super(props);
        this.state = {activeBtn: 'all'};
    }
    filterParams = {
        fieldName: 'type',
        opeartor: RequestFilterOperators.EQ,
        value: ''
    }
    componentDidMount(){
        if(store.getState().blogs.blogList.totalCount === 0){
            if(this.props.location.search!==''){
                const paramsSerch = this.props.location.search.split('=')[1];
                this.filterParams.value =  paramsSerch;
                this.setState ( prevState => ({
                    activeBtn: paramsSerch
                }))
                this.props.fetchBlogList({
                    page: +this.props.match.params.page,
                    size:15,
                    filter: this.filterParams
                });
            } else{
                this.props.fetchBlogList({
                    page: +this.props.match.params.page,
                    size:15
                });
            }
           
            this.props.fetchInfoCard();
            this.props.fetchInfoContacts();
        }
    }
    filterItemInBlog(typeBtn:string){
        this.setState ( prevState => ({
            activeBtn: typeBtn
        }))
        if (+this.props.match.params.page > 1){
            this.props.history.push(`/blog/page/1`);
           
        }
        if(typeBtn!=='all'){
            this.props.history.push({
                pathname: '/blog/page/1',
                search: "?type=" +  typeBtn
            })
        }else{
            this.props.history.push({
                pathname: '/blog/page/1'
            }) 
        }
       
        this.filterParams.value = typeBtn
        const params  = {
            size: 15,
            filter: typeBtn === 'all'? null : this.filterParams,
        }
  
        this.props.fetchBlogList({...params})
    }
    goToPagination(toPage:string| number){
        if(this.props.location.search!==''){

            this.filterParams.value = this.state.activeBtn
            this.props.fetchBlogList({
                page: toPage,
                size: 15,
                filter: this.filterParams
            })
            this.props.history.push({
                pathname: `/blog/page/${toPage}`,
                search: "?type=" +  this.state.activeBtn
            })
            return;
        }else{
            this.props.fetchBlogList({
                page: toPage,
                size: 15,
            })
            this.props.history.push({
                pathname: `/blog/page/${toPage}`
            }) 
        }
       
    }
 
    render(){
        return (
            <div className="blog-page">
                <div className='content'>
                    <div className="title"> <TI18n keyStr='blogPageTitle' default={defaultText.blogPageTitle}/></div>
                    <ul className='box-btn'>
                       <li 
                        className={this.state.activeBtn === 'all' ? `active all`: 'all'}
                        onClick={(e) => this.filterItemInBlog('all')}><TI18n keyStr='blogBtnAll' default={defaultText.blogBtnAll}/></li>
                        {
                            Object.keys(this.blogFilter).map((item,i)=>
                                <li
                                onClick={(e) => this.filterItemInBlog(item)}
                                key={i}
                                className={this.state.activeBtn === item ? `active ${item}`: item}
                                >{this.blogFilter[item]}</li>
                            )
                        }
                     </ul>
                    <ul className='box-articles'>
                    {
                       this.props.blogList.data.map((item:IBlogItem, i:number)=>
                    <div
                        className='article'
                        key={i}>
                        <BlogItem
                            key={item.title}
                            image={item.imageIds[0]}
                            title={item.title}
                            id={item.id ? item.id : ''}
                            text={item.type}
                         />
                        </div>
                        )
                    }
                    </ul>
                    <BtnPagination
                        setProps={this.props}
                        pageCount={this.props.blogList.pageCount}
                        goToPagination={this.goToPagination.bind(this)}
                    />
                </div>
            </div>
        )
    }
}