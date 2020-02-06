import React from 'react';
import { TI18n } from '../../../../i18n';
import '../style/lookingForAFriendPage.scss';
import { IAnimalsListState } from '../../Animals/store/state';
import { IInfoCard, IInfoContacts } from '../../Home/store/state';

interface IPropTypes {
    sickAnimalsList: IAnimalsListState,
    infoCard: IInfoCard,
    infoContacts: IInfoContacts,
    fetchSickAnimals:() => void;
    fetchInfoCard:() => void;
    fetchInfoContacts:() => void;
}
export class LookingForAFriendPage extends React.Component<IPropTypes> {
    render(){
        return (
            <div className='looking-friend-block'>
                <div className='content'>
                <div className='title'><TI18n keyStr="lookingForAFriendPageTitle" default="Ищу друга"/></div>
                </div>
            </div>
        )
    }
}