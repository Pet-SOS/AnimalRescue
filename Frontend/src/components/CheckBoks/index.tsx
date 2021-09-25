import React from 'react';
import './index.scss';
interface IPropTypes {
  state: boolean;
  name: any;
  tag: string;
  setCheckboxCheck: (name: string) => void;
}
export const CheckBoks: React.FC<IPropTypes> = ({
  setCheckboxCheck,
  state,
  name,
  tag,
}) => {
  return (
    <label className="box-checkbox secondary">
      <input
        type="checkbox"
        onChange={() => {
          setCheckboxCheck(tag);
        }}
        checked={state}
      />
      <span>{name}</span>
    </label>
  );
};
