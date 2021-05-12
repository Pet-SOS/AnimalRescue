import React from "react";
import { Tabs } from "antd";
import { updateLanguages, ILanguagesState } from "../../../../api/languages";
import { DEFAULT_AVAILABLE_LANGUAGES_STATE } from "../../../client/Home/store/state";
import { HtmlEditor, styleCard } from '../../../../components/HtmlEditor';
import { CheckBoks } from '../../../../components/CheckBoks';

const { TabPane } = Tabs;

interface IPropTypes {
  languages: ILanguagesState;
}
interface IState {
  languages: ILanguagesState;
}
export class AvailableLanguages extends React.Component<IPropTypes, IState> {
  constructor(props: IPropTypes){
    super(props);

    const languages = { ...DEFAULT_AVAILABLE_LANGUAGES_STATE.data.languages };

    for (const key in languages) {
      if (languages.hasOwnProperty(key)) {
        //@ts-ignore
        languages[key] = this.props.languages[key];
      }
    }

    this.state = { languages };
  }

  onCheckBoxChanged = (tag: string) => {
    const newLanguages = { ...this.state.languages };
    //@ts-ignore
    newLanguages[tag] = !newLanguages[tag];
    this.setState({ languages: newLanguages });
  }

  handleSubmit = (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault();
    updateLanguages({
      languages : {...this.state.languages}
    }).then(resp => console.log(resp));
  };

  render() {
    const languages = {...this.state.languages};

    return (
      <>
        <div className="form-row">
          <fieldset className="fieldset-vertical">
            <CheckBoks
              name={'Українська'}
              setCheckboxCheck={this.onCheckBoxChanged}
              state={languages.ua}
              tag={'ua'}
            />
            <CheckBoks
              name={'Англійська'}
              setCheckboxCheck={this.onCheckBoxChanged}
              state={languages.en}
              tag={'en'}
            />
            <CheckBoks
              name={'Німецька'}
              setCheckboxCheck={this.onCheckBoxChanged}
              state={languages.de}
              tag={'de'}
            />
            <CheckBoks
              name={'Російська'}
              setCheckboxCheck={this.onCheckBoxChanged}
              state={languages.ru}
              tag={'ru'}
            />
          </fieldset>
        </div>
        <button className="btn btn-blue" onClick={(e)=>this.handleSubmit(e)}>Зберегти зміни</button>
      </>
    )
  }
}
