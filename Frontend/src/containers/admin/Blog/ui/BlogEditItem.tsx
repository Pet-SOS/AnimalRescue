import React, { useEffect } from 'react';
import { BlogContainerPage } from './BlogContainerPage';
import { Button, ButtonTypes } from '../../../../components/Button';
import { useHistory, useParams } from 'react-router';
import { TI18n } from '../../../../i18n';
import { IBlogItem } from '../../../../api/blog';
import { BlogEditForm } from './BlogEditForm';

export interface IBlogEditItemProps {
  blog?: IBlogItem;
  fetchBlogItem: (id: string) => void;
  isLoaded?: boolean;
  isLoading?: boolean;
  reset: () => void;
  update: (blog: IBlogItem) => void;
  baseUrl: string;
}

export const BlogEditItem: React.FC<IBlogEditItemProps> = ({
  isLoaded,
  isLoading,
  fetchBlogItem,
  blog,
  reset,
  update,
  baseUrl,
}) => {
  const history = useHistory();
  const { blogId } = useParams();

  useEffect(() => {
    if (blogId && !isLoaded && !isLoading) {
      fetchBlogItem(blogId);
    }
  });

  useEffect(() => {
    return () => {
      reset();
    };
  }, []);

  return (
    <BlogContainerPage>
      <header>
        <Button
          className="icon-arrow-left"
          styleType={ButtonTypes.WhiteCircle}
          onClick={history.goBack}
        />
        <h3>
          <TI18n keyStr="blogPageTitle" default={'Блог'} />
        </h3>
        {isLoaded && (
          <BlogEditForm baseUrl={baseUrl} blog={blog} onUpdate={update} />
        )}
      </header>
    </BlogContainerPage>
  );
};
