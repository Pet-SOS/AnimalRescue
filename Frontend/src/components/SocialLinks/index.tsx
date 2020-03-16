import React from 'react';
import {ReactComponent as FacebookLogo} from '../../assets/header/facebook.svg';
import {ReactComponent as InstagramLogo} from '../../assets/header/instagram.svg';
import {ReactComponent as YoutubeLogo} from '../../assets/header/youtube.svg';
import './socialLinks.scss';
import { store } from '../../store';
import { useSelector, shallowEqual } from 'react-redux';
import { ISocialLinks } from '../../api/contacts';
import { selectInfoContacts } from '../../containers/client/Home/store/selectors';

export const SocialLinks: React.FC<any> = () => {
const socialLinks: ISocialLinks = useSelector(() => (selectInfoContacts(store.getState()).data.socialLinks), shallowEqual);

  return (
    <ul className="social-links">
        <li><a href={socialLinks.facebook} target="_blank" ><FacebookLogo/></a></li>
        <li><a href={socialLinks.instagram} target="_blank" ><InstagramLogo/></a></li>
        <li><a href={socialLinks.youtube} target="_blank" ><YoutubeLogo/></a></li>
    </ul>
  )
};