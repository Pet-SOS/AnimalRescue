import React from 'react';
import { AdminMenu } from '../../AdminMenu';
import { AdminCommonHead } from './AdminCommonHead';
import { IInfoContactsResponse } from '../../../../api/contacts';
import { IInfoCard } from '../../../client/Home/store/state';

interface IPropTypes {
  fetchInfoCard: () => {};
  fetchInfoContacts: () => {};
  infoContacts: IInfoContactsResponse;
  infoCard: IInfoCard;
}
export class CommonInfoPage extends React.Component<IPropTypes> {
  state = {
    editorState: '<p>Hey this <strong>editor</strong> rocks</p>',
  };

  componentDidMount() {
    this.props.fetchInfoCard();
    this.props.fetchInfoContacts();
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
                {this.props.infoContacts.data &&
                  this.props.infoContacts.self &&
                  this.props.infoCard.self && (
                    <AdminCommonHead
                      socialLinks={this.props.infoContacts.data.socialLinks}
                      phones={this.props.infoContacts.data.phones}
                      emails={this.props.infoContacts.data.emails}
                      addresses={this.props.infoContacts.data.addresses}
                      paragraphs={this.props.infoContacts.data.paragraphs}
                      infoCard={this.props.infoCard.data}
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
