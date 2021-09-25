import React from 'react';
import { ReactComponent as InstagramLogo } from '../../assets/header/instagram.svg';
import Icon from '../Icon';
import './socialLinks.scss';
import { store } from '../../store';
import { useSelector, shallowEqual } from 'react-redux';
import { ISocialLinks } from '../../api/contacts';
import { selectInfoContacts } from '../../containers/client/Home/store/selectors';

export const SocialLinks: React.FC<any> = () => {
  const socialLinks: ISocialLinks = useSelector(
    () => selectInfoContacts(store.getState()).data.socialLinks,
    shallowEqual,
  );

  return (
    <ul className="social-links">
      <li>
        <a href={socialLinks.facebook} target="_blank">
          <Icon className="icon-fb" />
          <span>Facebook</span>
        </a>
      </li>
      <li>
        <a href={socialLinks.instagram} target="_blank">
          <i>
            <InstagramLogo />
          </i>
          <span>Instagram</span>
        </a>
      </li>
      <li>
        <a href={socialLinks.youtube} target="_blank">
          <Icon className="icon-youtube" />
          <span>Youtube</span>
        </a>
      </li>
    </ul>
  );
};
