import * as React from 'react';

export interface ISliderItem {
    id?: string;
    image: string;
    title: string;
    description: string;
    width?: number;
}

export const SliderItem: React.FC<ISliderItem> = ({image, title, description, id, width}) => {
    return (
        <div className="item" style={{minWidth: width, maxWidth: width}}>
            <div className="content">
            {image && <img className="image" alt="slider-item" src={image}/>}
            <p>{title}</p>
            <p>{description}</p>
            <p>{id}</p>
            </div>
        </div>
    )
};