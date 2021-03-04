import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { AdminMenu } from '../../AdminMenu';
import { TI18n } from '../../../../i18n';
import { ELocales } from '../../../../i18n/store/state';
import { BlockLink } from '../../../../components/BlockLink';
import './style.scss';
import MutableTagsList from './MutableTagsList';

const TagsList: React.FC = () => {
  const { tagCategoryName } = useParams();
  const history = useHistory();

  const goBack = () => {
    var path = history.location.pathname.toString();
    var index = path.indexOf('/kindOfAnimal/');
    let href = index == -1 ? `/admin/tags` : `/admin/tags/kindOfAnimal`;
    return href;
  };

  return (
    <div className="boxAdmin">
      <AdminMenu selectedKey={'tags'} openKeys={[]} />
      <main>
        <div className="container">
          <section className="section-tags-list">
            <header>
              <BlockLink
                title={'Повернутися до тегів'}
                href={goBack()}
                isBack
              />
              <h4>
                {
                  <TI18n
                    keyStr={`${tagCategoryName}TagCategory`}
                    default={tagCategoryName}
                    locale={ELocales.ua}
                  />
                }
              </h4>
            </header>
            <div className="page-content">
              <MutableTagsList />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default TagsList;
