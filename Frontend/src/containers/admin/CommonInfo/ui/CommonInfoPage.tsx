import React from "react";
import {AdminMenu} from "../../AdminMenu";
import {Tabs} from "antd";
import {AdminCommonHead} from "./AdminCommonHead";
import {IInfoContactsResponse} from "../../../../api/contacts";
import {IInfoCard} from "../../../client/Home/store/state";

const {TabPane} = Tabs;

interface IPropTypes {
  fetchInfoCard: () => {};
  fetchInfoContacts: () => {};
  infoContacts: IInfoContactsResponse;
  infoCard: IInfoCard;
}
export class CommonInfoPage extends React.Component<IPropTypes> {
  state = {
    editorState: '<p>Hey this <strong>editor</strong> rocks</p>'
  }

  componentDidMount() {
    this.props.fetchInfoCard();
    this.props.fetchInfoContacts();
  }

  callback(key: any) {
    console.log(key);
  }

  render() {
    return (
      <div className='boxAdmin'>
        <AdminMenu
          selectedKey={'common'}
          openKeys={['sub2', 'sub1']}
        />
        <main>
          <div className="container">
            <div>
              <h2> Загальні налаштування </h2>
              <div>
                {this.props.infoContacts.data && this.props.infoContacts.self &&
                this.props.infoCard.self &&
                <AdminCommonHead
                  socialLinks={this.props.infoContacts.data.socialLinks}
                  phones={this.props.infoContacts.data.phones}
                  emails={this.props.infoContacts.data.emails}
                  addresses={this.props.infoContacts.data.addresses}
                  infoCard={this.props.infoCard.data}
                />}
              </div>
            </div>
            <Tabs defaultActiveKey="1" onChange={this.callback}>
              <TabPane tab="Укр" key="1">
                <div>
                  <span>Content of Tab Pane 1</span>
                  <br/>
                  <br/>
                </div>
              </TabPane>
              <TabPane tab="Eng" key="2">
                Content of Tab Pane 2
              </TabPane>
              <TabPane tab="Deu" key="3">
                Content of Tab Pane 3
              </TabPane>
              <TabPane tab="Рус" key="4">
                Content of Tab Pane 3
              </TabPane>
            </Tabs>
          </div>
        </main>
      </div>
    )
  }
}
