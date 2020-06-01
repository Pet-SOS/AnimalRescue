import React from "react";

interface IPropTypes {
  description: string;
  character: string;
  onChange: (e: any, key: string) => any;
}

export class DescriptionTabContent extends React.PureComponent<IPropTypes> {
  render() {
    return (
      <>
        <div className="form-row small-row">
          <label htmlFor="description-field">Трохи історії</label>
          <textarea
            id="description-field"
            value={this.props.description}
            onChange={(e) => this.props.onChange(e, 'description')}
          />
        </div>
        <div className="form-row small-row">
          <label htmlFor="character-field">Характер</label>
          <textarea
            id="character-field"
            value={this.props.character}
            onChange={(e) => this.props.onChange(e, 'character')}
          />
        </div>
      </>
    );
  }
}
