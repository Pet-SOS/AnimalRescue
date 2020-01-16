import React from 'react';
import {RouteComponentProps} from "react-router";
import {TI18n} from '../../../../i18n';
import {HelpBlock} from "../../../../components/HelpBlock";
import {Slider} from "../../../../components/Slider";
import {IAnimalsResponse} from "../../../../api/animals";
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

    render() {
        return (
            <>
            {BottomContent(this.props.animalsList)}
            <div className="home-page-client">
                <HelpBlock
                    backgroundColor="#eef1f3"
                    themeColor="#5EAC38"
                    image={require('../../../../assets/helpBlock/help_block_1.png')}
                    content={
                        <TI18n
                            keyStr="homePageHelpBlockContent"
                            default="Приют ежедневно заботится о сотнях животных. Самый лучший способ помочь нам и нашим хвостикам - пожертвовать любую сумму на корм, лечение и обеспечение работы приюта"
                        />
                    }
                />
                <Slider
                    className="content-padding"
                    items={this.getAnimalsList}
                    speedMs={3}
                />
                <CounterBlock
                  backgroundColor='#ECBB3B'
                  count='102563'
                  title={<TI18n keyStr="counterBlockTitle" default="Спасенных нами животных" />}
                  text={<React.Fragment><TI18n keyStr="counterBlockText" default="по данным на" /> 13.12.19</React.Fragment>}
                  images={[counterImage1, counterImage2, counterImage3, counterImage4, counterImage5, counterImage6, counterImage7, counterImage8]}/>
                <HelpedBlock 
                  data={this.getAnimalsList}
                  title={<TI18n keyStr="alreadyHelpedBlockTitle" default="Кому мы помогли" />}/>
            </div>
            </>
        )
    }
}
