import React, {ChangeEvent} from "react";
import "../style/ImageTabContent.scss";
import AddFileIcon from "../../../../img/icons/add-request.svg";

interface IPropTypes {
  imageIds: string[];
  coverImage: number;
  onChange: (e: ChangeEvent<HTMLInputElement>, key: string) => any;
  addImage: (e: any) => any;
  animalId?: string;
  baseUrl: string;
  images: [];
}

export class ImageTabContent extends React.PureComponent<IPropTypes> {
  renderImgs = () => {
    return (
      <>
        {this.renderAddImage()}
        {this.props.imageIds.map(imageId => (
          <img key={imageId} className="animal-image"
               src={`${this.props.baseUrl}documents/${imageId}/type/small`}/>
        ))}
      </>
    )
  }

  renderMainImage = () => {
    return (
      <div className='main-image-wrapper'>
        <div className="image-tab-header">
          <span>Головне зображення</span>
        </div>

        <div className="images-wrapper">
          {this.renderAddImage()}
          <img className="animal-image"
               src={`${this.props.baseUrl}documents/${this.props.imageIds[0]}/type/small`}/>
        </div>
      </div>
    )
  }

  renderAdditionalImages = () => {
    return (
      <div>
        <div className="image-tab-header">
          <span>Додаткові зображення</span>
        </div>
        {/*<input value={this.props.coverImage} onChange={(e) => this.props.onChange(e, 'coverImage')}/>*/}
        <div className="images-wrapper">
          {this.renderImgs()}
        </div>
      </div>
    );
  }

  renderFileNames() {
    if (this.props.images.length) {
      return this.props.images.map((image: File, i: number) => <div key={image.name + i}>File
        #{i + 1} {image.name}</div>)
    }
    return null;
  }

  renderAddImage() {
    let addFileRef: any = React.createRef();
    return (
      <div className="add-image-wrapper" onClick={() => addFileRef?.click()}>
        <input ref={ref => addFileRef = ref} type={'file'} id={this.props.animalId || 'newFile'} onChange={(e) => this.props.addImage(e)}
               className={"add-button hidden"}/>
        <div className="add-image">
          <img src={AddFileIcon} alt="add-image"/>
          <p className="add-image-title">Вибрати фото</p>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="main-image-wrapper">
        {this.renderMainImage()}
        {this.renderAdditionalImages()}
        <div>
          {this.renderFileNames()}
        </div>
      </div>
    );
  }
}

{/*<p>*/}
{/*  <span>Головне зображення</span><br/>*/}
{/*  {this.renderImgs(imageIds)}*/}
{/*</p>*/}
{/*<p>*/}
{/*  <span>Додаткові зображення</span>*/}
{/*  <input value={coverImage} onChange={(e) => this.changeValue(e, 'coverImage')}/></p>*/}
{/*<p>*/}
{/*  {!!this.state.images.length && this.renderFileNames()}*/}
{/*  <div className={'add-button'}>*/}
{/*    <input type={'file'} id={id || 'newFile'} onChange={(e) => this.addImage(e)}*/}
{/*           className={"add-button hidden"}/>*/}
{/*    <label htmlFor={id || 'newFile'} className={'add-button button'}>Add file</label>*/}
{/*  </div>*/}
{/*</p>*/}
