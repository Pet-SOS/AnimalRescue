import React from "react";
import { Tabs } from "antd";
import { addHelpPopup, IParagraph } from "../../../../api/help-popup";
import { DEFAULT_HELP_POPUP } from "../../../client/Home/store/state";

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
    paragraphs: IParagraph[];
}
interface IState {
    paragraphs: IParagraph[];
}
export class HelpPopup extends React.Component<IPropTypes, IState> {
    constructor(props: IPropTypes){
        super(props);
        this.state = {
            paragraphs: this.props.paragraphs.length ? this.props.paragraphs : DEFAULT_HELP_POPUP.data.paragraphs,
        };
    }

    handleHelpPopup = (e: React.ChangeEvent<HTMLInputElement>, key: string, lang: string) => {
        const paragraphs = [...this.state.paragraphs];
        const paragraphIndex = paragraphs.findIndex(p => p.name === key);
        const valueIndex = paragraphs[paragraphIndex].values.findIndex(v => v.lang === lang);
        paragraphs[paragraphIndex].values[valueIndex].value = e.target.value;
    
        this.setState({ paragraphs });
    };

    handleSubmit = (e: React.SyntheticEvent<EventTarget>) => {
        e.preventDefault();
        addHelpPopup({
            paragraphs : [...this.state.paragraphs]
        }).then(resp => console.log(resp));
    };

    render() {
        return (
            <Tabs defaultActiveKey="1">
                {config.tabs.map(tab => <TabPane tab={tab.label} key={tab.key}>
                    {config.controls.map(control => <div className="form-row" key={control.key}>
                        <label htmlFor={control.key + tab.key}>{control.label}</label>
                        <input
                            id={control.key + tab.key}
                            type="text"
                            onChange={(e)=>this.handleHelpPopup(e, control.key, tab.lang)}
                            value=''/>
                    </div>)}

                    <button className="btn btn-blue" onClick={(e)=>this.handleSubmit(e)}>Зберегти зміни</button>
                </TabPane>)}
            </Tabs>
        )
    }
}
