import { AxiosResponse } from 'axios';
import { Login } from 'components/dumb';
import * as React from 'react';
import { ReactNode } from 'react';
import { Redirect } from 'react-router';
import { authService } from 'services';

interface ThisState {
  username: string;
  password: string;
  rememberMe: boolean;
  loggedIn: boolean;
}

export class LoginSmart extends React.Component<any, ThisState> {

  public constructor(props: any) {
    super(props);
    this.state = {
      username: '',
      password: '',
      rememberMe: true,
      loggedIn: false
    };
  }

  public render(): ReactNode {
    return this.state.loggedIn ?
      <Redirect to={'/'}/> :
      <Login onUsernameChange={this.handleUsernameChange}
             onPasswordChange={this.handlePasswordChange}
             onRememberMeChange={this.handleRememberMeChange}
             onLoginClick={this.handleLoginClick}/>
  }

  private handleUsernameChange = (e: any): void => this.setState({username: e.target.value});

  private handlePasswordChange = (e: any): void => this.setState({password: e.target.value});

  private handleRememberMeChange = (e: any): void => this.setState({rememberMe: e.target.checked});

  private handleLoginClick = (): void => {
    authService.login(this.state.username, this.state.password).then((res: AxiosResponse) => {
      this.setState({
        loggedIn: true
      });
    });
  }
}
