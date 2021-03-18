import React from 'react';
import DOMPurify from 'dompurify';
import './index.scss';
import { TI18n } from '../../i18n';
import { BlockLink } from '../BlockLink';

interface ILinksObj {
  src: string;
  title: string;
}
interface IPropTypes {
  videoLinks: ILinksObj[];
  backgroundColor: string;
  title: React.ReactNode;
  subTitle: React.ReactNode;
  channelLink: string;
}

export const YouTubeBox: React.FC<IPropTypes> = ({
  videoLinks,
  backgroundColor,
  title,
  subTitle,
  channelLink,
}) => {
  return (
    <section
      style={{ backgroundColor }}
      className="video-history section-padding"
    >
      <div className="container">
        <div className="box-content">
          <div className="section-heading">
            <h2>{title}</h2>
            {/*<p>{subTitle}</p>*/}
          </div>
          <div className="hold-link">
            <BlockLink
              isButtonHidden={false}
              href={channelLink}
              isExternalLink
              title={
                <TI18n
                  keyStr="youtubeTitleLink"
                  default="Смотреть все истории на нашем канале"
                />
              }
            />
          </div>
          <ul className="box-video">
            {videoLinks.map((link, i) => (
              <li key={i}>
                <div className="video">
                  <iframe
                    src={link.src}
                    allow="autoplay; encrypted-media"
                    allowFullScreen={true}
                    frameBorder={'0'}
                    title={`video${i}`}
                  ></iframe>
                </div>
                <p
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(link.title),
                  }}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
