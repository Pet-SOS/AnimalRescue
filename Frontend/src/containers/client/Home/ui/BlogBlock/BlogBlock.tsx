import React from 'react';
import { IBlockLinkPropTypes, BlockLink } from '../../../../../components/BlockLink';
import { BlogCard } from './../../../Blog/ui/BlogCard';
import { IBlogItem } from '../../../../../api/blog';
import './index.scss';
interface IPropTypes {
    title: string | React.ReactNode;
    data: IBlogItem[]
    link?: IBlockLinkPropTypes
  }

  export const BlogBlock: React.FC<IPropTypes> = ({ title, link, data }) => {
    return (
      <div className="blog-block-container">
          <div className="content">
            <div className="column-container">
                <div className="left-block title">{title}</div>
                {!!link && !!link.href && <div className="right-block">
                    <BlockLink {...link}/>
                </div>}
                  
            </div>
            <ul className="blog-list-holder">
              { 
                data.map((blog)=> (
                  <li key={blog.id}>
                    <BlogCard 
                      image={blog.imageIds[0]}
                      text={blog.type}
                      title={blog.title}
                      id={blog.id ? blog.id : ''}
                    />
                  </li>
                ))
              }
            </ul>
            <div className="bottom-redirect">
                    {!!link && !!link.href && <BlockLink {...link}/>}
                </div> 
          </div>
      </div>
    );
  }
 