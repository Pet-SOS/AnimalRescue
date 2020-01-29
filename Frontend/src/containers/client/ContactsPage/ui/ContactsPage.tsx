import React from 'react';
import { store } from '../../../../store';
import { IInfoContacts } from '../../../../api/contacts';
import { IInfoCard } from '../../../../api/infoCard';
import { IAnimalsResponse } from '../../../../api/animals';
import { HelpBlock } from '../../Header/ui/HelpBlock';
import { TI18n } from '../../../../i18n';
import '../styles/contactsPage.scss';


interface IPropTypes {
    sickAnimalsList: IAnimalsResponse,
    infoCard: IInfoCard,
    infoContacts: IInfoContacts,
    fetchSickAnimals:() => void;
    fetchInfoCard:() => void;
    fetchInfoContacts:() => void;
}
export class ContactsPage extends React.Component<IPropTypes> {

    componentDidMount(){
        if(store.getState().animals.sickAnimalsList.totalCount === 0){
            this.props.fetchSickAnimals();
            this.props.fetchInfoCard();
            this.props.fetchInfoContacts();
        }
    }
    render(){
        return (
        <React.Fragment>
            <div>contacts</div>
            {
                this.props.sickAnimalsList.totalCount > 0 &&
            <HelpBlock
                animalsList={this.props.sickAnimalsList}
                backgroundColor='#333572'
                title={<TI18n keyStr="canHelpBlockTitle" default="Кому ты можешь помочь" />}
                color='#409275'
                text={{
                color: '#ffffff',
                content: <TI18n keyStr="canHelpBlockContent" default="Маша скромная и добрая собачка. Очень терпеливая и ненавязчивая. Маша была сбита машиной, пережила стресс. Сначала была испугана, потом успокоилась и начала доверять людям. Для восстановления после аварии нужно собрать 3 500 грн." />
                }}
                btn={{
                style: 'yellow',
                content: <TI18n keyStr="footerRightBtn" default="Помочь" />
                }}
                story={true}
            />
            }
        </React.Fragment>
        )
    }
};