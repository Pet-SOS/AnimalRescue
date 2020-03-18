import React, { useEffect } from 'react';
import { TI18n } from '../../../i18n';
import { IAnimalsResponse } from '../../../api/animals';
import { HelpBlock } from '../../../components/HelpBlock';
import './index.scss';
import counterImage2 from '../../../img/counter-images/counter_2.png';
import counterImage3 from '../../../img/counter-images/counter_3.png';
import counterImage4 from '../../../img/counter-images/counter_4.png';
import counterImage5 from '../../../img/counter-images/counter_5.png';
import counterImage6 from '../../../img/counter-images/counter_6.png';
import counterImage7 from '../../../img/counter-images/counter_7.png';
import counterImage8 from '../../../img/counter-images/counter_8.png';
import { Breadcrumbs } from '../../../components/Breadcrumbs';
import { IBreadcrumbProps } from '../../../components/Breadcrumbs/item';

interface IPropTypes {
  fetchSickAnimals: () => void;
  clearAnimalsState: () => void;
  sickAnimalsList: IAnimalsResponse;
}

export const AboutServices: React.FC<IPropTypes> = ({
  fetchSickAnimals,
  clearAnimalsState,
  sickAnimalsList, 
}) => {
  useEffect(() => {
    fetchSickAnimals();
    return () => {
      clearAnimalsState();
    }
  }, [])

  const images = [counterImage2, counterImage3, counterImage4, counterImage5, counterImage6, counterImage7, counterImage8];
  const breadCrumbs: IBreadcrumbProps[] = [
    {
      text: <TI18n keyStr='breadcrumbRules' default='Дізнатися про правила взаємодії зі службою' />,
      href: '/about/rules'
    },
    {
      text: <TI18n keyStr='breadcrumbFinanceReports' default='Подивитися фінансову звітність' />,
      href: 'about/financial-reports'
    }
  ];
  return (
    <React.Fragment>
      <div className='about-page-holder'>
        <div className='content'>
          <h1 className='title'>
            <TI18n keyStr='aboutPageTitle' default='Про службу порятунку' />
          </h1>
          <div className='banner'>
              <div className="image-holder">
                {images.slice(0, 7).map((img, index) => (
                <img src={img} key={index} alt='pet'/>
                ))}
            </div>
          </div>
          <div className='about-content'>
            <div className='block-holder'>
              <p className='description'>
                <TI18n
                  keyStr='aboutMainText'
                  default='Хочемо щоб кожен з Вас повірив, що нема нічого неможливого! Хід історії змінити може кожен. Вплинути на суспільні процеси також. Для цього потрібні прості маленькі кроки. Ми прагнемо рятувати безнадійних, рятувати тих, про кого нема кому подбати.' />
              </p>
            </div>
            <div className='block-holder'>
              <h3 className='title'>
                <TI18n
                  keyStr='aboutOurGoalTitle'
                  default='Наша мета' />
              </h3>
              <p>
                <TI18n
                  keyStr='aboutOurGoalText'
                  default='Ми - харківська служба порятунку тварин, і наша мета - допомога тваринам, які потрапили в біду. Ми рятуємо кошенят, цуценят, дорослих кішок і собак, птахів, кажанів, диких тварин поранених, що застрягли в трубі або колодязі, заплуталися і загубилися. Допомога тваринам ми надаємо незалежно від дня тижня і часу доби.' />
              </p>
            </div>
            <div className='block-holder'>
              <h3 className='title'>
                <TI18n
                  keyStr='aboutServiceHistoryTitle'
                  default='Історія служби' />
              </h3>
              <p>
                <TI18n
                  keyStr='aboutServiceHistoryText1'
                  default='Якщо ви вирішили завести собаку або кішку, зайдіть до притулку для тварин - може, саме там вас чекає самий ваш відданий друг. Не поспішайте шукати чотириногого супутника в елітних розплідниках або на пташиних ринках. Можливо, у нас на сайті ви знайдете того, кого полюбите, і про кого вам захочеться піклуватися.' />
              </p>
              <p>
                <TI18n
                  keyStr='aboutServiceHistoryText2'
                  default='Волонтери «порятунку тварин» спільно з небайдужими людьми міста рятують малюків, а пошуком сім’ї займається притулок для бездомних тварин.' />
              </p>
              <p>                  
                <TI18n
                    keyStr='aboutServiceHistoryText3'
                    default='Є багато причин, за якими люди відмовляються від своїх домашніх тварин, в тому числі:' />
              </p>
              <ul className='dots-list'>
                <li>
                  <TI18n keyStr='aboutReason1' default='несподівані фінансові труднощі' />
                </li>
                <li>
                  <TI18n keyStr='aboutReason2' default='переїзд в іншу країну' />
                </li>
                <li>
                  <TI18n keyStr='aboutReason3' default='конфлікт між тваринами в сім’ї' />
                </li>
                <li>
                  <TI18n keyStr='aboutReason4' default='напружений графік роботи' />
                </li>
                <li>
                  <TI18n keyStr='aboutReason5' default='проблеми зі здоров’ям' />
                </li>
                <li>
                  <TI18n keyStr='aboutReason6' default='нерідко це звичайна безвідповідальність' />
                </li>
              </ul>
              <p>
                <TI18n
                  keyStr='aboutServiceHistoryText4'
                  default='Але незалежно від того, з якої причини колишні господарі відмовилися від своїх вихованців, кожна тварина має потребу в турботі.' />
              </p>
              <p>
                <TI18n
                  keyStr='aboutServiceHistoryText5'
                  default='Не проходьте повз, якщо бачите, як беззахисний грудочку злякано притулився в підворітті, не розуміючи, куди йому бігти і де ховатися в величезному галасливому місті. Набирайте номер телефону офісу «порятунку тварин» або волонтерів притулку в будь-яких випадках, коли комусь із котяче-собачого роду потрібна негайна допомога: зняти з дерева, витягнути з ями або люка, відігріти, нагодувати, вилікувати.' />
              </p>
            </div>
            <div className='block-holder'>
              <Breadcrumbs data={breadCrumbs}/>
            </div>
          </div>
        </div>
        <HelpBlock
          animalsList={sickAnimalsList.data}
          title={<TI18n keyStr='canHelpBlockTitle' default='Кому ты можешь помочь' />}
        />
      </div>
    </React.Fragment>
  )
}