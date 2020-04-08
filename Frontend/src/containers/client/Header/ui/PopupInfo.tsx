import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { store } from '../../../../store';
import { actionIsActivePopup } from '../../Home/store/actions';
import { ButtonTypes, Button } from '../../../../components/Button';
import copyImage from '../../../../img/copy.jpg';
import '../styles/popupInfo.scss';


export const PopupInfo: React.FC<any> = ({infoCard, boxImages, title, card, cardName, textFirst, textSecond, textThird, textThirdTwo}) => {
    return (
        <div className="box-popup">
            <div className="popup">
                <div className="first-block">
                    <Button
                      styleType={ButtonTypes.Close}
                      onClick={() => store.dispatch(actionIsActivePopup(false)) }
                    />
                    <h2>{title}</h2>
                    <div className='pets'>
                    {boxImages.map((item: string, index: number)=> <img src={item} className={`bg-image${index} pet`} key={index} alt='pets'/>)}
                    </div>
                </div>
                <div className="second-block">
                    <p>{textFirst}</p>
                    {/*{!!infoCard?.data?.bankCard?.cardNumber &&*/}
                    <div className="bank-card">
                        <div className="bank-card-info">
                            <p className='card'>{/*{infoCard.data.bankCard.cardNumber}*/}1234123412341234</p>
                            <p>{/*{infoCard.data.bankCard.firstName} {infoCard.data.bankCard.lastName}*/}</p>
                        </div>
                        <CopyToClipboard text={{/*infoCard.data.bankCard.cardNumber*/}} className="copy-to-clipboard">
                            <button>
                                <i className="icon-copy">
                                    <span className="path1">icon</span>
                                    <span className="path2">icon</span>
                                    <span className="path3">icon</span>
                                    <span className="path4">icon</span>
                                </i>
                            </button>
                        </CopyToClipboard>
                    </div>
                    {/*}*/}
                    <p>{textSecond}</p>
                    <ul>
                        <li><span>{textThird}</span></li>
                        <li><span>{textThirdTwo}</span></li>
                    </ul>
                </div>
                
            </div>
        </div>
    )
}