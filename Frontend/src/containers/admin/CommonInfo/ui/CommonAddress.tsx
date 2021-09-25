import React from "react";
import { IParagraph } from "../../../../api/contacts";
import { Tabs } from "antd";

const { TabPane } = Tabs;

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
    controls: [
        {
            label: 'Країна',
            key: 'country'
        }, {
            label: 'Місто',
            key: 'town'
        }, {
            label: 'Вулиця',
            key: 'street'
        }
    ]
};

interface IPropTypes {
    paragraphs: IParagraph[];
    handleAddress: (event: React.ChangeEvent<HTMLInputElement>, key: string, lang: string) => void;
}

export class CommonAddress extends React.Component<IPropTypes> {
    constructor(props: IPropTypes){
        super(props)
    }

    render() {
        const paragraphs = [...this.props.paragraphs];
        const handleAddress = this.props.handleAddress;

        return (
            <Tabs defaultActiveKey="1">
                {config.tabs.map(tab => <TabPane tab={tab.label} key={tab.key}>
                    {config.controls.map(control => <div className="form-row" key={control.key}>
                        <label htmlFor={control.key + tab.key}>{control.label}</label>
                        <input
                            id={control.key + tab.key}
                            type="text"
                            onChange={(e)=>handleAddress(e, control.key, tab.lang)}
                            value={`${paragraphs.filter(p => p.name === control.key)[0].values.filter(v => v.lang === tab.lang)[0].value}` || ''}/>
                    </div>)}
                </TabPane>)}
            </Tabs>
        )
    }
}
