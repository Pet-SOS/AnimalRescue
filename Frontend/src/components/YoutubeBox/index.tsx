import React from 'react';
import { TI18n } from '../../i18n';

interface IPropTypes {
    link: string;
 }
export const YouTubeBox: React.FC<IPropTypes> = ({link}) => {
    return(
        <div>
        <div className='title'><TI18n keyStr="alreadyHelpedBlockTitle" default="Кому мы помогли"/></div>
            <iframe width="100%" height="auto" src={link}  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" ></iframe>
        </div>
        )
}