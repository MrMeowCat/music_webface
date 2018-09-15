import { AxiosError, AxiosResponse } from 'axios';
import { Login } from 'components/dumb';
import * as React from 'react';
import { ReactNode } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { toast } from 'react-toastify';
import { Dispatch } from 'redux';
import { authService } from 'services';
import { Actions, ActionTypes } from 'store/actions';
import { State } from 'store/states';

interface ThisProps {
  loggedIn: boolean;
  pending: boolean;
  error: boolean;
  login: (username: string, password: string) => any;
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
    login: (username: string, password: string) => {
      dispatch(Actions.loginPending());
      authService.login(username, password)
        .then((res: AxiosResponse) => {
          dispatch(Actions.loginSuccess());
        })
        .catch((err: AxiosError) => {
          dispatch(Actions.loginFailed());
          if (err.response && err.response.status !== 401) {
            toast.error('Unable to login');
          }
        });
    }
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
    return this.props.loggedIn ?
      <Redirect to={'/'}/> :
      <Login pending={this.props.pending}
             error={this.props.error}
             onUsernameChange={this.handleUsernameChange}
             onPasswordChange={this.handlePasswordChange}
             onLoginClick={this.handleLoginClick}/>;
  }

  private handleUsernameChange = (e: any): void => this.setState({username: e.target.value});

  private handlePasswordChange = (e: any): void => this.setState({password: e.target.value});

  private handleLoginClick = (): void => {
    this.props.login(this.state.username, this.state.password);
  };
}

export default connect(mapState2Props, mapDispatch2Props)(LoginSmart);
