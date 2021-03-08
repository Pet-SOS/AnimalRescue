import React from 'react';
import { AdminMenu } from '../../AdminMenu';
import { AdminCommonHead } from './AdminCommonHead';
import { IInfoContactsResponse } from '../../../../api/contacts';
import { IInfoCard } from '../../../client/Home/store/state';
import { IHelpPopupResponse } from '../../../../api/help-popup';
import { IHomePopupResponse } from '../../../../api/home-popup';

interface IPropTypes {
  fetchInfoCard: () => {};
  fetchInfoContacts: () => {};
  fetchHelpPopup: () => {};
  fetchHomePopup: () => {};
  infoContacts: IInfoContactsResponse;
  helpPopup: IHelpPopupResponse;
  homePopup: IHomePopupResponse;
  infoCard: IInfoCard;
}
export class CommonInfoPage extends React.Component<IPropTypes> {
  state = {
    editorState: '<p>Hey this <strong>editor</strong> rocks</p>',
  };

  componentDidMount() {
    this.props.fetchInfoCard();
    this.props.fetchInfoContacts();
    this.props.fetchHelpPopup();
    this.props.fetchHomePopup();
  }

  callback(key: any) {
    console.log(key);
  }

  render() {
    return (
      <div className="boxAdmin">
        <AdminMenu selectedKey={'common'} openKeys={[]} />
        <main>
          <div className="container">
            <div>
              <h2> Загальні налаштування </h2>
              <div>
                {
                  this.props.homePopup.data &&
                  this.props.homePopup.self &&
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
                      homePopup={this.props.homePopup.data.paragraphs}
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
