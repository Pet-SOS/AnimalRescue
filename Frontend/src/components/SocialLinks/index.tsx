import React, { useState } from 'react';
import {ReactComponent as FacebookLogo} from '../../assets/header/facebook.svg';
import {ReactComponent as InstagramLogo} from '../../assets/header/twitter.svg';
import {ReactComponent as YoutubeLogo} from '../../assets/header/youtube.svg';
import './socialLinks.scss';
import { store } from '../../store';

export const SocialLinks:React.FC = () => {
    let initSocialLinks={
        instagram: '',
        facebook:'',
        youtube:''
    }
    const [socialLinks, setSocialLinks] = useState(initSocialLinks);
    store.subscribe(() =>{
        setSocialLinks(store.getState().homePage.infoContacts.data.socialLinks)
  })
    return (
        <div className="social-links">
            <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer"><FacebookLogo/></a>
            <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer"><InstagramLogo/></a>
            <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer"><YoutubeLogo/></a>
        </div>
    )
};