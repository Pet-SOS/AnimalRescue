import React from 'react';
import { Provider } from 'react-redux';
import { message } from 'antd';
import { store } from '../../../../store';
import { BlogContainerPage } from './BlogContainerPage';
import { Button, ButtonTypes } from '../../../../components/Button';
import { useHistory } from 'react-router';
import { TI18n } from '../../../../i18n';
import { IBlogItem, createBlogItem } from '../../../../api/blog';
import { BlogEditForm } from './BlogEditForm';

export interface IBlogEditItemProps {}

export const BlogCreateItem: React.FC<IBlogEditItemProps> = () => {
  const history = useHistory();

  const blog = {
    id: '_',
    type: '',
    title: '',
    body: '',
    images: [],
    imageIds: [],
    tags: [],
  };
  const update = async (item: IBlogItem) => {
    try {
      const response = await createBlogItem(item);
      if (response.status === 201) {
        history.push({
          pathname: '/admin/blog/',
        });
        history.go(0);
      }
    } catch (e) {
      message.error({
        content: (
          <Provider store={store}>
            <TI18n
              keyStr="smthWentWrong"
              default="Щось пішло не так... Спробуйте, будь ласка, спробуйте пізніше"
            />
          </Provider>
        ),
      });
    }
  };

  return (
    <BlogContainerPage>
      <header>
        <Button
          className="icon-arrow-left"
          styleType={ButtonTypes.WhiteCircle}
          onClick={history.goBack}
        />
        <BlogEditForm baseUrl={'_'} blog={blog} onUpdate={update} />
      </header>
    </BlogContainerPage>
  );
};
