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
                <div className="text">
                    <div className="name">{title}</div>
                    <div className="description">{description}</div>
                </div>
            </div>
        </div>
    )
};