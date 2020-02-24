import React from 'react';
import './index.scss';
interface IPropTypes{
    state: boolean;
    name:string;
    tag:string;
    setCheckboxCheck:(name:string) => void 
}
export const CheckBoks: React.FC<IPropTypes> = ({setCheckboxCheck, state, name, tag}) => {
    return (
        <div className='box-checkbox'>
            <input type="checkbox" onChange={()=>{setCheckboxCheck(tag)}} checked={state}/>
            <p>{name}</p>
        </div>
    )
}