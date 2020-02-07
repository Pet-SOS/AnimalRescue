import React from 'react';
import { TI18n } from '../../../../i18n';
import '../style/lookingForAFriendPage.scss';
import { IAnimalsListState } from '../../Animals/store/state';
import { IInfoCard, IInfoContacts } from '../../Home/store/state';
import { Select, SelectExpandDirections } from '../../../../components/Select';
import { AnimalGender, AnimalBreed, AnimalFilterKind, AnimalSize, AnimalAge } from '../../../../api/animals';
import tranlateText from '../../../../i18n/translations/ru';
import { store } from '../../../../store';
import { HelpBlock } from '../../Header/ui/HelpBlock';
import { AnimalCard } from '../../Animals/AnimalCard';

interface IPropTypes {
    sickAnimalsList: IAnimalsListState,
    infoCard: IInfoCard,
    infoContacts: IInfoContacts,
    animalsList: IAnimalsListState,
    fetchSickAnimals:() => void;
    fetchAnimalsRequest:() => void;
    fetchInfoCard:() => void;
    fetchInfoContacts:() => void;
}
export class LookingForAFriendPage extends React.Component<IPropTypes> {
    setLocale(value:any){
        console.log(value);
    }
    componentDidMount(){
        if(store.getState().animals.sickAnimalsList.totalCount === 0){
            this.props.fetchSickAnimals();
            this.props.fetchInfoCard();
            this.props.fetchInfoContacts();
            this.props.fetchAnimalsRequest();
        }
    }
    render(){
        return (
            <div className='looking-friend-block'>
                <div className='content'>
                    <div className='title'><TI18n keyStr="lookingForAFriendPageTitle" default="Ищу друга"/></div>
                    <div className='box-select'>
                        <Select
                            data={Object.values(AnimalFilterKind).map((value)=>({label: value, value: value}))}
                            selected={Object.values(AnimalFilterKind)[0]}
                            onChange={(value: string) => this.setLocale(value)}
                            expandDirection={SelectExpandDirections.BOTTOM}
                            title={<TI18n keyStr="lookingForAFriendPageSelectKind" default={tranlateText.lookingForAFriendPageSelectKind} />}
                        />
                        <Select
                            data={Object.values(AnimalBreed).map((value)=>({label: value, value: value}))}
                            selected={Object.values(AnimalBreed)[0]}
                            onChange={(value: string) => this.setLocale(value)}
                            expandDirection={SelectExpandDirections.BOTTOM}
                            title={<TI18n keyStr="lookingForAFriendPageSelectBreed" default={tranlateText.lookingForAFriendPageSelectBreed} />}
                        />
                        <Select
                            data={Object.values(AnimalGender).map((value)=>({label: value, value: value}))}
                            selected={Object.values(AnimalGender)[0]}
                            onChange={(value: string) => this.setLocale(value)}
                            expandDirection={SelectExpandDirections.BOTTOM}
                            title={<TI18n keyStr="lookingForAFriendPageSelectGender" default={tranlateText.lookingForAFriendPageSelectGender} />}
                        />
                        <Select
                            data={Object.values(AnimalAge).map((value)=>({label: value, value: value}))}
                            selected={Object.values(AnimalAge)[0]}
                            onChange={(value: string) => this.setLocale(value)}
                            expandDirection={SelectExpandDirections.BOTTOM}
                            title={<TI18n keyStr="lookingForAFriendPageSelectAge" default={tranlateText.lookingForAFriendPageSelectAge} />}
                        />
                         <Select
                            data={Object.values(AnimalSize).map((value)=>({label: value, value: value}))}
                            selected={Object.values(AnimalSize)[0]}
                            onChange={(value: string) => this.setLocale(value)}
                            expandDirection={SelectExpandDirections.BOTTOM}
                            title={<TI18n keyStr="lookingForAFriendPageSelectSize" default={tranlateText.lookingForAFriendPageSelectSize} />}
                        />
                    </div>
                    di
                    <div className='content-block'>
                        {
                            this.props.animalsList.data.length &&
                            this.props.animalsList.data.map(animal => <div className='animal'><AnimalCard animal={animal}/></div>)
                        }
                    </div>
                </div>
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
            </div>
        )
    }
}