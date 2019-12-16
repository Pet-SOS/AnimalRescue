import React from 'react';
import {RouteComponentProps} from "react-router";
import {TI18n} from '../../../../i18n';
import {HelpBlock} from "../../../../components/HelpBlock";
import '../styles/home.scss';

interface IPropTypes extends RouteComponentProps<any> {

}

export const HomePage: React.FC<IPropTypes> = (props: IPropTypes) => {

    return (
        <div className="home-page">
            <div><h2>CONTENT</h2></div>
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
        </div>
    )
};
