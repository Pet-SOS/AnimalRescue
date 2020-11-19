import React, { useEffect } from 'react';
import { TI18n } from '../../../i18n';
import './index.scss';
import { HelpBlock } from '../../../components/HelpBlock';
import { useSelector, shallowEqual } from 'react-redux';
import { store } from '../../../store';
import { selectInfoContacts } from '../Home/store/selectors';
import { sickAnimalsCheckAndLoadDefault } from '../Animals/store/selectors';
import { IAnimalsListState } from '../Animals/store/state';
import { IBreadcrumbProps } from '../../../components/Breadcrumbs/item';
import { Breadcrumbs } from '../../../components/Breadcrumbs';
import Banner from '../../../img/bg-banner-01.jpg';

interface IPropTypes {
  clearAnimalsState: () => void;
  sickAnimalsList: IAnimalsListState;
}

export const ServiceWorkRules: React.FC<IPropTypes> = ({
  clearAnimalsState,
  sickAnimalsList,
}) => {
  useEffect(() => {
    sickAnimalsCheckAndLoadDefault();
    return () => {
      clearAnimalsState();
    };
  }, []);
  const contactPhones: string[] = useSelector(
    () => selectInfoContacts(store.getState()).data.phones,
    shallowEqual,
  );
  const breadCrumbs: IBreadcrumbProps[] = [
    {
      text: (
        <TI18n
          keyStr="breadcrumbAbout"
          default="Дізнатися більше про службу порятунку"
        />
      ),
      href: '/about',
    },
    {
      text: (
        <TI18n
          keyStr="breadcrumbFinanceReports"
          default="Подивитися фінансову звітність"
        />
      ),
      href: '/about/financial-reports',
    },
  ];
  return (
    <React.Fragment>
      <div className="rules-page-holder">
        <div className="container">
          <h1 className="title">
            <TI18n keyStr="rulesPageTitle" default="Правила работы службы" />
          </h1>
          <div
            className="banner"
            style={{ backgroundImage: `URL(${Banner})` }}
          />
          <div className="rules-content">
            <div className="page-description section-margin">
              <p>
                <TI18n
                  keyStr="rulesMainText"
                  default="Мы никогда не знаем, когда животным может понадобиться срочная помощь, но знаем, что всегда должны быть готовы оказать ее. Команда службы спасения отвечает на вызовы в ситуациях, когда животным требуется защита."
                />
              </p>
            </div>
            <div className="block-holder">
              <h3 className="title">
                <TI18n
                  keyStr="rulesWhatShouldIDoTitle"
                  default="Что делать, если я вижу, что животному нужна помощь?"
                />
              </h3>
              <p>
                <TI18n
                  keyStr="rulesWhatShouldIDoText1"
                  default="Если вы увидели, как маленького котенка выбросили на помойку, ежика с переломанной лапкой, скулящего в канализационном люке щенка, кошку, забравшуюся в вентиляционную шахту и не сумевшую оттуда выбраться, или любое другое животное нуждающееся в помощи – немедленно набирайте наш номер"
                />
                {!!contactPhones && !!contactPhones[0] && (
                  <a className="number" href={`tel:${contactPhones[0]}`}>
                    {' '}
                    {contactPhones[0]}
                  </a>
                )}
              </p>
              <p>
                <TI18n
                  keyStr="rulesWhatShouldIDoText2"
                  default="К сожалению, беда может случиться в любое время, поэтому телефоны службы спасения работают в круглосуточном режиме – не бойтесь нам звонить и в 2 часа ночи, и в 5 часов утра."
                />
              </p>
              <ul className="numbered-list">
                <li>
                  <TI18n
                    keyStr="rulesWhatShouldIDoListText1"
                    default="После соединения с оператором опишите ему суть проблемы, сообщите адрес или приблизительные координаты места происшествия."
                  />
                </li>
                <li>
                  <TI18n
                    keyStr="rulesWhatShouldIDoListText2"
                    default="Оператор оценит степень сложности ситуации и/или угрозы для жизни животного и примет решение относительно дальнейших действий."
                  />
                </li>
                <li>
                  <TI18n
                    keyStr="rulesWhatShouldIDoListText3"
                    default="Дальше вам могут предложить привести четвероногого подопечного к нам в офис, где мы оказываем бесплатную помощь бездомным животным. Если вы не можете этого сделать, за животным приедут волонтеры службы спасения."
                  />
                </li>
                <li>
                  <TI18n
                    keyStr="rulesWhatShouldIDoListText4"
                    default="В экстренных случаях пострадавшее животное доставляется в ветеринарную клинику."
                  />
                </li>
                <li>
                  <TI18n
                    keyStr="rulesWhatShouldIDoListText5"
                    default="После того, как необходимая помощь будет оказана, мы помогаем нашим питомцам найти своих хозяевили обрести новый дом."
                  />
                </li>
              </ul>
              <div className="warning">
                <h4>
                  <TI18n keyStr="important" default="Важно" />!
                </h4>
                <p>
                  <TI18n
                    keyStr="rulesWarningText"
                    default="Перед тем, как привозить животное в «Порятунок тварин Харків» обязательно позвоните на «горячую линию»! Мы не принимаем животных без предварительного согласования в телефонном режиме."
                  />
                </p>
              </div>
            </div>
            <div className="block-holder">
              <h3 className="title">
                <TI18n
                  keyStr="rulesAdoptionRulesTitle"
                  default="Правила адопции"
                />
              </h3>
              <p>
                <TI18n
                  keyStr="rulesAdoptionRulesText"
                  default="Всі ми знаємо, що тварина - це, не тільки багато щастя, а й перш за все, відповідальність. Тому, перш ніж привести хвостика в своє життя, Ви повинні реально оцінити свої сили. Адже жива істота вимагає часу, уваги і коштів. Саме тому необхідно зважити всі «за» і «проти» і лише потім приймати остаточне рішення."
                />
              </p>
              <div className="row-holder">
                <ul className="rules-list correct">
                  <li>
                    <TI18n
                      keyStr="rulesAdoptionListCorrectItem1"
                      default="Тварини віддаються тільки майбутнім господарям"
                    />
                  </li>
                  <li>
                    <TI18n
                      keyStr="rulesAdoptionListCorrectItem2"
                      default="Всі тварини віддаються на умовах Договору"
                    />
                  </li>
                  <li>
                    <TI18n
                      keyStr="rulesAdoptionListCorrectItem3"
                      default="Обов’язкова стерилізація по віку"
                    />
                  </li>
                  <li>
                    <TI18n
                      keyStr="rulesAdoptionListCorrectItem4"
                      default="Для котів: наявність сіток на вікнах"
                    />
                  </li>
                  <li>
                    <TI18n
                      keyStr="rulesAdoptionListCorrectItem5"
                      default="Якщо у вас є інші тварини вдома, вони мають бути привиті та стерилізовані."
                    />
                  </li>
                </ul>
                <ul className="rules-list incorrect">
                  <li>
                    <TI18n
                      keyStr="rulesAdoptionListIncorrectItem1"
                      default="Тварини не віддаються на подарунок, в якості іграшки, родичам."
                    />
                  </li>
                  <li>
                    <TI18n
                      keyStr="rulesAdoptionListIncorrectItem2"
                      default="Тварини не віддаються на підприємства, на ланцюг, самовигул, охорона, мисливство"
                    />
                  </li>
                  <li>
                    <TI18n
                      keyStr="rulesAdoptionListIncorrectItem3"
                      default="Тварини не віддаються особам молодшим 21 року."
                    />
                  </li>
                </ul>
              </div>
            </div>
            <div className="block-holder">
              <h3 className="title">
                <TI18n
                  keyStr="rulesHowToAdoptTitle"
                  default="Как усыновить животное?"
                />
              </h3>
              <p>
                <TI18n
                  keyStr="rulesHowToAdoptText"
                  default="Основное, что нужно для усыновления животного - это любовь."
                />
              </p>
              <ul className="numbered-list">
                <li>
                  <span className="list-item-title">
                    <TI18n
                      keyStr="rulesHowToAdoptListItemTitle1"
                      default="Личная встреча"
                    />
                  </span>
                  <p>
                    <TI18n
                      keyStr="rulesHowToAdoptListItemText1"
                      default="Познакомьтесь с животным. Это поможет понять, подходит ли оно вам по темпераменту. В некоторых случаях рекомендуется приезжать к животному несколько раз."
                    />
                  </p>
                </li>
                <li>
                  <span className="list-item-title">
                    <TI18n
                      keyStr="rulesHowToAdoptListItemTitle2"
                      default="Подготовьте дом к новому жильцу"
                    />
                  </span>
                  <p>
                    <TI18n
                      keyStr="rulesHowToAdoptListItemText2"
                      default="Сотрудник приюта вам расскажет об индивидуальных потребностях выбранного питомца. Подготовьте для животного все необходимое: место для сна, корм, мисочки для еды и воды, место для туалета и наполнитель, игрушки, сетки на окнах и пр."
                    />
                  </p>
                </li>
                <li>
                  <span className="list-item-title">
                    <TI18n
                      keyStr="rulesHowToAdoptListItemTitle3"
                      default="Подписать договор"
                    />
                  </span>
                  <p>
                    <TI18n
                      keyStr="rulesHowToAdoptListItemText3"
                      default="Обязательным этапом является подписание договора."
                    />
                  </p>
                </li>
                <li>
                  <span className="list-item-title">
                    <TI18n
                      keyStr="rulesHowToAdoptListItemTitle4"
                      default="Испытательный срок"
                    />
                  </span>
                  <p>
                    <TI18n
                      keyStr="rulesHowToAdoptListItemText4"
                      default="Если у вас возникают сложности с питомцем, не стесняйтесь нам звонить! Мы поможем и если все же не получится подружиться, заберем животное обратно."
                    />
                  </p>
                </li>
              </ul>
            </div>
            <div className="block-holder">
              <Breadcrumbs data={breadCrumbs} />
            </div>
          </div>
        </div>
        <HelpBlock
          animalsList={sickAnimalsList.data}
          title={
            <TI18n keyStr="canHelpBlockTitle" default="Кому ты можешь помочь" />
          }
        />
      </div>
    </React.Fragment>
  );
};
