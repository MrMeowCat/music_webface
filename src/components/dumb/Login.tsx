import 'components/dumb/Login.css';
import * as React from 'react';
import { ReactNode } from 'react';

interface ThisProps {
  pending: boolean;
  error: boolean;
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
      <div className={'login-wrapper flex-m'}>
        <div className={'login'}>
          <div className={'login-header flex-b'}>
            <h2 className={'m0'}>Login</h2>
            {this.renderStatus()}
          </div>
          <div className={'login-input pl30 pt30 pr30'}>
            <input type={'text'} placeholder={'Username'} onChange={this.props.onUsernameChange}/>
          </div>
          <div className={'login-input pl30 pt30 pr30'}>
            <input type={'password'} placeholder={'Password'} onChange={this.props.onPasswordChange}/>
          </div>
          <div className={'login-footer p30'}>
            <button disabled={this.props.pending} onClick={this.props.onLoginClick}>Login</button>
          </div>
        </div>
      </div>
    )
  }

  private renderStatus = (): ReactNode => {
    if (this.props.pending) {
      return <i className={'far fa-clock pl30 pr30 flex-col-m grey'}/>;
    } else if (this.props.error) {
      return <i className={'fas fa-exclamation-circle pl30 pr30 flex-col-m red'}/>;
    }
    return <i/>;
  };
}
