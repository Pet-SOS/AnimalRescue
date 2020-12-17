import React from 'react';
import { IDataSignIn, IResponceSignIn } from '../../../../api/login';
import { getJwt } from '../../helpers/jwt';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../../../assets/header/logo.svg';
import { TI18n } from '../../../../i18n';
import '../styles/LoginComponent.scss';

interface IPropTypes {
  fetchLoginRequest: (body: IDataSignIn) => {};
  history: any;
  location: any;
  accountSignIn: IResponceSignIn;
}

interface IState {
  email: string; //admin@animalrescue.com
  password: string; //TestPassword123#
  rememberMe: boolean;
  showPass: boolean;
}

export class LoginComponent extends React.Component<IPropTypes, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      email: '',
      password: '',
      rememberMe: true,
      showPass: false,
    };
  }

  componentDidMount() {}
  handleSubmit(e: any) {
    e.preventDefault();
    this.props.fetchLoginRequest(this.state);
    const jwt = getJwt();

    if (!!jwt) {
      this.props.history.push(`/admin`);
    }
  }

  handleChangeInField(e: any, key: string) {
    e.preventDefault();
    this.setState({
      ...this.state,
      [key]: e.target.value,
    });
  }

  showPass() {
    this.setState(prevState => ({
      showPass: !prevState.showPass,
    }));
  }

  render() {
    return (
      <React.Fragment>
        <header className="header-login">
          <div className="container">
            <div className="logo-main">
              <Link className="logo" to="/">
                <Logo />
              </Link>
              <div className="logo-text">
                <TI18n
                  keyStr="headerTitle"
                  default="Спасение животных Харьков"
                />
              </div>
            </div>
          </div>
        </header>
        <div className="login-form-holder">
          <div className="container">
            <h2>Авторизація</h2>
            <form onSubmit={e => this.handleSubmit(e)}>
              <div className="form-row">
                <input
                  onChange={e => this.handleChangeInField(e, 'email')}
                  type="text"
                  placeholder="Эл.адреса"
                  name="uname"
                  required
                />
              </div>
              <div className="form-row">
                <input
                  onChange={e => this.handleChangeInField(e, 'password')}
                  id="pass"
                  type={this.state.showPass ? 'text' : 'password'}
                  placeholder="Пароль"
                  name="psw"
                  required
                />
                <label className="password-checkbox">
                  <input
                    type="checkbox"
                    onInput={() => this.showPass()}
                    checked={this.state.showPass}
                  />
                  <i>show pass</i>
                </label>
                <span className="text-error">
                  Введені електронна адреса або пароль невірні. Будь ласка,
                  спробуйте ще раз.
                </span>
              </div>
              <div className="form-row wrap-button">
                <button
                  className="btn btn-blue"
                  type="submit"
                  onSubmit={e => this.handleSubmit(e)}
                >
                  Увійти
                </button>
              </div>
              <a href="#" className="recover-psw">
                Відновити пароль
              </a>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
