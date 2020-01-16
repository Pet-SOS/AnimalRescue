import React from 'react';
import {RouteComponentProps} from "react-router";
import {TI18n} from '../../../../i18n';
import {HelpBlock} from "../../../../components/HelpBlock";
import {Slider} from "../../../../components/Slider";
import {IAnimalsResponse} from "../../../../api/animals";
import '../styles/home.scss';
import { BottomContent } from '../../Header/ui/BottomContent';
import {OurGoalBlock} from '../../Home/ui/OurGoal';
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
            <   OurGoalBlock 
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
                    linkText={<TI18n keyStr="ourGoalBlockLinkText" default="Подробнее о службе" />}
                />
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
