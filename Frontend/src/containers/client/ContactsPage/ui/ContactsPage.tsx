import React from 'react';
import { store } from '../../../../store';
import { HelpBlock } from '../../../../components/HelpBlock';
import { TI18n } from '../../../../i18n';
import {ReactComponent as Facebook} from '../../../../assets/helpBlock/facebook.svg';
import {ReactComponent as Instagram} from '../../../../assets//helpBlock/twitter.svg';
import {ReactComponent as Youtube} from '../../../../assets//helpBlock/youtube.svg';
import  defaultText  from '../../../../i18n/translations/ru';
import '../styles/contactsPage.scss';
import { IInfoCard, IInfoContacts } from '../../Home/store/state';
import { IAnimalsListState } from '../../Animals/store/state';

interface IPropTypes {
  sickAnimalsList: IAnimalsListState,
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
            <div className='contacts'>
                <div className="content">
                        <div className="title"><TI18n keyStr="contactsTitle" default={defaultText.contactsTitle} /></div>
                        <div className='info'>
                            <div className='box-info'>
                                <p className='contacts-box'>{this.props.infoContacts.data.phones[0]}</p>
                                <p className='contacts-tex'><TI18n keyStr="contactsHelp" default={defaultText.contactsHelp} /></p>
                                <p className='contacts-tex'><TI18n keyStr="contactsRoundTheClock" default={defaultText.contactsRoundTheClock} /></p>
                            </div>
                            <div className='box-info'>
                                <p className='contacts-box'>{this.props.infoContacts.data.phones[1]}</p>
                                <p className='contacts-box'>{this.props.infoContacts.data.phones[2]}</p>
                                <p className='contacts-tex'><TI18n keyStr="contactsAdoptionIssues" default={defaultText.contactsAdoptionIssues} /></p>
                            </div>
                            <div className='box-info'>   
                                <p className='contacts-box'>{this.props.infoContacts.data.emails.animalRescue1}</p>
                                <p className='contacts-tex'><TI18n keyStr="contactsemail" default={defaultText.contactsemail} /></p>
                            </div>
                        </div>
                        <div className="title smaller"> <TI18n keyStr="contactsOffice" default={defaultText.contactsOffice}/></div>
                        <div className="box-social-link">
                            <div className='box-info'>
                                <p className='contacts-box smaller'>{
                                    `${this.props.infoContacts.data.addresses.country}, 
                                    ${this.props.infoContacts.data.addresses.town}, 
                                    ${this.props.infoContacts.data.addresses.street}
                                    `}</p>
                                <p className='contacts-tex'><TI18n keyStr="contactsWarning" default={defaultText.contactsWarning} /></p>
                            </div>
                           <div className='main-social-link'>
                                <div className='social-link'>
                                <a href={this.props.infoContacts.data.socialLinks.facebook} target="_blank" rel="noopener noreferrer"><Facebook/><p>Facebook</p></a>
                                </div>
                                <div className='social-link'>
                                <a href={this.props.infoContacts.data.socialLinks.instagram} target="_blank" rel="noopener noreferrer"><Instagram/><p>Instagram</p></a>
                                </div>
                                <div className='social-link'>
                                <a href={this.props.infoContacts.data.socialLinks.youtube} target="_blank" rel="noopener noreferrer"><Youtube/><p>Youtube</p></a>
                                </div>
                           </div>
                        </div>
                        <div className="map">
                            <iframe
                                title='map-animal-rescue'
                                width="100%"
                                height="505"
                                id="gmap_canvas" 
                                scrolling="no"
                                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2563.8400563048103!2d36.230044!3d50.014353!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xf9b632eecf8bdf9!2sPoryatunok%20Tvaryn%20Kharkiv!5e0!3m2!1sen!2sus!4v1580380094604!5m2!1sen!2sus">
                            </iframe>
                        </div>
                </div>
                {
                    this.props.sickAnimalsList.totalCount > 0 &&
                <HelpBlock
                    animalsList={this.props.sickAnimalsList.data}
                    title={<TI18n keyStr="canHelpBlockTitle" default={defaultText.canHelpBlockTitle} />}
                />
                }
            </div>
        )
    }
};