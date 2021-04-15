import React from 'react';
import { RouteComponentProps } from 'react-router';
import { Tabs } from 'antd';
import { DEFAULT_CONTENT_PAGE_STATE, IContentPageState, } from '../../../../store/state/contentPages.state';
import { IParagraph } from '../../../../api/contacts';
import { HtmlEditor, styleCard } from '../../../../components/HtmlEditor';
import { ContentPagesContainerPage } from './ContentPagesContainerPage';
import { Button, ButtonTypes } from '../../../../components/Button';
import { IContentPage } from '../../../../api/contentPages';
import { TI18n } from '../../../../i18n';
import '../styles/styles.scss';
import {
  IDocument,
  IOrganizationDocumentsResponse,
  fetchDocumentById,
  uploadOrganizationDocument,
  deleteOrganizationDocument,
} from '../../../../api/organizationDocuments';

const { TabPane } = Tabs;

interface IConfigTab {
  label: string;
  key: string;
  lang: string;
}

interface IConfigControl {
  label: string;
  tag: string;
  key: string;
}

interface IConfig {
  tabs: IConfigTab[],
  controls: IConfigControl[],
}

interface IPropTypes extends RouteComponentProps<any> {
  config: IConfig;
  contentPage: IContentPageState;
  withDocs?: boolean;
  organizationDocumentsList: IOrganizationDocumentsResponse;
  fetchContentPage: (pageName: string) => any;
  updateContentPage: (params: { pageName: string; contentPage: IContentPage }) => void;
  clearContentPage: () => void;
  fetchOrganizationDocuments: () => void;
}

interface IState {
  file: any;
  paragraphs: IParagraph[];
}

export class ContentPagesEditItem extends React.Component<IPropTypes, IState> {
  constructor(props: IPropTypes){
    super(props);

    this.state = { paragraphs: [], file: { id: '', fileName: ''}, };
  }

  componentDidMount() {
    const { withDocs, fetchOrganizationDocuments, match } = this.props;
    const pageName = match.path.substr(match.path.lastIndexOf('/') + 1);
    this.props.fetchContentPage(pageName);
    if (withDocs) {
      fetchOrganizationDocuments();
    }
    this.setState({
      paragraphs: this.props.contentPage.data.paragraphs,
    });
  }

  componentDidUpdate(prevProps: IPropTypes) {
    if (!prevProps.contentPage.isLoaded && !!this.props.contentPage.isLoaded) {
      let paragraphs = [...this.props.contentPage.data.paragraphs];
      let newParagraphs: IParagraph[] = [];
      const keysArr = this.props.config.controls.map(c => c.key);
      paragraphs.forEach((p) => {
        const pIndex = keysArr.findIndex(key => key === p.name);
        if (pIndex >= 0) {
          newParagraphs = [...newParagraphs, p];
        }
      })
      this.setState({
        paragraphs: newParagraphs,
      });
    }
  }

  componentWillUnmount() {
    this.props.clearContentPage();
  }

  openPdfFile = (item: IDocument) => {
    fetchDocumentById(item.id)
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

  deleteReport = (id: string) => {
    deleteOrganizationDocument(id)
      .then(res => this.props.fetchOrganizationDocuments())
      .catch(err => console.log(err));
  }

  async uploadFile(e: any) {
    e.preventDefault();
    await this.setState({ file: e.target.files[0] });
  }

  handleUpdate = (value: string, key: string, lang: string) => {
    const paragraphs = [...this.state.paragraphs];
    const paragraphIndex = paragraphs.findIndex(p => p.name === key);
    const valueIndex = paragraphs[paragraphIndex].values.findIndex(v => v.lang === lang);
    paragraphs[paragraphIndex].values[valueIndex].value = value;     

    this.setState({ paragraphs });
  };

  handleDocumentSubmit = (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', this.state.file, this.state.file.fileName);
    uploadOrganizationDocument(formData)
      .then(res => this.props.fetchOrganizationDocuments())
      .catch(err => console.log(err));
  }

  handleSubmit = (e: React.SyntheticEvent<EventTarget>) => {
    const { match } = this.props;
    const pageName = match.path.substr(match.path.lastIndexOf('/') + 1);
    e.preventDefault();
    this.props.updateContentPage({
      pageName,
      contentPage: {
        paragraphs : [...this.state.paragraphs]
      }
    });
};

  render() {
    const { config, withDocs, organizationDocumentsList } = this.props;
    return (
      <ContentPagesContainerPage>
        <header className="edit-header">
          <Button
            className="icon-arrow-left"
            styleType={ButtonTypes.WhiteCircle}
            onClick={this.props.history.goBack}
          />
          <h3>Контентні сторінки</h3>
        </header>
        <div className="content-page">
          {!!this.state.paragraphs.length && (
          <Tabs defaultActiveKey="1">
              {config.tabs.map(tab => <TabPane tab={tab.label} key={tab.key}>
                  {config.controls.map(control => <div className="form-row" key={control.key}>
                      <label htmlFor={control.key + tab.key}>{control.label}</label>
                      {
                          control.tag === 'input'
                          ?
                          <input
                              id={control.key + tab.key}
                              className="title-input"
                              type="text"
                              onChange={(e: React.ChangeEvent<HTMLInputElement>)=>this.handleUpdate(e.target.value, control.key, tab.lang)}
                              value={`${this.state.paragraphs.filter(p => p.name === control.key)[0].values.filter(v => v.lang === tab.lang)[0].value}` || ''}
                          />
                          :
                          <HtmlEditor
                              editorState={`${this.state.paragraphs.filter(p => p.name === control.key)[0].values.filter(v => v.lang === tab.lang)[0].value}` || ''}
                              onChange={(value: string)=>this.handleUpdate(value, control.key, tab.lang)}
                              classList={styleCard}
                          />
                      }                            
                  </div>)}
                  {!!withDocs && (
                    <>
                    <section className="section-new-report">
                      <h4> Завантажити новий звiт</h4>
                      <form onSubmit={e => this.handleSubmit(e)}>
                      <div className="field">
                        <label>Виберіть документ у pdf форматі</label>
                        <br />
                        <input
                          id="downloadReport"
                          className="custom-file-input"
                          type="file"
                          onChange={e => this.uploadFile(e)}
                        />
                        <label htmlFor="downloadReport">
                          <span>{this.state.file.fileName}</span>
                        </label>
                      </div>
                      </form>
                      <Button
                        onClick={e => this.handleDocumentSubmit(e)}
                        styleType={ButtonTypes.BlueOutlineSmall}
                      >
                        <TI18n keyStr="addReport" />
                      </Button>
                    </section>
                    <ul className="list-docs">
                    {organizationDocumentsList.data.map((item, i: number) => (
                      <li
                        className="item-docs"
                        key={i}
                        onClick={() => {
                          this.openPdfFile(item);
                        }}
                      >
                        <i className="icon-pdf">icon</i>
                        <span className="file-title">{item.fileName}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            this.deleteReport(item.id);
                          }}
                          className="delete icon-close"
                        />
                      </li>
                    ))}
                  </ul>
                  </>
                  )}

                  <button className="btn btn-blue btn-content-page" onClick={(e)=>this.handleSubmit(e)}>Зберегти зміни</button>
              </TabPane>)}
          </Tabs>
          )}
        </div>
      </ContentPagesContainerPage>
    )
  }
}