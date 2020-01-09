import React, {useState, useEffect, useCallback} from 'react';
import {BASE_URL} from "../../../../api/index";
import noPhoto from '../../../../img/nophoto.jpg';
import '../styles/photoSlider.scss';
import { useDispatch } from 'react-redux';
import {actionSetSlideIndexSuccess} from '../../Home/store/actions/index';
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
export const PhotoSlide: React.FC<any> = (props:any) => {
    // store.getState();
    const [slideIndex, setIndexSlide] = useState(0);
    const dispatch = useDispatch()

    useEffect(() => {
        setIndexSlide(slideIndex);
    });
    const addIndexForSlide = useCallback( () => dispatch(actionSetSlideIndexSuccess(slideIndex)), [dispatch]);
    function activateLasers(i:number , e: any) {
        setIndexSlide(i);
    }
     return(
        <div className="slide">
            <div className='box-img'>
                {props.sliders[0] ?
                <img className="image" alt="slider-item" src={`${BASE_URL}/documents/${props.sliders[slideIndex].imageIds[0]}`}/> :
                <img className="image" alt="slider-item" src={noPhoto}/>}
            </div>
            <div className="btn-slider">
                {props.sliders.map((item: IPropTypes, index: number) => {
                    return (
                    <div className={index === slideIndex ? 'active-indicator' : ''}  key={index} onClick={(e) => activateLasers(index, e)}></div>
                    )
                })}
            </div>
        </div>
   )
}
