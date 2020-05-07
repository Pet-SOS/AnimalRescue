import React, {ChangeEvent} from "react";
import {Button, ButtonTypes} from "../../../../components/Button";
import {EditableTags} from "../../../../api/animals";

interface IPropTypes {
  donationActive: boolean;
  tags: string[];
  bannerText: string;
  onChange: (e: any, type: any) => any;
  onChangeTagList: (tags: string[]) => any;
  onUpdateHealthInfo: (
    tags: string[],
    isDonationActive: boolean,
    bannerText: string
  ) => any;
}

interface IStateTypes {
  tags: string[];
  isDonationActive: boolean;
  bannerText: string;
}

export class HealthTabContent extends React.Component<IPropTypes, IStateTypes> {
  constructor(props: IPropTypes) {
    super(props);
    this.state = {
      tags: this.props.tags,
      isDonationActive: this.props.donationActive,
      bannerText: this.props.bannerText
    }
  }

  onToggleDonation = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      isDonationActive: !this.state.isDonationActive
    })
  }

  onUpdateBannerText = (e: ChangeEvent<HTMLInputElement>) => {
    // this.props.onChange(e, 'bannerText')
    this.setState({
      bannerText: e.target.value
    })
  }

  onUpdateTag = (e: ChangeEvent<HTMLInputElement>, tagName: string) => {
    const index = this.state.tags.indexOf(tagName);
    const isTagExist = index !== -1;
    const tags = this.state.tags.slice();
    if (isTagExist) {
      tags.splice(index, 1);
      this.props.onChangeTagList(tags);
      this.setState({tags})
    } else {
      tags.push(tagName);
      // this.props.onChangeTagList(tags)
      this.setState({tags})
    }
    console.log('onAddTag update tags', this.state)
  }

  render() {
    const { bannerText, donationActive } = this.props;
    // @ts-ignore
    return (
      <div>
        <ul>
          <li>
            <label>
              <span>Вiдкрити Cбір коштів</span>
              <input
                type="checkbox"
                checked={this.state.isDonationActive}
                onChange={this.onToggleDonation}
              />
              <span>{donationActive}</span>
            </label>
          </li>

          {/*TODO: Move to separate method*/}
          {this.state.isDonationActive && (
            <li>
              <label><span>Текст на банері</span></label><br/>
              <input
                value={this.state.bannerText}
                onChange={this.onUpdateBannerText}/>
            </li>
          )}

          {/*TODO: Make separate method for render a checkbox*/}
          {/*TODO: Check the texts*/}
          <li>
            <label>
              <span>Стерилізован</span>
              <input
                checked={this.state.tags.indexOf(EditableTags.STERILIZED) !== -1}
                type="checkbox"
                onChange={(e) => this.onUpdateTag(e, EditableTags.STERILIZED)}
              />
              <span>checkbox</span>
            </label>
          </li>
          <li>
            <label>
              <span>Щеплен</span>
              <input
                checked={this.state.tags.indexOf(EditableTags.VACCINATED) !== -1}
                type="checkbox" onChange={(e) => this.onUpdateTag(e, EditableTags.VACCINATED)}/>
              <span>checkbox</span>
            </label>
          </li>
          <li>
            <label>
              <span>Готов до виїзду за кордон</span>
              <input
                checked={this.state.tags.indexOf(EditableTags.READY_TO_TRAVEL) !== -1}
                type="checkbox" onChange={(e) => this.onUpdateTag(e, EditableTags.READY_TO_TRAVEL)}/>
              <span>checkbox</span>
            </label>
          </li>

        </ul>
        <Button
          onClick={() => this.props.onUpdateHealthInfo(this.state.tags, this.state.isDonationActive, this.state.bannerText)}
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
