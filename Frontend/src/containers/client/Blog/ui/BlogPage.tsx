import React from "react";
import '../style/blogPage.scss';
import { TI18n } from "../../../../i18n";
import  defaultText  from '../../../../i18n/translations/ru';
import { store } from "../../../../store";
import { IInfoCard, IInfoContacts } from "../../Home/store/state";
import { IBlogItem } from "../../../../api/blog";

interface IPropTypes {
    infoCard: IInfoCard,
    infoContacts: IInfoContacts,
    blogList: any,
    fetchBlogList:() => void;
    fetchInfoCard:() => void;
    fetchInfoContacts:() => void;
} 

export class BlogPage extends React.Component<IPropTypes> {

    componentDidMount(){
        if(store.getState().blogs.blogList.totalCount === 0){
            this.props.fetchBlogList();
            this.props.fetchInfoCard();
            this.props.fetchInfoContacts();
        }
    }
    render(){
        return (
            <div className="blog-page">
                <div className='content'>
                    <div className="title"> <TI18n keyStr='blogPageTitle' default={defaultText.blogPageTitle}/></div>
                    <div>
                    {
                        // this.props.blogList.data.map((item,i)=>{
                        //     <div>item</div>
                        // })
                    }
                    </div>
                </div>
            </div>
        )
    }
}