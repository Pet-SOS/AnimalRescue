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
      <section className="blog-block-container">
          <div className="container">
              <div className="heading-list">
                  <h3>{title}</h3>
                  {!!link && !!link.href && <BlockLink {...link}/>}
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
      </section>
    );
  }
 