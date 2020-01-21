import React from 'react';
import { BlogItem } from './item';
import { IBlog } from '../../api/blogs';
import './index.scss';

interface IPropTypes {
    data: IBlog[];
  }

export const BlogsList: React.FC<IPropTypes> = ({ data }) => {
  const leftItem = (): React.ReactNode[] => [...data.slice(0, 1).map(blog => <BlogItem blog={blog} />)];
  const middleItem = (): React.ReactNode[] => [...data.slice(1, 2).map(blog => <BlogItem blog={blog} />)];
  const rightItem = (): React.ReactNode[] => [...data.slice(2, 3).map(blog => <BlogItem blog={blog} />)];
    return (
      <div className="blog-list-holder">
        <div className="left-block">{leftItem}</div>
        <div className="middle-block">{middleItem}</div>
        <div className="left-block">{rightItem}</div>
      </div>
    )
  };