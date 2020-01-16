import React from 'react';
import '../styles/popupInfo.scss';
import { store } from '../../../../store';
import { actionIsActivePopup } from '../../Home/store/actions';


export const PopupInfo: React.FC<any> = ({boxImages, title, card, cardName, textFirst, textSecond, textThird, textThirdTwo}) => {
    return (
        <div className="box-popup">
            <div className="popup">
                <div className="first-block">
                    <div className="close" 
                        onClick={() => {store.dispatch(actionIsActivePopup(false))}} 
                    ></div>
                    <div className="title">{title}</div>
                    <div className='pets'>
                    {boxImages.map((item: string, index: number)=> <img src={item} className={`bg-image${index} pet`} key={index} alt={`bg-image${index}`} />)}
                    </div>
                </div>
                <div className="second-block">
                    <p>{textFirst}</p>
                    <div className="card-info">
                        <p className='card'>{card}</p>
                        <p>{cardName}</p>
                    </div>
                    <p>{textSecond}</p>
                    <ul>
                        <li><span></span>{textThird}</li>
                        <li><span></span>{textThirdTwo}</li>
                    </ul>
                </div>
                
            </div>
        </div>
    )
}