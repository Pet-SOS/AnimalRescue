import React from 'react';
import {ReactComponent as FacebookLogo} from '../../assets/header/facebook.svg';
import {ReactComponent as TwitterLogo} from '../../assets/header/twitter.svg';
import {ReactComponent as YoutubeLogo} from '../../assets/header/youtube.svg';
import './socialLinks.scss';

export const SocialLinks:React.FC = () => {
    return (
        <div className="social-links">
            <FacebookLogo/>
            <TwitterLogo/>
            <YoutubeLogo/>
        </div>
    )
};