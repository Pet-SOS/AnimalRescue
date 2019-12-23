import React, {useEffect} from 'react';
import {RouteComponentProps} from "react-router";
import {TI18n} from '../../../../i18n';
import {HelpBlock} from "../../../../components/HelpBlock";
import {Slider} from "../../../../components/Slider";
import {IAnimalsResponse} from "../../../../api/animals";
import '../styles/home.scss';

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
            }))
        }
        return []
    }

    render() {
        return (
            <div className="home-page">
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
            </div>
        )
    }
}
