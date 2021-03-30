import React from 'react';
import { Tabs } from "antd";
import { IAnimalMultiLangProp } from '../../../../api/animals';

const { TabPane } = Tabs;

interface IPropTypes {
  description: IAnimalMultiLangProp[];
  character: IAnimalMultiLangProp[];
  onChange: (value: string, key: string, lang: string) => any;
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

export class DescriptionTabContent extends React.PureComponent<IPropTypes> {
  render() {
    const { character, description } = this.props;
    return (
      <>
      <Tabs defaultActiveKey="1">
        {config.tabs.map(tab => <TabPane tab={tab.label} key={tab.key}>
          <div className="form-row" key={tab.key}>
            <label htmlFor={tab.key}>Трохи історії</label>
              {
                <textarea
                  id={tab.key}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>)=>this.props.onChange(e.target.value, 'description', tab.lang)}
                  value={`${description.filter(v => v.lang === tab.lang)[0].value}` || ''}
                />
              }
          </div>
        </TabPane>)}
      </Tabs>
      <Tabs defaultActiveKey="1">
      {config.tabs.map(tab => <TabPane tab={tab.label} key={tab.key}>
          <div className="form-row" key={tab.key}>
            <label htmlFor={tab.key}>Характер</label>
              {
                <textarea
                  id={tab.key}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>)=>this.props.onChange(e.target.value, 'character', tab.lang)}
                  value={`${character.filter(v => v.lang === tab.lang)[0].value}` || ''}
                />
              }
          </div>
        </TabPane>)}
      </Tabs>
      </>
    );
  }
}
