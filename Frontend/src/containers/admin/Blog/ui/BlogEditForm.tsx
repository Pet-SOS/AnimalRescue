import { HtmlEditor, styleCard } from '../../../../components/HtmlEditor';
import React, { useState, useRef, useMemo } from 'react';
import { ELocales } from '../../../../i18n/store/state';
import { BlogTypes, IBlogItem } from '../../../../api/blog';
import { CheckBoks } from '../../../../components/CheckBoks';
import { isArticle, isStory } from '../utils';
import { Button, ButtonTypes } from '../../../../components/Button';
import CloseIcon from '../../../../img/icons/close-icon.svg';

interface IBlogEditFormProps {
  blog?: IBlogItem;
  onUpdate: (blog: IBlogItem) => void;
  baseUrl: string;
}

interface IBlogFields {
  id?: string;
  title: string;
  text: string;
  imageIds: string[];
  images?: File[];
  isStory: boolean;
  isArticle: boolean;
}

const DEFAULT_BLOG_FIELDS: IBlogFields = {
  title: '',
  text: '',
  imageIds: [],
  images: [],
  isStory: false,
  isArticle: false,
};

const mapBlogToFields = (blog?: IBlogItem): IBlogFields => {
  if (blog) {
    return {
      id: blog.id,
      title: blog.title || '',
      text: blog.body || '',
      imageIds: blog.imageIds,
      images: [],
      isStory: isStory(blog),
      isArticle: isArticle(blog),
    };
  } else {
    return { ...DEFAULT_BLOG_FIELDS };
  }
};

export const BlogEditForm: React.FC<IBlogEditFormProps> = ({
  blog,
  onUpdate,
  baseUrl,
}) => {
  const [fields, setFields] = useState(mapBlogToFields(blog));

  const onTitleChanged = (title: string) => {
    setFields((prevState: IBlogFields) => {
      return { ...prevState, title: title };
    });
  };

  const onChange = (editorState: any) => {
    setFields((prevState: IBlogFields) => {
      return { ...prevState, text: editorState };
    });
  };

  const onCheckBoxChanged = (tag: string) => {
    setFields((prevState: IBlogFields) => {
      let article = prevState.isArticle;
      let story = prevState.isStory;
      if (tag === 'isArticle') {
        story = prevState.isArticle;
        article = !story;
      }
      if (tag === 'isStory') {
        article = prevState.isStory;
        story = !article;
      }
      return {
        ...prevState,
        isStory: story,
        isArticle: article,
      };
    });
  };

  const [images, setImages] = useState([] as any[]);
  let fileInputRef: any = useRef();

  const loadedImages = useMemo(() => new Set(), []);

  const onImageChange = (e: any) => {
    const file = e.target.files[0];
    const id = file.name + file.lastModified;
    if (!loadedImages.has(id)) {
      setImages([...images, ...e.target.files]);
      loadedImages.add(id);
    }
    fileInputRef.current.value = '';
  };

  const removeImage = (id: string) => {
    setImages(images.filter(i => i.name + i.lastModified !== id));
    loadedImages.delete(id);
  };

  const handleSubmit = async () => {
    if (blog && blog.id)
      onUpdate({
        ...blog,
        title: fields.title,
        body: fields.text,
        type: fields.isStory ? BlogTypes.STORY : BlogTypes.ARTICLE,
        imageIds: fields.imageIds,
        images: images,
      });
  };

  const getImageSrc = (id: string) => `${baseUrl}documents/${id}/type/small`;

  const removeLoadedImage = (id: string) => {
    setFields((prevState: IBlogFields) => {
      return {
        ...prevState,
        imageIds: prevState.imageIds.filter(imageId => imageId !== id),
      };
    });
  };

  return (
    <div>
      <div className="form-row">
        <div>Заголовок</div>
        <input
          type="text"
          name={ELocales.ua}
          placeholder="Заголовок"
          onChange={e => onTitleChanged(e.target.value)}
          value={fields.title}
        />
      </div>
      <div className="form-row">
        <div>Зображення</div>
        {fields.imageIds.map(id => {
          return (
            <div className="image-preview-container" key={id}>
              <img
                className="image-preview"
                src={getImageSrc(id)}
                alt="Uploaded"
              />
              <div className="delete-image" onClick={() => removeLoadedImage(id)}>
                <img src={CloseIcon} alt="delete" />
              </div>
            </div>
          );
        })}
        {images.map(image => {
          return (
            <div className="image-preview-container" key={image.name}>
              <img
                className="image-preview"
                src={URL.createObjectURL(image)}
                alt="Uploaded"
              />
              <div
                className="delete-image"
                onClick={() => removeImage(image.name + image.lastModified)}
              >
                <img src={CloseIcon} alt="delete" />
              </div>
            </div>
          );
        })}
        <div className="add-image-button-container">
          <div
            className="add-image-button"
            onClick={() => fileInputRef.current.click()}
          >
            Завантажити зображення
            <input
              type="file"
              className="hidden"
              ref={fileInputRef}
              onChange={onImageChange}
            />
          </div>
          <div>Зображення має бути 1095х615, формат jpg</div>
        </div>
      </div>
      <div className="form-row">
        <div>Розділ</div>
        <div>
          <CheckBoks
            name={'Корисні статті'}
            setCheckboxCheck={onCheckBoxChanged}
            state={fields.isArticle}
            tag={'isArticle'}
          />
          <CheckBoks
            name={'Історії успіху'}
            setCheckboxCheck={onCheckBoxChanged}
            state={fields.isStory}
            tag={'isStory'}
          />
        </div>
      </div>
      <div className="form-row">
        <div>Текст</div>
        <HtmlEditor
          editorState={fields.text}
          onChange={onChange}
          classList={styleCard}
        />
      </div>
      <Button onClick={handleSubmit} styleType={ButtonTypes.Blue}>
        Зберегти зміни
      </Button>
    </div>
  );
};
