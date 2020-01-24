import React from 'react';
import './index.scss';
import { TI18n } from '../../i18n';
import { BlockLink } from '../BlockLink';
interface ILinksObj {
    src:string,
    title:string
}
interface IPropTypes {
    links: ILinksObj[];
    backgroundColor:string;
    title: React.ReactNode;
    subTitle:React.ReactNode;
 }

export const YouTubeBox: React.FC<IPropTypes> = ({links, backgroundColor, title, subTitle}) => {
    return(
        <div style={{backgroundColor}} className="video-history">
            <div className='content'>
                <div className='box-header'>
                <div className='block-title'>
                        <div className='title'>{title}</div>
                        <div>{subTitle}</div>
                </div>
                  <div className='header-link'>
                    <BlockLink
                        isButtonHidden={false}
                        href={'/'}
                        title={<TI18n keyStr="youtubeTitleLink" default="Смотреть все истории на нашем канале"/>}
                    />
                  </div>
                </div>
                <ul className='box-video'>
                    {
                        links.map((link,i) => 
                    <li>
                        <div className="video">
                            <iframe src={link.src}  allow="autoplay; encrypted-media"  allowFullScreen={true} frameBorder={'0'} ></iframe>
                            <button id="play" className="play-btn">
  
	                        </button>
                        </div>
                        <div>{link.title}</div>
                    </li>)
                    }
                </ul>
                <div className='box-link'>
                    <BlockLink
                        isButtonHidden={false}
                        href={'https://www.youtube.com/channel/UCBSJrFxTYAbu1sAGdeRg8cA/videos'}
                        title={<TI18n keyStr="youtubeTitleLink" default="Смотреть все истории на нашем канале"/>}
                    />
                </div>
            </div>
        </div>
        )
}