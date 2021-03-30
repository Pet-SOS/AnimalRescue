import React, { ChangeEvent } from 'react';
import { Tabs } from "antd";

import { EditableTags, IAnimalMultiLangProp } from '../../../../api/animals';

const { TabPane } = Tabs;

interface IPropTypes {
  donationActive: boolean;
  tags: string[];
  bannerText: IAnimalMultiLangProp[];
  onChange: (value: string, key: string, lang: string) => any;
  onUpdateTag: (tagName: string) => any;
  onToggleDonation: () => any;
}

const config = {
  tabs: [
      {
          label: 'Укр',
          key: '1',
          lang: 'ua'
      }, {
          label: 'Eng',
          key: '2',
          lang: 'en'
      }, {
          label: 'Deu',
          key: '3',
          lang: 'de'
      }, {
          label: 'Рус',
          key: '4',
          lang: 'ru'
      }
  ],
};

export class HealthTabContent extends React.PureComponent<IPropTypes> {
  renderTagSelection = (tag: string, title: string) => {
    return (
      <li className="chk-label-item">
        <label htmlFor={`chk-${tag}`}>{title}</label>
        <span className="switcher-control">
          <input
            id={`chk-${tag}`}
            type="checkbox"
            checked={this.props.tags.indexOf(tag) !== -1}
            onChange={() => this.props.onUpdateTag(tag)}
          />
          <span></span>
        </span>
      </li>
    );
  };

  renderBannerBlock = () => {
    const {
      donationActive,
      onToggleDonation,
      bannerText,
      onChange,
    } = this.props;
    return (
      <>
        <li className="chk-label-item">
          <label htmlFor="chk-charity">Вiдкрити збір коштів</label>
          <span className="switcher-control">
            <input
              id="chk-charity"
              type="checkbox"
              checked={donationActive}
              onChange={onToggleDonation}
            />
            <span></span>
          </span>
        </li>
        {donationActive && (
          <li>
            <Tabs defaultActiveKey="1">
              {config.tabs.map(tab => <TabPane tab={tab.label} key={tab.key}>
                <div className="form-row" key={tab.key}>
                  <label htmlFor={tab.key}>Текст на банері</label>
                    {
                      <textarea
                        id={tab.key}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>)=>this.props.onChange(e.target.value, 'bannerText', tab.lang)}
                        value={`${bannerText.filter(v => v.lang === tab.lang)[0].value}` || ''}
                      />
                    }
                </div>
              </TabPane>)}
            </Tabs>
            <span className="sub-notes">
              Максимальна кількість 100 символів
            </span>
          </li>
        )}
      </>
    );
  };

  render() {
    return (
      <ul className="tabs-edit-list">
        {this.renderBannerBlock()}
        {this.renderTagSelection(EditableTags.STERILIZED, 'Стерилізований')}
        {this.renderTagSelection(EditableTags.VACCINATED, 'Щеплений')}
        {this.renderTagSelection(
          EditableTags.READYTOABROAD,
          'Готовий до виїзду за кордон',
        )}
      </ul>
    );
  }
}
