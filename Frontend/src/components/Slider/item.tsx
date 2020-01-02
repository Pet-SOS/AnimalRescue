import {BASE_URL} from "../../api";
import React from 'react';
import noPhoto from '../../img/nophoto.jpg'

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
                {imageLinks[0] ?
                    <img className="image" alt="slider-item" src={`${BASE_URL}/documents/${imageLinks[0]}`}/> :
                    <img className="image" alt="slider-item" src={noPhoto}/>}
                <div className="text">
                    <div className="name">{title}</div>
                    <div className="description">{description}</div>
                </div>
            </div>
        </div>
    )
};
