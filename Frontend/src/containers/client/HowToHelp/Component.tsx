import React, { useEffect } from 'react';
import { TI18n } from '../../../i18n';
import './index.scss';
import { HelpBlock } from '../Header/ui/HelpBlock';
import queryString from 'query-string';
import { Location } from 'history';
import { ExpandedList } from '../../../components/ExpandedList';
import { IExpandedListItemProps } from '../../../components/ExpandedList/item';
import { IAnimalsListState } from '../Animals/store/state';
import { sickAnimalsCheckAndLoadDefault } from '../Animals/store/selectors';
import { IInfoCard } from '../Home/store/state';
import { infoCardCheckAndLoad } from '../Home/store/selectors';

export enum HelpTypes { FINANCE = 'finance', STUFF = 'stuff', VOLUNTEERING = 'volunteering' }
export const HOW_TO_HELP_QUERY_NAME: string = 'helpType';

interface IPropTypes {
  clearAnimalsState: () => void;
  clearInfoCard: () => void;
  sickAnimalsList: IAnimalsListState;
  infoCard: IInfoCard;
  location: Location
}

export const HowToHelp: React.FC<IPropTypes> = ({
  clearAnimalsState,
  sickAnimalsList,
  clearInfoCard,
  infoCard,
  location
}) => {
  const scrollToBlock = () => {
    const locationURl:string[] = location.pathname.split('/');
    const helpType = locationURl[locationURl.length-1];
    const el = !!helpType && typeof helpType === 'string' ? document.getElementById(`${helpType}`) : null;
    if (!!el) {
      el.scrollIntoView({
        behavior: 'smooth'
      });
    }
  }
  useEffect(() => {
    sickAnimalsCheckAndLoadDefault();
    infoCardCheckAndLoad();
    return () => {
      clearInfoCard();
      clearAnimalsState();
    }
  }, []);
  useEffect(() => {
    scrollToBlock();
  }, [window.location.href]);

  const vacations: IExpandedListItemProps[] = [
    {
      title: <TI18n keyStr='photographer' default='Фотограф' />,
      body: [
        <p>
          <TI18n
            keyStr='photographerVacationText1'
            default='Чтобы питомец быстрее нашел свою семью, ему нужна хорошие фотографии. Именно поэтому помощь профессиональных фотографов в этом случае крайне желательна и важна.' />
        </p>,
        <p>
          <TI18n
            keyStr='photographerVacationText2'
            default='Для каждого питомца приюта создаётся персональная страница, частью которой являются фотографии и короткое видео. Эта информация размещается на сайте и других публичных ресурсах. Можно выделить пару часов времени, навестить питомцев приюта и, заодно, сделать им потрясающие фотографии — размер помощи неоценим.' />
        </p>
      ]
    },
    {
      title: <TI18n keyStr='infoHelp' default='Информационная помощь' />,
      body: [
        <p>Description infoHelp</p>
      ]
    },
    {
      title: <TI18n keyStr='dogSitter' default='Догситтер (выгульщик собак)' />,
      body: [
        <p>Description dogSitter</p>
      ]
    },
    {
      title: <TI18n keyStr='dogHandler' default='Кинолог' />,
      body: [
        <p>Description dogHandler</p>
      ]
    },
    {
      title: <TI18n keyStr='veterinarian' default='Ветеринар' />,
      body: [
        <p>Description veterinarian</p>
      ]
    },
    {
      title: <TI18n keyStr='driver' default='Водитель' />,
      body: [
        <p>Description driver</p>
      ]
    },
    {
      title: <TI18n keyStr='handyman' default='Разнорабочий' />,
      body: [
        <p>Description handyman</p>
      ]
    }
  ]

  return (
    <React.Fragment>
      <div className='help-page-holder'>
        <div className='content'>
          <h1 className='title'>
            <TI18n keyStr='helpPageTitle' default='Как я могу помочь' />
          </h1>
          <div className='banner'/>
          <div className='help-page-content'>
            <div className='block-holder'>
              <p className='description'>
                <TI18n
                  keyStr='helpPageMainText'
                  default='Животных, которые либо родились бездомными, либо от них отказались их владельцы, подбирают неравнодушные граждане и волонтеры офиса «Порятунок тварин Харків». Мы помогаем пушистикам и с помощью волонтеров оплачиваем лечение и содержание животного, занимаемся адаптацией и поиском семьи, размещая объявления на своих площадках.' />
              </p>
            </div>
            <div id={HelpTypes.FINANCE} className='block-holder'>
              <h3 className='title'>
                <TI18n
                  keyStr='helpPageFinanceTitle'
                  default='Финансово'
                />
              </h3>
              <p>
                <TI18n
                  keyStr='helpPageFinanceText'
                  default='Наша служба ежедневно заботится о сотнях животных. У нас есть автомобиль, благодаря которому мы можем выезжать на срочные вызовы, свой отдел лечения, адоптации и пристройства. Самый легкий способ помочь нам и нашим пушистикам - пожертвовать любую сумму на корм, лечение и обеспечение работы службы и приютов.'
                />
              </p>
              {!!infoCard?.data?.bankCard?.cardNumber && <div className="bank-card-info">
                <p className='card'>{infoCard.data.bankCard.cardNumber}</p>
                <p>{infoCard.data.bankCard.firstName} {infoCard.data.bankCard.lastName}</p>
              </div>}
            </div>
            <div id={HelpTypes.STUFF} className='block-holder'>
              <h3 className='title'>
                <TI18n
                  keyStr='helpPageStuffTitle'
                  default='Вещами'
                />
              </h3>
              <p>
                <TI18n
                  keyStr='helpPageStuffText1'
                  default='Если вы хотите помочь вещами - мы всегда нуждаемся в теплых вещах, медикаментах и расходных материалах, корме, наполнителе, вещах для вольеров и уборки и пр. Список актуальных нужд приюта можно найти в документе'
                />
                &nbsp;
                <a>
                  <TI18n
                    keyStr='viaLink'
                    default='по ссылке'
                  />
                </a>
              </p>
              <p>
                <TI18n
                  keyStr='helpPageStuffText2'
                  default='Также можете писать нам в группу Фейсбук.'
                />
              </p>
            </div>
            <div id={HelpTypes.VOLUNTEERING} className='block-holder'>
              <h3 className='title'>
                <TI18n
                  keyStr='helpPageVolunteeringTitle'
                  default='Волонтерством' />
              </h3>
              <p>
                <TI18n
                  keyStr='helpPageVolunteeringText'
                  default='Если вы хотите помочь руками - у нас всегда найдется работа! Вы активный человек, любите животных, у вас есть свободное время и желание совершать добрые и важные поступки — вы можете стать частью команды помощи и спасения бездомных животных.'
                />
              </p>
              <h4 className='title'>
                <TI18n
                  keyStr='helpPageVolunteeringListTitle'
                  default='Какую работу могут выполнять волонтеры?' />
              </h4>
              <div className='vacations-list'>
                <ExpandedList data={vacations} />
              </div>
            </div>
          </div>
        </div>
        <HelpBlock
          animalsList={sickAnimalsList}
          backgroundColor='#333572'
          title={<TI18n keyStr='canHelpBlockTitle' default='Кому ты можешь помочь' />}
          color='#409275'
          text={{
            color: '#ffffff',
            content: <TI18n keyStr='canHelpBlockContent' default='Маша скромная и добрая собачка. Очень терпеливая и ненавязчивая. Маша была сбита машиной, пережила стресс. Сначала была испугана, потом успокоилась и начала доверять людям. Для восстановления после аварии нужно собрать 3 500 грн.' />
          }}
          btn={{
            style: 'yellow',
            content: <TI18n keyStr='footerRightBtn' default='Помочь' />
          }}
          story={true}
        />
      </div>
    </React.Fragment>
  )
}