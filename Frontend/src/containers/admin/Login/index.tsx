import { connect } from 'react-redux';
import { ICustomAppState } from '../../../store/state';
import { bindActionCreators, Dispatch, AnyAction } from 'redux';
import { LoginComponent } from './ui/LoginComponent';
import { actionAdminLoginRequest } from './store/actions';

const mapStateToProps = (state: ICustomAppState) => ({
  accountSignIn: state.AdminLogin.accountSignIn,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return bindActionCreators(
    {
      fetchLoginRequest: actionAdminLoginRequest,
    },
    dispatch,
  );
};

export const Login = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginComponent);
