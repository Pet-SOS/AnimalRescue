import React from "react";
import '../style/blogPage.scss';
import { TI18n } from "../../../../i18n";
import  defaultText  from '../../../../i18n/translations/ru';
import { store } from "../../../../store";
import { IInfoCard, IInfoContacts } from "../../Home/store/state";
import { IBlogItem, IBlogListResponse } from "../../../../api/blog";
import { BlogItem } from "../../../../components/BlogBlock/item";
import { BtnPagination } from "./BtnPagination";

interface IPropTypes {
    infoCard: IInfoCard,
    infoContacts: IInfoContacts,
    blogList:IBlogListResponse,
    fetchBlogList:() => void;
    fetchInfoCard:() => void;
    fetchInfoContacts:() => void;
} 
type MyState = { activeBtn: string };
export class BlogPage extends React.Component<IPropTypes, MyState> {
    blogType:any = new Object();
 
    constructor(props:IPropTypes) {
        super(props);
        this.state = {activeBtn: 'all'};
    }
    componentDidMount(){
        if(store.getState().blogs.blogList.totalCount === 0){
            this.props.fetchBlogList();
            this.props.fetchInfoCard();
            this.props.fetchInfoContacts();
        }
    }
    filterItemInBlog(typeBtn:string){
        this.setState ( prevState => ({
            activeBtn: typeBtn
            }))
    }
 
    render(){
        this.props.blogList.data.map(item=>{
            this.blogType[item.type] = item.type;
        })
        return (
            <div className="blog-page">
                <div className='content'>
                    <div className="title"> <TI18n keyStr='blogPageTitle' default={defaultText.blogPageTitle}/></div>
                    <ul className='box-btn'>
                        <li 
                        className={this.state.activeBtn === 'all' ? `active all`: 'all'}
                        onClick={(e) => this.filterItemInBlog('all')}><TI18n keyStr='blogBtnAll' default={defaultText.blogBtnAll}/></li>
                        {
                            Object.keys(this.blogType).map((item,i)=>
                                <li
                                onClick={(e) => this.filterItemInBlog(item)}
                                key={i}
                                className={this.state.activeBtn === item ? `active ${item}`: item}
                                >{item}</li>
                            )
                        }
                     </ul>
                    <ul className='box-articles'>
                    {
                       this.props.blogList.data.map((item:IBlogItem, i:number)=>
                    <div 
                        className={(this.state.activeBtn === 'all'|| this.state.activeBtn === item.type) ? `article`: 'article hide-item'}
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
                        fetchBlogList={this.props.fetchBlogList}
                    />
                </div>
            </div>
        )
    }
}