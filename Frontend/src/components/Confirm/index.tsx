import React from 'react';
import ReactDOM from 'react-dom';

import './index.scss';
import { Button, ButtonTypes } from '../Button';
import { TI18n } from '../../i18n';
import { Provider } from 'react-redux';
import { store } from '../../store';

interface IPropTypes {
  giveAnswer: (answer: boolean) => void;
  message: string;
  confirmTitle?: string | React.ReactNode;
  cancelTitle?: string | React.ReactNode;
}
const ConfirmDialog: React.FC<IPropTypes> = ({ giveAnswer, message, confirmTitle, cancelTitle }) => (
  <div className='confirm-dialog-wrapper'>
    <strong className='message'>{message}</strong>
    <div className='buttons-holder'>
      <Button onClick={() => { giveAnswer(true) }} styleType={ButtonTypes.Blue}>
        {!!confirmTitle ? confirmTitle : <TI18n keyStr='confirmTitle' default='Підтвердити' />}
      </Button>
      <Button onClick={() => { giveAnswer(false) }} styleType={ButtonTypes.Blue}>
        {!!cancelTitle ? cancelTitle : <TI18n keyStr='cancelTitle' default='Відмінити' />}
      </Button>
    </div>
  </div>
)

export default (
  message: string,
  confirmTitle?: string | React.ReactNode, 
  cancelTitle?: string | React.ReactNode): Promise<boolean> => {
    const confirmRoot: HTMLDivElement = document.createElement('div');
    const body:HTMLElement = document.body;
    body.appendChild(confirmRoot);
    confirmRoot.classList.add('confirm-dialog-holder');

    return new Promise(res => {
      const giveAnswer = (answer: boolean) => {
        ReactDOM.unmountComponentAtNode(confirmRoot)
        res(answer)
        body.removeChild(confirmRoot);
      }

      ReactDOM.render(
        <Provider store={store}>
          <ConfirmDialog
            giveAnswer={giveAnswer}
            message={message}
            confirmTitle={confirmTitle}
            cancelTitle={cancelTitle}
          />
        </Provider>, confirmRoot  
      )
    });
}
  