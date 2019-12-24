import {BASE_URL} from "../../api";
import React from 'react';

export interface ISliderItem {
    id?: string;
    image: string;
    title: string;
    description: string;
    width?: number;
    imageLinks: string[]
}

export const SliderItem: React.FC<ISliderItem> = ({image, title, description, id, width, imageLinks}) => {
    return (
        <div className="item" style={{minWidth: width, maxWidth: width}}>
            <div className="content">
                {image && <img className="image" alt="slider-item" src={`${BASE_URL}/documents/${imageLinks[0]}`}/>}
                <div className="text">
                    <div className="name">{title}</div>
                    <div className="description">{description}</div>
                </div>
            </div>
        </div>
    )
};
