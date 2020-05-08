import React, {ChangeEvent} from "react";
import {EditableTags} from "../../../../api/animals";

interface IPropTypes {
  donationActive: boolean;
  tags: string[];
  bannerText: string;
  onChange: (e: ChangeEvent<HTMLInputElement>, key: string) => any;
  onUpdateTag: (tagName: string) => any;
  onToggleDonation: () => any;
}

export class HealthTabContent extends React.PureComponent<IPropTypes> {
  renderTagSelection = (tag: string, title: string) => {
    return (
      <li>
        <label>
          <span>{title}</span>
          <input
            checked={this.props.tags.indexOf(tag) !== -1}
            type="checkbox"
            onChange={() => this.props.onUpdateTag(tag)}
          />
          <span>checkbox</span>
        </label>
      </li>
    );
  }

  renderBannerBlock = () => {
    const {donationActive, onToggleDonation, bannerText, onChange} = this.props;
    return (
      <>
        <li>
          <label>
            <span>Вiдкрити Cбір коштів</span>
            <input
              type="checkbox"
              checked={donationActive}
              onChange={onToggleDonation}
            />
            <span>{donationActive}</span>
          </label>
        </li>
        {donationActive && (
          <li>
            <label><span>Текст на банері</span></label><br/>
            <input
              value={bannerText}
              onChange={(e) => onChange(e, 'bannerText')}/>
          </li>
        )}
      </>
    );
  }

  render() {
    return (
      <div>
        <ul>
          {this.renderBannerBlock()}
          {this.renderTagSelection(EditableTags.STERILIZED, 'Стерилізован')}
          {this.renderTagSelection(EditableTags.VACCINATED, 'Щеплен')}
          {this.renderTagSelection(EditableTags.READY_TO_TRAVEL, 'Готов до виїзду за кордон')}
        </ul>
      </div>
    );
  }
}
