import React from 'react';
import './index.scss';

interface IPropTypes {
  number: string;
}

export const CounterNumber: React.FC<IPropTypes> = ({ number }) => (
  <div className="count-inner">
    <span>{number}</span>
  </div>
);
