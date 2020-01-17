import React from 'react';
import {RouteComponentProps} from "react-router";
import {TI18n} from '../../../../i18n';
import { IAnimalsResponse, IAnimal } from "../../../../api/animals";
import { AnimalsList } from '../../../../components/AnimalsList';
import { store } from './../../../../store/index';
import '../styles/home.scss';
import { BottomContent } from '../../Header/ui/BottomContent';
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
