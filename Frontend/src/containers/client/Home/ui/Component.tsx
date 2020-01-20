import React from 'react';
import {RouteComponentProps} from "react-router";
import {TI18n} from '../../../../i18n';
import { IAnimalsResponse, IAnimal } from "../../../../api/animals";
import { AnimalsList } from '../../../../components/AnimalsList';
import { store } from './../../../../store/index';
import '../styles/home.scss';
import { HelpBlock } from '../../Header/ui/HelpBlock';
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
            {HelpBlock(
                this.props.animalsList,
                {backgroundColor:'#F9F6F7',
                 title: <TI18n keyStr="headerBottomTitle" default="Ты можешь помочь животному в беде"/>,
                 color: '#0D2B4B',
                 text:{
                    color:'#0D2B4B',
                    content:  <TI18n keyStr="headerBottomContent" default="Приют ежедневно заботится о сотнях животных. Самый лучший способ помочь нам и нашим хвостикам - пожертвовать любую сумму на корм, лечение и обеспечение работы приюта."/>
                    },
                btn:{
                    style: 'blue',
                    content: <TI18n keyStr="headerBottomBtn" default="Пожертвовать"/>
                },
                story: false
                },
                 )}
            <div className="home-page-client">
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
                  {HelpBlock(this.props.animalsList,
                    {backgroundColor:'#333572',
                    title: <TI18n keyStr="canHelpBlockTitle" default="Кому ты можешь помочь"/>,
                    color: '#409275',
                    text:{
                        color:'#ffffff',
                        content: <TI18n keyStr="canHelpBlockContent" default="Маша скромная и добрая собачка. Очень терпеливая и ненавязчивая. Маша была сбита машиной, пережила стресс. Сначала была испугана, потом успокоилась и начала доверять людям. Для восстановления после аварии нужно собрать 3 500 грн."/>
                    },
                    btn:{
                        style: 'yellow',
                        content: <TI18n keyStr="footerRightBtn" default="Помочь"/>
                    },
                    story: true
                })}
                </div>
            </div>
            </>
        )
    }
}
