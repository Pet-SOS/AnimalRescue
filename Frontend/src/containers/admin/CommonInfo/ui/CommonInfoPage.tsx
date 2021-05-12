import React from 'react';
import { AdminMenu } from '../../AdminMenu';
import { AdminCommonHead } from './AdminCommonHead';
import { IInfoContactsResponse } from '../../../../api/contacts';
import { IInfoCard } from '../../../client/Home/store/state';
import { IHelpPopupResponse } from '../../../../api/help-popup';
import { IHowToAdoptResponse } from '../../../../api/howToAdopt';
import { ITakeHomePopupResponse } from '../../../../api/takeHomePopup';
import { IAvailableLanguagesResponse } from '../../../../api/languages';
import '../style/CommonInfoPage.scss';

interface IPropTypes {
  fetchInfoCard: () => {};
  fetchInfoContacts: () => {};
  fetchHelpPopup: () => {};
  fetchTakeHomePopup: () => {};
  fetchHowToAdopt: () => {};
  fetchAvailableLanguages: () => {};
  infoContacts: IInfoContactsResponse;
  helpPopup: IHelpPopupResponse;
  infoCard: IInfoCard;
  takeHomePopup: ITakeHomePopupResponse;
  howToAdopt: IHowToAdoptResponse;
  availableLanguages: IAvailableLanguagesResponse;
}
export class CommonInfoPage extends React.Component<IPropTypes> {
  state = {
    editorState: '<p>Hey this <strong>editor</strong> rocks</p>',
  };

  componentDidMount() {
    this.props.fetchInfoCard();
    this.props.fetchInfoContacts();
    this.props.fetchHelpPopup();
    this.props.fetchTakeHomePopup();
    this.props.fetchHowToAdopt();
    this.props.fetchAvailableLanguages();
  }

  callback(key: any) {
    console.log(key);
  }

  render() {
    return (
      <div className="boxAdmin">
        <AdminMenu selectedKey={'common'} openKeys={['sub1']} />
        <main>
          <div className="container">
            <div>
              <h2> Загальні налаштування </h2>
              <div>
                {
                  this.props.helpPopup.data &&
                  this.props.helpPopup.self &&
                  this.props.infoContacts.data &&
                  this.props.infoContacts.self &&
                  this.props.infoCard.self && (
                    <AdminCommonHead
                      socialLinks={this.props.infoContacts.data.socialLinks}
                      phones={this.props.infoContacts.data.phones}
                      emails={this.props.infoContacts.data.emails}
                      addresses={this.props.infoContacts.data.addresses}
                      paragraphs={this.props.infoContacts.data.paragraphs}
                      infoCard={this.props.infoCard.data}
                      helpPopup={this.props.helpPopup.data.paragraphs}
                      takeHomePopup={this.props.takeHomePopup.data.paragraphs}
                      howToAdopt={this.props.howToAdopt.data.paragraphs}
                      availableLanguages={this.props.availableLanguages.data.languages}
                    />
                  )}
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}
