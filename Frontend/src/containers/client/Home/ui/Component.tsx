import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import {TI18n} from '../../../../i18n';
import { AnimalKind, ISavedAnimalsCountResponse } from "../../../../api/animals";
import { AnimalsSlider } from '../../Animals/AnimalsSlider';
import { HelpBlock } from '../../../../components/HelpBlock';
import { OurGoalBlock } from './OurGoalBlock/OurGoal';
import { CounterBlock } from './CounterBlock';
import { HelpedBlock } from './HelpedBlock';
import { BlogBlock } from './BlogBlock/BlogBlock';
import counterImage1 from '../../../../img/counter-images/counter_1.png';
import counterImage2 from '../../../../img/counter-images/counter_2.png';
import counterImage3 from '../../../../img/counter-images/counter_3.png';
import counterImage4 from '../../../../img/counter-images/counter_4.png';
import counterImage5 from '../../../../img/counter-images/counter_5.png';
import counterImage6 from '../../../../img/counter-images/counter_6.png';
import counterImage7 from '../../../../img/counter-images/counter_7.png';
import counterImage8 from '../../../../img/counter-images/counter_8.png';
import { YouTubeBox } from '../../../../components/YoutubeBox';
import { IBlogListResponse } from '../../../../api/blog';
import { IRequestParams, AllTag, RequestFilterOperators } from '../../../../api/requestOptions';
import { IArticleListResponse } from '../../../../api/article';
import '../styles/home.scss';
import { IAnimalsListState } from '../../Animals/store/state';
import { sickAnimalsCheckAndLoadDefault } from '../../Animals/store/selectors';
import { IYouTubeVideo } from '../../../../api/youtube';
import { selectInfoContacts } from '../store/selectors';
import { store } from '../../../../store';

interface IPropTypes {
  fetchAnimalsRequest: (kind?: AnimalKind, pageParams?: IRequestParams) => void;
  fetchSavedAnimalsCount: () => void;
  fetchInfoCard: ()=> void;
  fetchBlogList: (tag?: AllTag, pageParams?: IRequestParams) => void;
  fetchArticlesList: (pageParams?: IRequestParams) => any;
  fetchYouTubeVideos: (count?: number) => void;
  clearAnimalsState: () => void;
  clearInfoCard: () => void;
  clearYouTubeVideos: () => void;
  animalsList: IAnimalsListState;
  blogListSaved: IBlogListResponse;
  catsList: IAnimalsListState;
  dogsList: IAnimalsListState;
  sickAnimalsList: IAnimalsListState;
  savedAnimalsCount: ISavedAnimalsCountResponse;
  articleList: IArticleListResponse;
  videosList: IYouTubeVideo[]
}

export const HomePageMain: React.FC<IPropTypes> = ({
  fetchAnimalsRequest,
  fetchSavedAnimalsCount,
  fetchInfoCard,
  fetchBlogList,
  fetchArticlesList,
  fetchYouTubeVideos,
  animalsList,
  blogListSaved,
  articleList,
  catsList,
  dogsList,
  videosList,
  sickAnimalsList,
  savedAnimalsCount,
  clearAnimalsState,
  clearInfoCard,
  clearYouTubeVideos,
}) => {
  useEffect(() => {
    fetchAnimalsRequest();
    fetchAnimalsRequest(AnimalKind.DOG);
    fetchAnimalsRequest(AnimalKind.CAT);
    sickAnimalsCheckAndLoadDefault();
    fetchBlogList(AllTag.SAVED);
    fetchSavedAnimalsCount();
    fetchInfoCard();
    fetchYouTubeVideos(2);
    fetchArticlesList({filter:{
      fieldName: 'type',
      operator: RequestFilterOperators.EQ,
      value: 'article'
    }});
    return () => {
      clearAnimalsState();
      clearInfoCard();
      clearYouTubeVideos();
    }
  }, [])
  const getCounterDateString = (): string => {
    const currentDate: Date = new Date();
    const yearString: string = `${currentDate.getFullYear()}`;
    return `${currentDate.getDate()}.${currentDate.getMonth() < 9 ? `0${currentDate.getMonth() + 1}` : currentDate.getMonth() + 1}.${yearString.substr(yearString.length - 2, 2)}`;
  }
  const youTubeChannelLink: string = useSelector(() => (selectInfoContacts(store.getState()).data.socialLinks.youtube));
  return (
    <React.Fragment>
      <HelpBlock
        animalsList={sickAnimalsList.data}
        title={<TI18n keyStr="headerBottomTitle" default="Ты можешь помочь животному в беде" />}
        isLightMode
      />
      <div className="home-page-client">
        <OurGoalBlock
          title={<TI18n keyStr="ourGoalBlockTitle" default="Хто ми" />}
          text1={
            <TI18n
              keyStr="ourGoalBlockText1"
              default="Ми громадська організація, яка працює за принципом МНС або швидкої допомоги. Наш напрямок - це порятунок тварин у надзвичайних ситуаціях. Ми рятуємо кошенят, цуциків, дорослих котів та собак, птахів, диких тварин. Допомогу ми надаємо цілодобово. Телефонуйте нам на гарячу лінію хоч о 2 годині ночі, хоч о 5 годині ранку."
            />
          }
          link={{
            title: <TI18n keyStr="ourGoalBlockLinkText" default="Докладніше про службу" />,
            href: '/about'
          }}
        />
        <CounterBlock
          backgroundColor='#ECBB3B'
          count={savedAnimalsCount.data}
          title={<TI18n keyStr="counterBlockTitle" default="Спасенных нами животных" />}
          text={<React.Fragment><TI18n keyStr="counterBlockText" default="по данным на" /> {getCounterDateString()}</React.Fragment>}
          images={[counterImage1, counterImage2, counterImage3, counterImage4, counterImage5, counterImage6, counterImage7, counterImage8]}
        />
        {!!blogListSaved && !!blogListSaved.data && !!blogListSaved.data.length && <HelpedBlock
          data={blogListSaved.data}
          title={<TI18n keyStr="alreadyHelpedBlockTitle" default="Кому мы помогли" />}
        />}
        <HelpBlock
          animalsList={sickAnimalsList.data}
          title={<TI18n keyStr="canHelpBlockTitle" default="Кому ты можешь помочь" />}
        />
        {!!videosList && !!videosList.length && (
          <YouTubeBox
            title={<TI18n keyStr="titleYouTubeBox" default="Видео-истории" />}
            backgroundColor='#ffffff'
            subTitle={<TI18n keyStr="subTitleYouTubeBox" default="Истории о спасенных животных" />}
            videoLinks={videosList.slice(0, 2).map(video => ({
              src: `https://www.youtube.com/embed/${video.id.videoId}`,
              title: video.snippet.title
            }))}
            channelLink={youTubeChannelLink}
          />
        )}
        <section className="animals-slider-wrapper section-padding">
          {!!dogsList.data && !!dogsList.data.length && <AnimalsSlider
            data={dogsList.data}
            title={<TI18n keyStr="dogsListTitle" default="Наши собачки" />}
            link={{
              title: <TI18n keyStr="wantToChooseDog" default="Хочу выбрать друга" />,
              href: '/animals/page/1?kindOfAnimal=DOG/'
            }}
          />}
          {catsList.data.length > 0 && <AnimalsSlider
            data={catsList.data}
            title={<TI18n keyStr="catsListTitle" default="Наши котики" />}
            link={{
              title: <TI18n keyStr="wantToChooseCat" default="Хочу выбрать друга" />,
              href: '/animals/page/1?kindOfAnimal=CAT/'
            }}
          />}
        </section>
        {!!articleList.data && !!articleList.data.length && (
          <BlogBlock
            title={<TI18n keyStr="blogBlockTitle" default="Блог" />}
            data={articleList.data.slice(0, 3)}
            link={{
              title: <TI18n keyStr="blogBlockLinkText" default="Перейти ко всем статьям" />,
              href: '/blog/page/1'
            }}
          />
        )}
      </div>
    </React.Fragment>
  )
}
