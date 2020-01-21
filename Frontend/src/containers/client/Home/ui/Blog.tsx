import React from 'react';
import { IBlockLinkPropTypes, BlockLink } from '../../../../components/BlockLink';
import { BlogsList } from '../../../../components/BlogBlock';
import { IBlog } from "../../../../api/blogs";
import '../styles/Blog.scss';

interface IPropTypes {
    title: string | React.ReactNode;
    data: IBlog[]
    link?: IBlockLinkPropTypes
  }

  export const BlogBlock: React.FC<IPropTypes> = ({ title, link, data}) => {
    return (
      <div className="blog-block-container">
          <div className="content">
            <div className="column-container">
                <div className="left-block text title">{title}</div> 
                <div className="right-block text">
                    {!!link && !!link.href && <BlockLink {...link}/>}
                </div>  
            </div>
            <BlogsList data={data}/>
          </div>
      </div>
    )
  }