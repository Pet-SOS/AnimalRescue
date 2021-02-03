import React from "react";
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
            label: 'Заголовок',
            key: 'header'
        }, {
            label: 'Текст',
            key: 'text'
        }
    ]
};

interface IPropTypes {
    // paragraphs: IParagraph[];
    handleHelpPopup: (event: React.ChangeEvent<HTMLInputElement>, key: string, lang: string) => void;
}

export class HelpPopup extends React.Component<IPropTypes> {
    constructor(props: IPropTypes){
        super(props)
    }

    render() {
        const handleHelpPopup = this.props.handleHelpPopup;

        return (
            <Tabs defaultActiveKey="1">
                {config.tabs.map(tab => <TabPane tab={tab.label} key={tab.key}>
                    {config.controls.map(control => <div className="form-row">
                        <label htmlFor={control.key + tab.key}>{control.label}</label>
                        <input
                            id={control.key + tab.key}
                            type="text"
                            onChange={(e)=>handleHelpPopup(e, control.key, tab.lang)}
                            value=''/>
                    </div>)}
                </TabPane>)}
            </Tabs>
        )
    }
}
