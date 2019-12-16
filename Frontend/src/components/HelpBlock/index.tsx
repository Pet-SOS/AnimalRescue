import React, {useState} from 'react';
import {Button, ButtonTypes} from "../Button";
import {TI18n} from '../../i18n';
import './index.scss';

interface IPropTypes {
    backgroundColor: string;
    themeColor: string;
    image: string;
    content: string | React.ReactNode;
}

export const HelpBlock: React.FC<IPropTypes> = ({content, themeColor, backgroundColor, image}) => {

    const defaultAmount = '100';

    const [amount, setAmount] = useState(defaultAmount);

    const onChangeAmount = (e: any) => {
        const {value} = e.target;
        if (value.length < 7 && Number(value)) {
            setAmount(value)
        } else if (!value) {
            setAmount(value)
        }
    };

    return (
        <div style={{background: `url(${image}) no-repeat right`, backgroundColor: backgroundColor}}>
            <div className="help-block">
                <div className="content">
                    <div className="title" style={{color: themeColor}}>
                        <TI18n keyStr="helpBlockTitle" default="Помощь животным"/>
                    </div>
                    <div className="text">{content}</div>
                    <div className="give-block">
                        <div className="currency">
                            <input type="text" value={amount} onChange={onChangeAmount}/>
                            <span className="type">грн</span>
                        </div>
                        <Button onClick={() => {
                        }} styleType={ButtonTypes.Green}>
                            <TI18n keyStr="headerBottomBtn" default="Подарить"/>
                        </Button>
                    </div>
                    <div className="control-money">
                        <TI18n keyStr="helpBlockCheck" default="Посмотреть, куда уйдут мои деньги"/>
                    </div>
                </div>
            </div>
        </div>
    )
};