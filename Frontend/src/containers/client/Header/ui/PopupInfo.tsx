import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { store } from '../../../../store';
import { actionIsActivePopup } from '../../Home/store/actions';
import { ButtonTypes, Button } from '../../../../components/Button';
import '../styles/popupInfo.scss';
import queryString from 'query-string';
import { RouteComponentProps } from 'react-router';

interface IPropTypes {
  card: string;
  boxImages: any;
  title: any;
  textFirst: any;
  textSecond: any;
  textThird: any;
  textThirdTwo: any;
}

export const PopupInfo: React.FC<IPropTypes> = ({
  boxImages,
  title,
  card,
  textFirst,
  textSecond,
  textThird,
  textThirdTwo,
}) => {
  return (
    <div className="box-popup">
      <div className="popup">
        <div className="first-block">
          <Button
            styleType={ButtonTypes.Close}
            onClick={() => store.dispatch(actionIsActivePopup(false))}
          />
          <h2>{title}</h2>
          <div className="pets">
            {boxImages.map((item: string, index: number) => (
              <img
                src={item}
                className={`bg-image${index} pet`}
                key={index}
                alt="pets"
              />
            ))}
          </div>
        </div>
        <div className="second-block">
          <div>
            <p>{textFirst}</p>
            {!!card && (
              <div className="bank-card">
                <div className="bank-card-info">
                  <p
                    className="card"
                    dangerouslySetInnerHTML={{ __html: card }}
                  ></p>
                </div>
                <CopyToClipboard text={card} className="copy-to-clipboard">
                  <button>
                    <i className="icon-copy">
                      <span className="path1">icon</span>
                      <span className="path2">icon</span>
                      <span className="path3">icon</span>
                      <span className="path4">icon</span>
                    </i>
                  </button>
                </CopyToClipboard>
              </div>
            )}
          </div>
          <hr className="horizontal-rule"/>
          <div>
            <p>{textSecond}</p>
            <ul>
              <li>
                <span>{textThird}</span>
              </li>
              <li>
                <span>{textThirdTwo}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
