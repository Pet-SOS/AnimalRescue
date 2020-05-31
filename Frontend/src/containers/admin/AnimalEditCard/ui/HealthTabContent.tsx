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
  }

  renderBannerBlock = () => {
    const {donationActive, onToggleDonation, bannerText, onChange} = this.props;
    return (
      <>
        <li className="chk-label-item">
            <label htmlFor="chk-charity">Вiдкрити Cбір коштів</label>
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
            <label htmlFor="banner-text-field">Текст на банері</label>
            <input
              id="banner-text-field"
              type="text"
              value={bannerText}
              onChange={(e) => onChange(e, 'bannerText')} 
            />
          </li>
        )}
      </>
    );
  }

  render() {
    return (
      <>
        <ul className="tabs-edit-list">
          {this.renderBannerBlock()}
          {this.renderTagSelection(EditableTags.STERILIZED, 'Стерилізован')}
          {this.renderTagSelection(EditableTags.VACCINATED, 'Щеплен')}
          {this.renderTagSelection(EditableTags.READYTOABROAD, 'Готов до виїзду за кордон')}
        </ul>
      </>
    );
  }
}
