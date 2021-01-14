import React from 'react';
import { store } from '../../../../store';
import { HelpBlock } from '../../../../components/HelpBlock';
import { TI18n } from '../../../../i18n';
import { ReactComponent as Facebook } from '../../../../assets/helpBlock/facebook.svg';
import { ReactComponent as Instagram } from '../../../../assets//helpBlock/twitter.svg';
import { ReactComponent as Youtube } from '../../../../assets//helpBlock/youtube.svg';
import defaultText from '../../../../i18n/translations/ru';
import '../styles/contactsPage.scss';
import { IInfoCard, IInfoContacts } from '../../Home/store/state';
import { IAnimalsListState } from '../../Animals/store/state';
import Icon from '../../../../components/Icon';
import { ReactComponent as InstagramLogo } from '../../../../assets/header/instagram.svg';
import { SocialLinks } from '../../../../components/SocialLinks';

interface IPropTypes {
  appLanguage: string,
  sickAnimalsList: IAnimalsListState;
  infoCard: IInfoCard;
  infoContacts: IInfoContacts;
  fetchSickAnimals: () => void;
  fetchInfoCard: () => void;
  fetchInfoContacts: () => void;
}
export class ContactsPage extends React.Component<IPropTypes> {
  componentDidMount() {
    if (store.getState().animals.sickAnimalsList.totalCount === 0) {
      this.props.fetchSickAnimals();
      this.props.fetchInfoCard();
      this.props.fetchInfoContacts();
    }
  }
  render() {
    return (
      <div className="contacts-page">
        <div className="container">
          <h2 className="title">
            <TI18n keyStr="contactsTitle" default={defaultText.contactsTitle} />
          </h2>
          <div className="list-contacts">
            <div className="item-contacts">
              <address>
                <p className="contacts-box">
                  {this.props.infoContacts.data.phones[0]}
                </p>
              </address>
              <span className="descriptions-contacts">
                <TI18n
                  keyStr="contactsHelp"
                  default={defaultText.contactsHelp}
                />
                <br />
                <TI18n
                  keyStr="contactsRoundTheClock"
                  default={defaultText.contactsRoundTheClock}
                />
              </span>
            </div>
            <div className="item-contacts">
              <address>
                {[1, 2, 3].map(i => <p className='contacts-box'>{this.props.infoContacts.data.phones[i]}</p>)}
              </address>
              <span className="descriptions-contacts">
                <TI18n
                  keyStr="contactsAdoptionIssues"
                  default={defaultText.contactsAdoptionIssues}
                />
              </span>
            </div>
            <div className="item-contacts">
              <address>
                <p className="contacts-box">
                  {this.props.infoContacts.data.emails.animalRescue1}
                </p>
              </address>
              <span className="descriptions-contacts">
                <TI18n
                  keyStr="contactsemail"
                  default={defaultText.contactsemail}
                />
              </span>
            </div>
          </div>
          <div className="hold-address">
            <div className="box-address">
              <h4>
                {' '}
                <TI18n
                  keyStr="contactsOffice"
                  default={defaultText.contactsOffice}
                />
              </h4>
              <p>{
                this.props.infoContacts.data.paragraphs
                  .map(p => p.values
                    .filter(v => v.lang === this.props.appLanguage)
                    .map(v => v.value)[0]).join(', ')
              }</p>
              <span className="descriptions-contacts">
                <TI18n
                  keyStr="contactsWarning"
                  default={defaultText.contactsWarning}
                />
              </span>
            </div>
            <div className="main-social-link">
              <SocialLinks />
            </div>
          </div>
          <div className="map">
            <iframe
              title="map-animal-rescue"
              width="100%"
              height="505"
              id="gmap_canvas"
              scrolling="no"
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2563.8400563048103!2d36.230044!3d50.014353!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xf9b632eecf8bdf9!2sPoryatunok%20Tvaryn%20Kharkiv!5e0!3m2!1sen!2sus!4v1580380094604!5m2!1sen!2sus"
            ></iframe>
          </div>
        </div>
        {this.props.sickAnimalsList.totalCount > 0 && (
          <HelpBlock
            animalsList={this.props.sickAnimalsList.data}
            title={
              <TI18n
                keyStr="canHelpBlockTitle"
                default={defaultText.canHelpBlockTitle}
              />
            }
          />
        )}
      </div>
    );
  }
}
