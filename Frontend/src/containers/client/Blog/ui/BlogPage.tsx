import React from "react";
import '../style/blogPage.scss';
import { TI18n } from "../../../../i18n";
import  defaultText  from '../../../../i18n/translations/ru';
import { store } from "../../../../store";
import { IInfoCard, IInfoContacts } from "../../Home/store/state";
import { IBlogItem, IBlogListResponse } from "../../../../api/blog";
import { BlogCard } from "./BlogCard";
import { BtnPagination } from "./BtnPagination";
import { RequestFilterOperators } from "../../../../api/requestOptions";


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

export class BlogPage extends React.Component<IPropTypes , MyState> {
    contantSize = 6;
    blogFilter : {[key: string]: React.ReactNode}= {
        story: <TI18n keyStr='blogstory'/>,
        article:<TI18n keyStr='blogarticle'/>
    }
    blogType:any = new Object();

    constructor(props:IPropTypes) {
        super(props);
        this.state = {activeBtn: 'all'};
    }
    filterParams = {
        fieldName: 'type',
        operator: RequestFilterOperators.EQ,
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
                    size:this.contantSize,
                    filter: this.filterParams
                });
            } else{
                this.props.fetchBlogList({
                    page: +this.props.match.params.page,
                    size:this.contantSize
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
            size: this.contantSize,
            filter: typeBtn === 'all'? null : this.filterParams,
        }

        this.props.fetchBlogList({...params})
    }
    goToPagination(toPage:string| number){
        if(this.props.location.search!==''){

            this.filterParams.value = this.state.activeBtn
            this.props.fetchBlogList({
                page: toPage,
                size: this.contantSize,
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
                size: this.contantSize,
            })
            this.props.history.push({
                pathname: `/blog/page/${toPage}`
            })
        }

    }

    render(){
        return (
            <div className="blog-page">
                <div className='container'>
                    <h2 className="title"> <TI18n keyStr='blogPageTitle' default={defaultText.blogPageTitle}/></h2>
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
                    <div className="hold-content-items section-margin">
                        <ul className='box-articles'>
                          {this.props.blogList.data.map((item:IBlogItem, i:number)=> (
                            <li key={i}>
                              <BlogCard
                                image={item.imageIds[0]}
                                title={item.title}
                                id={item.id ? item.id : ''}
                                text={item.type}
                              />
                            </li>
                          ))}
                        </ul>
                        <BtnPagination
                            setProps={this.props}
                            pageCount={this.props.blogList.pageCount}
                            goToPagination={this.goToPagination.bind(this)}
                        />
                    </div>
                </div>
            </div>
        )
    }
}
