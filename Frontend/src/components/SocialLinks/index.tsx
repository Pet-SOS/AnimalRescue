import React, { useState, useEffect } from 'react';
import {ReactComponent as FacebookLogo} from '../../assets/header/facebook.svg';
import {ReactComponent as InstagramLogo} from '../../assets/header/twitter.svg';
import {ReactComponent as YoutubeLogo} from '../../assets/header/youtube.svg';
import './socialLinks.scss';
import { store } from '../../store';
import { actionFetchInfoContacts } from '../../containers/client/Home/store/actions';
import { ISocialLinks } from '../../api/contacts';


export const SocialLinks:React.FC<any> = () => {

    let initSocialLinks:ISocialLinks={
        instagram:'',
        facebook:'',
        youtube:'',
    }


    const [socialLinks, setSocialLinks] = useState(initSocialLinks);
    useEffect(()=>{
        const defaultState =  !store.getState().homePage.infoContacts.data.socialLinks.instagram
        if(defaultState){
            store.dispatch(actionFetchInfoContacts())
        }else{
            setSocialLinks({...store.getState().homePage.infoContacts.data.socialLinks})
        }
       
    },[store.getState().homePage.infoContacts.data])

   
    return (
        <div className="social-links">
            <a href={socialLinks? socialLinks.facebook:''} target="_blank" rel="noopener noreferrer"><FacebookLogo/></a>
            <a href={socialLinks? socialLinks.instagram:''} target="_blank" rel="noopener noreferrer"><InstagramLogo/></a>
            <a href={socialLinks? socialLinks.youtube:''} target="_blank" rel="noopener noreferrer"><YoutubeLogo/></a>
        </div>
    )
};