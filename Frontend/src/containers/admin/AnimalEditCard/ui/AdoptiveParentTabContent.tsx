import React from 'react';

import { fetchAdoptionContractDocument } from '../../../../api/animals';
import '../style/adoptiveParentTabContent.scss';

interface IPropTypes {
  adoptiveName: string;
  adoptivePhone: string;
  adoptionContractFileId: string;
  uploadFile: (e: any) => any;
  onChange: (e: any, key: string) => any;
  saveContractId: () => any;
  deleteContract: () => any;
}

export class AdoptiveParentTabContent extends React.PureComponent<IPropTypes> {
  componentDidMount() {
    this.props.saveContractId();
  }

  componentDidUpdate(prevProps: IPropTypes) {
    if (this.props.adoptionContractFileId !== prevProps.adoptionContractFileId) {
      this.props.saveContractId();
    }
  }

  openPDF = (id: string) => {
    fetchAdoptionContractDocument(id)
      .then(resp => {
        const file = new Blob([resp.data], { type: 'application/pdf' });
        const fileURL = URL.createObjectURL(file);
        const strWindowFeatures =
          'menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=yes';
        window.open(fileURL, 'pdf-report', strWindowFeatures);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    let fileInputRef: any = React.createRef();
    return (
      <>    
        <div className="form-row small-row">
          <label htmlFor="adoptiveName-field">ПІБ усиновлювача</label>
          <input
            id="adoptiveName-field"
            value={this.props.adoptiveName}
            onChange={e => this.props.onChange(e, 'adoptiveName')}
          />
        </div>
        <div className="form-row small-row">
          <label htmlFor="adoptivePhone-field">Телефон</label>
          <input
            id="adoptivePhone-field"
            value={this.props.adoptivePhone}
            onChange={e => this.props.onChange(e, 'adoptivePhone')}
          />
        </div>
        <div className="form-row small-row">
        <legend className="secondary image-legend">Договір про усиновлення</legend>
          {!!this.props.adoptionContractFileId && (
              <div key={this.props.adoptionContractFileId} className="report">
                <i className="icon-pdf" />
                <div
                  onClick={() =>
                    this.openPDF(this.props.adoptionContractFileId)
                  }
                  className="title-item"
                >
                  Contract
                </div>
                <button
                  onClick={() => this.props.deleteContract()}
                  className="delete icon-close"
                />
              </div>
          )}
          <div
            className="add-file-button"
            onClick={() => fileInputRef.current.click()}
          >
            Завантажити документ
            <input
              type="file"
              className="hidden"
              ref={fileInputRef}
              onChange={e => this.props.uploadFile(e)}
            />
          </div>
        </div>
      </>  
    );
  }
}