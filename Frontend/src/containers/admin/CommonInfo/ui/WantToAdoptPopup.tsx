import React from "react";
import { Tabs } from "antd";
import { updateTakeHomePopup, IParagraph } from "../../../../api/takeHomePopup";
import { DEFAULT_TAKE_HOME_POPUP_STATE } from "../../../client/Home/store/state";
import { HtmlEditor, styleCard } from '../../../../components/HtmlEditor';

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
      tag: 'input',
      key: 'adoptPopupTitle'
    }, {
      label: 'Текст 1',
      tag: 'HtmlEditor',
      key: 'adoptPopupText'
    }, {
      label: 'Електрона адреса, куди прийде повідомлення',
      tag: 'HtmlEditor',
      key: 'email'
    }
  ]
};

interface IPropTypes {
  paragraphs: IParagraph[];
}
interface IState {
  paragraphs: IParagraph[];
}
export class WantToAdoptPopup extends React.Component<IPropTypes, IState> {
  constructor(props: IPropTypes){
    super(props);

    const paragraphs = [...DEFAULT_TAKE_HOME_POPUP_STATE.data.paragraphs];

        paragraphs.forEach(p => {
            const item = this.props.paragraphs.find(p2 => p.name === p2.name);
            if (item)  {
                p.values = item.values;
            }
        });

    this.state = { paragraphs };
  }

  handleHelpPopup = (value: string, key: string, lang: string) => {
    const paragraphs = [...this.state.paragraphs];
    const paragraphIndex = paragraphs.findIndex(p => p.name === key);
    const valueIndex = paragraphs[paragraphIndex].values.findIndex(v => v.lang === lang);
    paragraphs[paragraphIndex].values[valueIndex].value = value;     

    this.setState({ paragraphs });
  };

  handleSubmit = (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault();
    updateTakeHomePopup({
      paragraphs : [...this.state.paragraphs]
    }).then(resp => console.log(resp));
  };

  render() {
    const paragraphs = [...this.state.paragraphs];

    return (
      <Tabs defaultActiveKey="1">
        {config.tabs.map(tab => <TabPane tab={tab.label} key={tab.key}>
          {config.controls.map(control => <div className="form-row" key={control.key}>
            <label htmlFor={control.key + tab.key}>{control.label}</label>
            {
              control.tag === 'input'
              ?
                <input
                  id={control.key + tab.key}
                  type="text"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>)=>this.handleHelpPopup(e.target.value, control.key, tab.lang)}
                  value={`${paragraphs.filter(p => p.name === control.key)[0].values.filter(v => v.lang === tab.lang)[0]?.value}` || ''}/>
              :
                <HtmlEditor
                  editorState={`${paragraphs.filter(p => p.name === control.key)[0].values.filter(v => v.lang === tab.lang)[0]?.value}` || ''}
                  onChange={(value: string)=>this.handleHelpPopup(value, control.key, tab.lang)}
                  classList={styleCard}
                />
            }                            
          </div>)}

          <button className="btn btn-blue" onClick={(e)=>this.handleSubmit(e)}>Зберегти зміни</button>
        </TabPane>)}
      </Tabs>
    )
  }
}
