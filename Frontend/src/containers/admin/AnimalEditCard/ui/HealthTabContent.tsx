import React, {ChangeEvent} from "react";
import {Button, ButtonTypes} from "../../../../components/Button";
import {EditableTags} from "../../../../api/animals";
import _ from "lodash";

interface IPropTypes {
  healthInfo?: {
    isDonationActive: boolean,
    tags: string[];
  }
  bannerText: string;
  onChange: (e: any, type: any) => any;
  onChangeTagList: (tags: string[]) => any;
}

interface IStateTypes {
  tags: string[];
}

export class HealthTabContent extends React.Component<IPropTypes, IStateTypes> {
  constructor(props: IPropTypes) {
    super(props);
    this.state = {
      tags: []
    }
  }

  componentDidUpdate(prevProps: Readonly<IPropTypes>, prevState: Readonly<IStateTypes>, snapshot?: any) {
    const {tags}: any = this.props.healthInfo;
    // if (this.state.tags !== tags) {
    if (!_.isEqual(this.state.tags.sort(), tags.sort())) {
      this.setState({
        tags
      })
    }
  }

  onToggleDonation = (e: ChangeEvent<HTMLInputElement>) => {
    this.props.onChange(e, 'isDonationActive')
  }

  onUpdateBannerText = (e: ChangeEvent<HTMLInputElement>) => {
    this.props.onChange(e, 'bannerText')
  }

  onAddTag = (e: ChangeEvent<HTMLInputElement>, tagName: string) => {
    const index = this.state.tags.indexOf(tagName);
    const tags = this.state.tags.slice();
    if (index === -1) {
      tags.push(tagName);
      this.props.onChangeTagList(tags)
    } else {
      tags.splice(index, 1);
      this.props.onChangeTagList(tags)
    }
  }

  render() {
    const { bannerText, onChange, healthInfo } = this.props;
    // @ts-ignore
    return (
      <div>
        <ul>
          <li>
            <label>
              <span>Вiдкрити Cбір коштів</span>
              <input
                type="checkbox"
                onChange={this.onToggleDonation}
              />
              <span>{healthInfo?.isDonationActive}</span>
            </label>
          </li>

          {/*TODO: Move to separate method*/}
          {healthInfo?.isDonationActive && (
            <li>
              <label><span>Текст на банері</span></label><br/>
              <input
                value={bannerText}
                onChange={this.onUpdateBannerText}/>
            </li>
          )}

          {/*TODO: Make separate method for render a checkbox*/}
          {/*TODO: Check the texts*/}
          <li>
            <label>
              <span>Стерилізован</span>
              <input type="checkbox" onChange={(e) => this.onAddTag(e, EditableTags.STERILIZED)}/>
              <span>checkbox</span>
            </label>
          </li>
          <li>
            <label>
              <span>Щеплен</span>
              <input type="checkbox" onChange={(e) => this.onAddTag(e, EditableTags.VACCINATED)}/>
              <span>checkbox</span>
            </label>
          </li>
          <li>
            <label>
              <span>Готов до виїзду за кордон</span>
              <input type="checkbox" onChange={(e) => this.onAddTag(e, EditableTags.READY_TO_TRAVEL)}/>
              <span>checkbox</span>
            </label>
          </li>

        </ul>
        <Button
          styleType={ButtonTypes.Blue}>
          Зберегти зміни
        </Button>
      </div>
    );
  }
}

{/*<TabPane tab="Здоров’я" key="2">*/}
{/*    <ul>*/}
{/*        <li><label><span>Вiдкрити Cбір коштів</span><input type="checkbox" onChange={(e) => this.changeValue(e, 'isDonationActive')}/><span>{isDonationActive}</span></label></li>*/}
{/*        {!!this.state.isDonationActive && (      */}
{/*          <li>                    */}
{/*              <label><span>Текст на банері</span></label><br />*/}
{/*              <input value={bannerText} onChange={(e) => this.changeValue(e, 'bannerText')}/>*/}
{/*          </li>*/}
{/*        )}*/}
{/*        <li><label><span>Стерилізован</span><input type="checkbox"/><span>checkbox</span></label></li>*/}
{/*        <li><label><span>Щеплен</span><input type="checkbox"/><span>checkbox</span></label></li>*/}
{/*        <li><label><span>Готов до виїзду за кордон</span><input type="checkbox"/><span>checkbox</span></label></li>*/}
{/*    </ul>*/}
{/*    <Button*/}
{/*        styleType={ButtonTypes.Blue}>*/}
{/*        Зберегти зміни*/}
{/*    </Button>*/}
{/*</TabPane>*/}
