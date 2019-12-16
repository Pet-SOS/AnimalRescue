import React, {useState, useEffect} from 'react';
import cn from 'classnames';
import './index.scss';

interface IOptionPropType {
    label: string;
    onClick: () => void;
    className?: string
}

const Option: React.FC<IOptionPropType> = ({label, onClick, className}) => {
    return (
        <div className={className} onClick={onClick}>{label}</div>
    )
};

interface IPropTypes {
    data: { label: string; value: string; }[];
    onChange: (value: string) => void;
    selected?: string;
    mainStyles?: React.CSSProperties
}

export const Select: React.FC<IPropTypes> = ({data, selected, onChange, mainStyles}) => {
    const [selectedValue, setSelected] = useState(selected || '');
    const [active, setActive] = useState(false);

    useEffect(() => {
        setSelected(selected || '');
    });

    const getSelectedValue = () => {
        for (let i = 0; i < data.length; i++) {
            if (data[i].value === selectedValue) {
                return data[i].label;
            }
        }
    };

    const onOptionClick = (value: string) => {
        setSelected(value);
        setActive(false);
        onChange(value)
    };

    const renderArrow = () => {
        return (
            <div
                className={cn("arrow", {"arrow-top": active})}
                style={{background: `url(${require('../../assets/select/arrow_down.svg')}) no-repeat center`}}
            />
        )
    };

    return (
        <div className="select-wr" style={{...mainStyles}}>
            <div className="selected-wr" onClick={() => setActive(true)}>
                <div className="selected">
                    {getSelectedValue()}
                </div>
                {renderArrow()}
            </div>
            {active && (
                <div className="options">
                    {data.map((item) => {
                        return (
                            <Option
                                key={item.value}
                                className={cn({'selected': (selectedValue === item.value)})}
                                label={item.label}
                                onClick={() => onOptionClick(item.value)}
                            />
                        )
                    })}
                </div>
            )}
        </div>
    )
};