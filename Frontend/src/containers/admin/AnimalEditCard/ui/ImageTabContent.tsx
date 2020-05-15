import React from "react";
import "../style/ImageTabContent.scss";
import AddFileIcon from "../../../../img/icons/add-request.svg";
import CloseIcon from "../../../../img/icons/close-icon.svg";

interface IPropTypes {
  uploadedImageIds: string[];
  addImage: (e: any) => any;
  animalId?: string;
  baseUrl: string;
  newImages: [];
  onDeleteImage: (id: string) => any;
  onDeleteNewImage: (id: string) => any;
}

export class ImageTabContent extends React.PureComponent<IPropTypes> {
  getSourceOfUploadedImage(imageId: string) {
    return `${this.props.baseUrl}documents/${imageId}/type/small`;
  }

  renderImage(imageSource: string, id: string, onDeleteImage: (id: string) => void) {
    return (
      <div className="image-container">
        <div className="delete-image" onClick={() => onDeleteImage(id)}>
          <img src={CloseIcon} alt="delete"/>
        </div>
        <img className="animal-image" src={imageSource} alt="animal-image"/>
      </div>
    );
  }

  renderAdditionalImageList = () => {
    return (
      <>
        {this.renderAddImage()}
        {this.props.uploadedImageIds.map(imageId => (
          <div key={imageId}>
            {this.renderImage(
              this.getSourceOfUploadedImage(imageId),
              imageId,
              this.props.onDeleteImage
            )}
          </div>
        ))}
        {this.props.newImages.map((image: any) => (
          <div key={image.lastModified}>
            {this.renderImage(
              URL.createObjectURL(image),
              image.lastModified,
              this.props.onDeleteNewImage
            )}
          </div>
        ))}
      </>
    )
  }

  renderTitle(title: string) {
    return (
      <div className="image-tab-header">
        <span>{title}</span>
      </div>
    );
  }

  renderMainImage = () => {
    const mainImageId = this.props.uploadedImageIds[0];
    return (
      <div className='main-image-wrapper'>
        {this.renderTitle('Головне зображення')}
        <div className="images-wrapper">
          {this.renderAddImage()}
          {this.renderImage(this.getSourceOfUploadedImage(mainImageId), mainImageId, this.props.onDeleteImage)}
        </div>
      </div>
    )
  }

  renderAdditionalImages = () => {
    return (
      <div>
        {this.renderTitle('Додаткові зображення')}
        <div className="images-wrapper">
          {this.renderAdditionalImageList()}
        </div>
      </div>
    );
  }

  renderAddImage() {
    let addFileRef: any = React.createRef();
    return (
      <div className="add-image-wrapper" onClick={() => addFileRef.click()}>
        <input
          ref={ref => addFileRef = ref}
          type={'file'}
          id={this.props.animalId || 'newFile'}
          onChange={(e) => this.props.addImage(e)}
          className={"add-button hidden"}
        />
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
      </div>
    );
  }
}
