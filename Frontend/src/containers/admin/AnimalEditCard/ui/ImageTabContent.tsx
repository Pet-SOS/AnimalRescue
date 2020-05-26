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
  mainImageIndex: number;
  onChangeCoverImage: (coverImage: number) => any;
  onSaveChanges: () => any;
}

export class ImageTabContent extends React.PureComponent<IPropTypes> {
  getSourceOfUploadedImage(imageId: string) {
    return `${this.props.baseUrl}documents/${imageId}/type/small`;
  }

  renderImage(imageSource: string, id: string, isSelected: boolean = false,  onDeleteImage?: (id: string) => void) {
    return (
     <div className="image-wrapper">
       <div className={`image-container ${isSelected ? 'selected' : ''}`}>
         {onDeleteImage && !isSelected && (
           <div className="delete-image" onClick={() => onDeleteImage(id)}>
             <img src={CloseIcon} alt="delete"/>
           </div>
         )}
         <img className="animal-image" src={imageSource} alt="animal-image"/>
       </div>
     </div>
    );
  }

  renderTitle(title: string) {
    return (
      <div className="image-tab-header">
        <span>{title}</span>
      </div>
    );
  }

  renderMainImage = () => {
    if (!this.props.uploadedImageIds.length) {
      return null;
    }
    const {uploadedImageIds, mainImageIndex} = this.props;
    const mainImageId = uploadedImageIds[mainImageIndex ? mainImageIndex : 0];
    return (
      <div className='main-image-wrapper'>
        {this.renderTitle('Головне зображення')}
        <div className="images-wrapper">
          {this.renderImage(this.getSourceOfUploadedImage(mainImageId), mainImageId)}
        </div>
      </div>
    )
  }

  onUploadAndChangeCoverImage = (imageIndex: number) => {
    const { uploadedImageIds, onChangeCoverImage, onSaveChanges} = this.props;
    const isUploadedImagesExist = !!uploadedImageIds.length;
    const lastIndexOfUploadedImages = isUploadedImagesExist ? uploadedImageIds.length - 1 : 0;
    const indentOfNewImageIndex = imageIndex === 0 ? imageIndex + 1 : imageIndex;
    const newIndex = isUploadedImagesExist ? lastIndexOfUploadedImages + indentOfNewImageIndex : 0;
    onChangeCoverImage(newIndex);
    setTimeout(() => onSaveChanges(), 0);
  }

  renderAdditionalImages = () => {
    const {mainImageIndex, onChangeCoverImage, uploadedImageIds, onDeleteNewImage, onDeleteImage, newImages, onSaveChanges} = this.props;
    return (
      <div>
        {this.renderTitle('Додаткові зображення')}
        <div className="images-wrapper">
          <>
            {this.renderAddImage()}
            {uploadedImageIds.map((imageId, i) => (
              <div
                key={imageId}
                onClick={() => onChangeCoverImage(i)}>
                {this.renderImage(
                  this.getSourceOfUploadedImage(imageId),
                  imageId,
                  i === mainImageIndex,
                  onDeleteImage
                )}
              </div>
            ))}
            {newImages.map((image: any, i: number) => (
              <div key={image.lastModified}
                   onClick={() => this.onUploadAndChangeCoverImage(i)}
              >
                {this.renderImage(
                  URL.createObjectURL(image),
                  image.lastModified,
                  false,
                  onDeleteNewImage
                )}
              </div>
            ))}
          </>
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
