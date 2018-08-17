import 'components/dumb/Login.css';
import * as React from 'react';
import { ReactNode } from 'react';

interface ThisProps {
  onUsernameChange: (e: any) => any;
  onPasswordChange: (e: any) => any;
  onLoginClick: () => any;
}

export class Login extends React.Component<ThisProps> {

  constructor(props: ThisProps) {
    super(props);
  }

  public render(): ReactNode {
    return (
      <div>
        <div>
          <input type={'text'} placeholder={'Username'} onChange={this.props.onUsernameChange}/>
          <input type={'password'} placeholder={'Password'} onChange={this.props.onPasswordChange}/>
          <button onClick={this.props.onLoginClick}>Login</button>
        </div>
      </div>
    )
  }

}
