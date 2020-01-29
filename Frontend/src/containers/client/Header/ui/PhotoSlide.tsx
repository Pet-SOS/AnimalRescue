import React from 'react';
import {BASE_URL} from "../../../../api/index";
import noPhoto from '../../../../img/nophoto.jpg';
import '../styles/photoSlider.scss';
import { actionIsActivePopup } from '../../Home/store/actions';
import {store} from '../../../../store';


interface IPropTypes {
    number: number;
    name: string;
    kindOfAnimal: string;
    gender: string;
    description: string;
    age: number;
    imageIds: string [];
    tags: any[]
    id: string;
}

export const PhotoSlide: React.FC<any> = ({sliders, updatePostInfo, slideIndex, story}) => {
 
    const imageUrl = sliders[0] ? `${BASE_URL}documents/${sliders[slideIndex].imageIds[0]}` : noPhoto;
 
    function activateLasers(i:number , e: any) {
           updatePostInfo(i);
    }
     return(
        <div className="slide">
            <div className={story ? 'box-img story' : 'box-img'}
            onClick={() => {store.dispatch(actionIsActivePopup(true))}} >
                <div  className="image" style={{backgroundImage: `url(${imageUrl})`} }></div>
            </div>
            <div className="btn-slider">
                {sliders.map((item: IPropTypes, index: number) => {
                    return (
                    <div className={index === slideIndex ? 'active-indicator' : ''}  key={index} onClick={(e) => activateLasers(index, e)}></div>
                    )
                })}
            </div>
        </div>
   )
}
