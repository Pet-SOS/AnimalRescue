import React from 'react';
import {useParams} from 'react-router-dom';
import {AdminMenu} from '../../AdminMenu';
import {TI18n} from '../../../../i18n';
import {ELocales} from '../../../../i18n/store/state';
import {BlockLink} from '../../../../components/BlockLink';
import './style.scss';
import MutableTagsList from "./MutableTagsList";


const TagsList: React.FC = () => {
    const {tagCategoryName} = useParams();
    return (
        <div className='boxAdmin'>
            <AdminMenu selectedKey={'tags'} openKeys={['sub2', 'sub1']}/>
            <main>
                <div className="container">
                    <section className="section-tags-list">
                        <header>
                            <BlockLink
                                title={'Повернутися до тегів'}
                                href={'/admin/tags'}
                                isBack
                            />
                            <h4>{<TI18n keyStr={`${tagCategoryName}TagCategory`} default={tagCategoryName}
                                        locale={ELocales.ua}/>}</h4>
                        </header>
                        <div className="page-content">
                            <MutableTagsList/>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    )
};


export default TagsList;
