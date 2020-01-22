import React, {useEffect} from 'react';
import {TI18n} from '../../../../i18n';
import { IAnimalsResponse, AnimalKind, ISavedAnimalsCountResponse } from "../../../../api/animals";
import { AnimalsSlider } from '../../Animals/AnimalsSlider';
import { HelpBlock } from '../../Header/ui/HelpBlock';
import { OurGoalBlock } from '../../Home/ui/OurGoal';
import { CounterBlock } from './CounterBlock';
import { HelpedBlock } from './HelpedBlock';
import counterImage1 from '../../../../img/counter-images/counter_1.png';
import counterImage2 from '../../../../img/counter-images/counter_2.png';
import counterImage3 from '../../../../img/counter-images/counter_3.png';
import counterImage4 from '../../../../img/counter-images/counter_4.png';
import counterImage5 from '../../../../img/counter-images/counter_5.png';
import counterImage6 from '../../../../img/counter-images/counter_6.png';
import counterImage7 from '../../../../img/counter-images/counter_7.png';
import counterImage8 from '../../../../img/counter-images/counter_8.png';
import { IInfoCard } from '../../../../api/infoCard';
import { YouTubeBox } from '../../../../components/YoutubeBox';
import { IBlogListResponse } from '../../../../api/blog';
import { IInfoContacts } from '../../../../api/contacts';
import { IRequestParams, AllTag } from '../../../../api/requestOptions';
import '../styles/home.scss';

interface IPropTypes {
  fetchAnimalsRequest: (kind?: AnimalKind, pageParams?: IRequestParams) => void;
  fetchSavedAnimalsCount: () => void;
  fetchSickAnimals: () => void;
  fetchInfoCard: ()=> void;
  fetchBlogList: (tag?: AllTag, pageParams?: IRequestParams) => void;
  fetchInfoContacts:() => void;
  animalsList: IAnimalsResponse;
  blogList: IBlogListResponse;
  blogListSaved: IBlogListResponse;
  catsList: IAnimalsResponse;
  dogsList: IAnimalsResponse;
  sickAnimalsList: IAnimalsResponse;
  savedAnimalsCount: ISavedAnimalsCountResponse;
  infoCard: IInfoCard;
  infoContacts: IInfoContacts;
}

export const HomePageMain: React.FC<IPropTypes> = ({
  fetchAnimalsRequest,
  fetchSavedAnimalsCount,
  fetchSickAnimals,
  fetchInfoCard,
  fetchBlogList,
  fetchInfoContacts,
  animalsList,
  blogList,
  blogListSaved,
  catsList,
  dogsList,
  sickAnimalsList,
  savedAnimalsCount,
  infoCard,
  infoContacts
}) => {
  useEffect(() => {
    fetchInfoContacts();
    fetchSickAnimals();
    fetchAnimalsRequest();
    fetchAnimalsRequest(AnimalKind.DOG);
    fetchAnimalsRequest(AnimalKind.CAT);
    fetchBlogList(AllTag.SAVED);
    fetchSavedAnimalsCount();
    fetchInfoCard();

  }, [])
  const getCounterDateString = (): string => {
    const currentDate: Date = new Date();
    const yearString: string = `${currentDate.getFullYear()}`;
    return `${currentDate.getDate()}.${currentDate.getMonth() < 9 ? `0${currentDate.getMonth() + 1}` : currentDate.getMonth() + 1}.${yearString.substr(yearString.length - 2, 2)}`;
  }
  return (
    <React.Fragment>
      <HelpBlock
        animalsList={animalsList}
        backgroundColor='#F9F6F7'
        title={<TI18n keyStr="headerBottomTitle" default="Ты можешь помочь животному в беде" />}
        color='#0D2B4B'
        text={{
          color: '#0D2B4B',
          content: <TI18n keyStr="headerBottomContent" default="Приют ежедневно заботится о сотнях животных. Самый лучший способ помочь нам и нашим хвостикам - пожертвовать любую сумму на корм, лечение и обеспечение работы приюта." />
        }}
        btn={{
          style: 'blue',
          content: <TI18n keyStr="headerBottomBtn" default="Пожертвовать" />
        }}
        story={false}
      />
      <div className="home-page-client">
        <OurGoalBlock
          title={<TI18n keyStr="ourGoalBlockTitle" default="Наша цель" />}
          text1={
            <TI18n
              keyStr="ourGoalBlockText1"
              default="Мы – харьковская служба спасения животных, и наша цель – помощь животным, попавшим в беду. Мы спасаем котят, щенков, взрослых кошек и собак, которым приходится переживать непростые периоды своей кошачьей или собачьей жизни. Помощь животным мы оказываем вне зависимости от дня недели и времени суток."
            />
          }
          text2={
            <TI18n
              keyStr="ourGoalBlockText2"
              default="Если вы увидели, что кто-то из животных нуждается в помощи, немедленно звоните на нашу горячую линию и сообщите нам о проблеме. К сожалению, беда может случиться в любое время, поэтому телефоны службы спасения работают в круглосуточном режиме – не бойтесь нам звонить и в 2 часа ночи, и в 5 часов утра."
            />
          }
          link={{
            title: <TI18n keyStr="ourGoalBlockLinkText" default="Подробнее о службе" />,
            href: '/'
          }}
        />
        <CounterBlock
          backgroundColor='#ECBB3B'
          count={savedAnimalsCount.data}
          title={<TI18n keyStr="counterBlockTitle" default="Спасенных нами животных" />}
          text={<React.Fragment><TI18n keyStr="counterBlockText" default="по данным на" /> {getCounterDateString()}</React.Fragment>}
          images={[counterImage1, counterImage2, counterImage3, counterImage4, counterImage5, counterImage6, counterImage7, counterImage8]}
        />
        <HelpedBlock
          data={blogListSaved.data}
          title={<TI18n keyStr="alreadyHelpedBlockTitle" default="Кому мы помогли" />} />
        />
                <HelpBlock
          animalsList={sickAnimalsList}
          backgroundColor='#333572'
          title={<TI18n keyStr="canHelpBlockTitle" default="Кому ты можешь помочь" />}
          color='#409275'
          text={{
            color: '#ffffff',
            content: <TI18n keyStr="canHelpBlockContent" default="Маша скромная и добрая собачка. Очень терпеливая и ненавязчивая. Маша была сбита машиной, пережила стресс. Сначала была испугана, потом успокоилась и начала доверять людям. Для восстановления после аварии нужно собрать 3 500 грн." />
          }}
          btn={{
            style: 'yellow',
            content: <TI18n keyStr="footerRightBtn" default="Помочь" />
          }}
          story={true}
        />
        <YouTubeBox
          link='https://www.youtube.com/embed/JE0yDo7Qkec'
        />
        <div className="animal-list-wrapper">
          {dogsList.data.length > 0 && <AnimalsSlider
            data={dogsList.data}
            title={<TI18n keyStr="dogsListTitle" default="Наши собачки" />}
            link={{
              title: <TI18n keyStr="wantToChooseFriend" default="Хочу выбрать друга" />,
              href: '/'
            }}
          />}
          {catsList.data.length > 0 && <AnimalsSlider
            data={catsList.data}
            title={<TI18n keyStr="catsListTitle" default="Наши котики" />}
            link={{
              title: <TI18n keyStr="wantToChooseFriend" default="Хочу выбрать друга" />,
              href: '/'
            }}
          />}
        </div>
      </div>
    </React.Fragment>
  )
}
