import { AxiosError, AxiosResponse } from 'axios';
import { Login } from 'components/dumb';
import * as React from 'react';
import { ReactNode } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Dispatch } from 'redux';
import { authService } from 'services';
import { Actions, ActionTypes } from 'store/actions';
import { State } from 'store/states';

interface ThisProps {
  loggedIn?: boolean;
  pending?: boolean;
  error?: boolean;
  loginPending?: () => any;
  loginSuccess?: () => any;
  loginFailed?: () => any;
}

interface ThisState {
  username: string;
  password: string;
}

const mapState2Props = (state: State): any => {
  return {
    loggedIn: state.authState.loggedIn,
    pending: state.authState.pending,
    error: state.authState.error
  };
};

const mapDispatch2Props = (dispatch: Dispatch<ActionTypes>): any => {
  return {
    loginPending: () => dispatch(Actions.loginPending()),
    loginSuccess: () => dispatch(Actions.loginSuccess()),
    loginFailed: () => dispatch(Actions.loginFailed())
  };
};

class LoginSmart extends React.Component<ThisProps, ThisState> {

  public constructor(props: ThisProps) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  public render(): ReactNode {
    return this.props.loggedIn! ?
      <Redirect to={'/'}/> :
      <Login pending={this.props.pending!}
             error={this.props.error!}
             onUsernameChange={this.handleUsernameChange}
             onPasswordChange={this.handlePasswordChange}
             onLoginClick={this.handleLoginClick}/>;
  }

  private handleUsernameChange = (e: any): void => this.setState({username: e.target.value});

  private handlePasswordChange = (e: any): void => this.setState({password: e.target.value});

  private handleLoginClick = (): void => {
    this.props.loginPending!();
    authService.login(this.state.username, this.state.password)
      .then((res: AxiosResponse) => {
        this.props.loginSuccess!();
      })
      .catch((err: AxiosError) => {
        this.props.loginFailed!();
      });
  };
}

export default connect(mapState2Props, mapDispatch2Props)(LoginSmart);
