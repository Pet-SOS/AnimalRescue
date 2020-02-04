import React, { useEffect } from 'react';
import { TI18n } from '../../../../i18n';
import './index.scss';
import { useParams } from 'react-router-dom';
import { IBlogItemState } from '../store/state/blogitem.state';
import { useSelector, shallowEqual } from 'react-redux';
import { store } from '../../../../store';
import { selectBlogItem } from '../store/selectors/blogitem.selectors';
import { ERequestStatus } from '../../../../api';
import { BlockLink } from '../../../../components/BlockLink';
import { Banner } from '../../../../components/Banner';
import { BlogTypes, IBlogListResponse } from '../../../../api/blog';
import { selectInfoContacts } from '../../Home/store/selectors';
import { IRequestParams, RequestFilterOperators } from '../../../../api/requestOptions';
import { BlogBlock } from '../../Home/ui/Blog';

interface IPropTypes {
  fetchBlogItem: (id: string) => void;
  clearBlogItemState: () => void;
  fetchBlogList: (requestParams?: IRequestParams) => void;
  clearBlogsState: () => void;
  blogItem: IBlogItemState;
  blogList: IBlogListResponse;
}

export const BlogItemPageComponent: React.FC<IPropTypes> = ({
  fetchBlogItem,
  clearBlogItemState,
  blogItem,
  fetchBlogList,
  blogList,
  clearBlogsState
}) => {
  const { blogId } = useParams();
  const { isLoading, isLoaded } = useSelector(() => selectBlogItem(store.getState()), shallowEqual);
  const { status } = useSelector(() => selectBlogItem(store.getState()).requestState, shallowEqual);
  const { phones } = useSelector(() => selectInfoContacts(store.getState()).data);
  useEffect(() => {
    if (!!blogId) {
      fetchBlogItem(blogId);
    }
    return () => {
      clearBlogItemState();
      clearBlogsState();
    }
  }, [blogId]);
  useEffect(() => {
    if (status === ERequestStatus.SUCCESS) {
      const requsetParams: IRequestParams = {
        filter: {
          fieldName: 'type',
          opeartor: RequestFilterOperators.ALL,
          value: blogItem.data.type === BlogTypes.STORY ? BlogTypes.STORY : BlogTypes.ARTICLE
        }
      }
      fetchBlogList(requsetParams);
    }
  }, [status])
  const getItemDateString = (): string => {
    if (!blogItem.data.createdAt) {
      return '';
    }
    const currentItemDate: Date = new Date(blogItem.data.createdAt);
    return `${currentItemDate.getDate()}.${currentItemDate.getMonth() < 9 ? `0${currentItemDate.getMonth() + 1}` : currentItemDate.getMonth() + 1}.${currentItemDate.getFullYear()}`;
  }
  const getItemSubtitle = (): JSX.Element => {
    const dateString = getItemDateString();
    const itemTypeSubtitle = blogItem.data.type === BlogTypes.ARTICLE ? <TI18n keyStr='usefulAdvices' default='Полезные советы' /> : <TI18n keyStr='successStories' default='Истории успеха' />
    return <React.Fragment>{!!dateString ? <span className='item-date'>{dateString}</span> : ''}{itemTypeSubtitle}</React.Fragment>
  }
  
  return (
    <div className='blog-item-page-holder'>
      <div className='content'>
        <div className='back-link-holder'>
          <BlockLink
            title={<TI18n keyStr='backToBlog' default='Назад в блог' />}
            href={'/blog/page/1'}
            isBack
          />
        </div>
        {!isLoaded && !isLoading && status === ERequestStatus.FAILURE && <div>Not found</div>}
        {isLoaded && !isLoading && <React.Fragment>
          <Banner title={blogItem.data.title} subTitle={getItemSubtitle()} imgLink={blogItem.data.imageIds[0]}/>
          <div className='blog-item-content'>
            <div className='story-body'>{blogItem.data.body}</div>
            {blogItem.data.type === BlogTypes.ARTICLE && <div className='warning'>
              <p>
                <TI18n
                  keyStr='blogItemWarning'
                  default={`Маєте змогу допомогти будиночками для безпритульних, руками або сировиною для виготовлення, зв'яжіться з нами за телефоном`} />
              </p>
              {!!phones && !!phones[0] && <strong><a className='number' href={`tel:${phones[0]}`}> {phones[0]}</a></strong>}
            </div>}
          </div>
        </React.Fragment>}
        {!!blogList && !!blogList.data && !!blogList.data.filter(item => item.id !== blogItem.data.id).length && <BlogBlock
          title={
            blogItem.data.type === BlogTypes.STORY ?
              <TI18n keyStr='moreSuccessStories' default='Еще историй успеха' /> :
              <TI18n keyStr='moreUsefulAdvices' default='Еще полезных статей' />
          }
          data={blogList.data.filter(item => item.id !== blogItem.data.id).slice(0, 3)}
        />}
      </div>
    </div>
  )
}