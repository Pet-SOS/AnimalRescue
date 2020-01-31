import React, {useState, useEffect, RefObject} from 'react';
import cn from 'classnames';
import './index.scss';

interface IOptionPropType {
  label: string;
  onClick: () => void;
  className?: string
}

const Option: React.FC<IOptionPropType> = ({ label, onClick, className }) => <li className={className} onClick={onClick}>{label}</li>

export enum SelectExpandDirections {TOP = 'top', BOTTOM = 'bottom'}
export interface ISelectPropTypes {
  data: { label: string; value: string; }[];
  onChange: (value: string) => void;
  selected?: string;
  expandDirection?: SelectExpandDirections;
}

export const Select: React.FC<ISelectPropTypes> = ({ data, selected, onChange, expandDirection }) => {
  const [selectedValue, setSelectedValue] = useState(selected);
  const [isActive, setIsActive] = useState(false);
  const selectEl: RefObject<HTMLDivElement> = React.createRef();
  useEffect(() => {
    setSelectedValue(selected);
  }, [selected]);

  useEffect(() => {
    const handleClick = () => {
      if (isActive) {
        setIsActive(false);
      }
    }
    document.addEventListener('click', handleClick, false);
    return () => {
      document.removeEventListener('click', handleClick, false)
    }
  }, [isActive])

  const getSelectedValue = () => {
    const selectedOption = data.find(item => item.value === selectedValue);
    if (!!selectedOption) {
      return selectedOption.label
    }
  };

  const onOptionClick = (value: string) => {
    setSelectedValue(value);
    onChange(value)
  };

  return (
    <div className={cn('select', { 'active': isActive })} ref={selectEl}>
      <button type='button' onClick={() => setIsActive(!isActive)}>{getSelectedValue()}</button>        
      <ul className={cn('options', { 'expand-top': expandDirection === SelectExpandDirections.TOP })}>
        {data.map(item => (
          <Option
            key={item.value}
            className={cn({ 'selected': (selectedValue === item.value) })}
            label={item.label}
            onClick={() => onOptionClick(item.value)}
          />
        ))}
      </ul>
    </div>
  )
};
