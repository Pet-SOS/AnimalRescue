import React from 'react';
import './index.scss';
interface IPropTypes{
    state: boolean;
    name:string
    setCheckboxCheck:() => string
}
export const CheckBoks: React.FC<any> = ({setCheckboxCheck, state, name, tag}) => {
    return (
        <div className='box-checkbox'>
            <input type="checkbox" onChange={()=>{setCheckboxCheck(tag)}} defaultChecked={state}/>
            <p>{name}</p>
        </div>
    )
}