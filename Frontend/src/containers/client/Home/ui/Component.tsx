import React from 'react';
import {RouteComponentProps} from "react-router";
import {TI18n} from '../../../../i18n';
import { IAnimalsResponse, IAnimal } from "../../../../api/animals";
import { AnimalsList } from '../../../../components/AnimalsList';
import { store } from './../../../../store/index';
import '../styles/home.scss';
import { BottomContent } from '../../Header/ui/BottomContent';
import { OurGoalBlock } from '../../Home/ui/OurGoal';
import { CounterBlock } from '../../../../components/CounterBlock';
import { HelpedBlock } from '../../../../components/HelpedBlock';
import counterImage1 from '../../../../img/counter-images/counter_1.png';
import counterImage2 from '../../../../img/counter-images/counter_2.png';
import counterImage3 from '../../../../img/counter-images/counter_3.png';
import counterImage4 from '../../../../img/counter-images/counter_4.png';
import counterImage5 from '../../../../img/counter-images/counter_5.png';
import counterImage6 from '../../../../img/counter-images/counter_6.png';
import counterImage7 from '../../../../img/counter-images/counter_7.png';
import counterImage8 from '../../../../img/counter-images/counter_8.png';

interface IPropTypes extends RouteComponentProps<any> {
    fetchAnimalsRequest: () => void;
    animalsList: IAnimalsResponse
}

export class HomePageMain extends React.Component<IPropTypes> {

    componentDidMount(): void {
        this.props.fetchAnimalsRequest()
    }

    get getAnimalsList() {
        const {animalsList} = this.props;
        if (animalsList.data && animalsList.data.length) {
            return animalsList.data.map((item) => ({
                image: 'string',
                title: item.name,
                description: item.description,
                id: item.id,
                imageLinks: item.imageIds
            }))
        }
        return []
    }

    private getAnimalsStoreData(): IAnimal[] {
      return store.getState().homePage.animalsList.data;
    }

    render() {
        return (
            <>
            {BottomContent(this.props.animalsList)}
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
                  count='102563'
                  title={<TI18n keyStr="counterBlockTitle" default="Спасенных нами животных" />}
                  text={<React.Fragment><TI18n keyStr="counterBlockText" default="по данным на" /> 13.12.19</React.Fragment>}
                  images={[counterImage1, counterImage2, counterImage3, counterImage4, counterImage5, counterImage6, counterImage7, counterImage8]}/>
                <HelpedBlock 
                data={this.getAnimalsStoreData()}
                  title={<TI18n keyStr="alreadyHelpedBlockTitle" default="Кому мы помогли" />}/>
                <div className="animal-list-wrapper">
                  <AnimalsList
                    data={this.getAnimalsStoreData()}
                    title={<TI18n keyStr="dogsListTitle" default="Наши собачки" />}
                    link={{
                      title: <TI18n keyStr="wantToChooseFriend" default="Хочу выбрать друга" />,
                      href: '/'
                    }}
                  />
                  <AnimalsList
                    data={this.getAnimalsStoreData()}
                    title={<TI18n keyStr="catsListTitle" default="Наши котики" />}
                    link={{
                      title: <TI18n keyStr="wantToChooseFriend" default="Хочу выбрать друга" />,
                      href: '/'
                    }}
                  />
                </div>
            </div>
            </>
        )
    }
}
