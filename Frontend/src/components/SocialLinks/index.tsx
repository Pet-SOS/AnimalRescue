import React, { useEffect } from 'react';
import {ReactComponent as FacebookLogo} from '../../assets/header/facebook.svg';
import {ReactComponent as InstagramLogo} from '../../assets/header/twitter.svg';
import {ReactComponent as YoutubeLogo} from '../../assets/header/youtube.svg';
import './socialLinks.scss';
import { store } from '../../store';
import { actionFetchInfoContacts } from '../../containers/client/Home/store/actions';
import { useSelector, shallowEqual } from 'react-redux';
import { ISocialLinks } from '../../api/contacts';
import { selectInfoContacts } from '../../containers/client/Home/store/selectors';


export const SocialLinks: React.FC<any> = () => {
  useEffect(() => {
    store.dispatch(actionFetchInfoContacts());
  }, []);
  const socialLinks: ISocialLinks = useSelector(() => (selectInfoContacts(store.getState()).data.socialLinks), shallowEqual);

  return (
    <div className="social-links">
        <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer"><FacebookLogo/></a>
        <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer"><InstagramLogo/></a>
        <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer"><YoutubeLogo/></a>
    </div>
  )
};