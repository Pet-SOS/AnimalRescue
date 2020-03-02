import React from 'react';
import './socialLinks.scss';
import { store } from '../../store';
import { useSelector, shallowEqual } from 'react-redux';
import { ISocialLinks } from '../../api/contacts';
import { selectInfoContacts } from '../../containers/client/Home/store/selectors';

export const SocialLinks: React.FC<any> = () => {
const socialLinks: ISocialLinks = useSelector(() => (selectInfoContacts(store.getState()).data.socialLinks), shallowEqual);

  return (
    <ul className="social-links">
      <li>
        <a className='facebook' href={socialLinks.facebook} target="_blank" ></a>
      </li>
      <li>
        <a className='instagram' href={socialLinks.instagram} target="_blank" ></a>
      </li>
      <li>
        <a className='youtube' href={socialLinks.youtube} target="_blank" ></a>
      </li>
    </ul>
  )
};