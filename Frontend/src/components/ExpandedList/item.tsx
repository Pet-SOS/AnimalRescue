import React, { useState, RefObject, useEffect } from 'react';
import './index.scss';

export interface IExpandedListItemProps {
  title: string | React.ReactNode;
  body: (React.ReactNode | string)[]
}

export const ExpandedListItem: React.FC<IExpandedListItemProps> = ({ title, body }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const itemBody: RefObject<HTMLDivElement> = React.createRef();
  const onItemClick = () => {
    if (!!itemBody && !!itemBody.current) {
      setIsExpanded(!isExpanded);
      itemBody.current.style.maxHeight = isExpanded ? '0px' : `${itemBody.current.scrollHeight}px`;
    }
  }
  const onWindowResize = () => {
    if (isExpanded && !!itemBody && !!itemBody.current && itemBody.current.style.maxHeight !== `${itemBody.current.scrollHeight}px`) {
      itemBody.current.style.maxHeight = `${itemBody.current.scrollHeight}px`;
    }
  }
  useEffect(() => {
    window.addEventListener('resize', onWindowResize);
    return () => {
      window.removeEventListener('resize', onWindowResize);
    };
  }, [isExpanded]);
  return (
    <li className={`expanded-item ${isExpanded ? 'expanded' : ''}`} onClick={() => onItemClick()}>
      <button className='expand-button' type='button'></button>
      <span className='expanded-item-title'>{title}</span>
      <div className='expanded-item-body' ref={itemBody}>
        {body.map((el, index) => <React.Fragment key={index}>{el}</React.Fragment>)}
      </div>
    </li>
  )
}