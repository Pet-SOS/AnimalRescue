import React from 'react';
import { connect } from 'react-redux';

import './index.scss';
import { ICustomAppState } from '../../store/state';
import { selectSnackbarMessage } from '../../store/selectors/snackbar.selector';

interface IPropTypes {
  message: string | React.ReactNode;
}

const SnackBar: React.FC<IPropTypes> = ({ message }) => (
  <div className="snackbar-holder">
    <div className="snackbar-wrapper">
      <span>{message}</span>
    </div>
  </div>
);

const mapStateToProps = (state: ICustomAppState) => ({
  message: selectSnackbarMessage(state),
});

export default connect(mapStateToProps)(SnackBar);
