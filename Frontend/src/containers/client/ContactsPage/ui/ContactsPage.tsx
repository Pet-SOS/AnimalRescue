import React from 'react';
import { store } from '../../../../store';
import { IInfoContacts } from '../../../../api/contacts';
import { IInfoCard } from '../../../../api/infoCard';
import { IAnimalsResponse } from '../../../../api/animals';
import { HelpBlock } from '../../Header/ui/HelpBlock';
import { TI18n } from '../../../../i18n';
import {ReactComponent as Facebook} from '../../../../assets/helpBlock/facebook.svg';
import {ReactComponent as Instagram} from '../../../../assets//helpBlock/twitter.svg';
import {ReactComponent as Youtube} from '../../../../assets//helpBlock/youtube.svg';
import  defaultText  from '../../../../i18n/translations/ru';
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
                            <iframe width="100%" 
                            title='map-animal-rescue'
                                height="505" id="gmap_canvas" 
                                src="https://maps.google.com/maps?q=%D0%A3%D0%BA%D1%80%D0%B0%D0%B8%D0%BD%D0%B0%2C%20%D0%B3.%20%D0%A5%D0%B0%D1%80%D1%8C%D0%BA%D0%BE%D0%B2%2C%20%D1%83%D0%BB.%20%D0%A1%D0%B5%D1%80%D0%BF%D0%BE%D0%B2%D0%B0%D1%8F%204%20(%D0%BC.%20%D0%9D%D0%B0%D1%83%D1%87%D0%BD%D0%B0%D1%8F)&t=&z=17&ie=UTF8&iwloc=&output=embed" 
                                scrolling="no">
                            </iframe>
                        </div>
                </div>
                {
                    this.props.sickAnimalsList.totalCount > 0 &&
                <HelpBlock
                    animalsList={this.props.sickAnimalsList}
                    backgroundColor='#333572'
                    title={<TI18n keyStr="canHelpBlockTitle" default={defaultText.canHelpBlockTitle} />}
                    color='#409275'
                    text={{
                    color: '#ffffff',
                    content: <TI18n keyStr="canHelpBlockContent" default={defaultText.canHelpBlockContent} />
                    }}
                    btn={{
                    style: 'yellow',
                    content: <TI18n keyStr="footerRightBtn" default={defaultText.footerRightBtn} />
                    }}
                    story={true}
                />
                }
            </div>
        )
    }
};