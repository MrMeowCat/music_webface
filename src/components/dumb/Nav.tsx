import 'components/dumb/Nav.css';
import { EqualizerSmart } from 'components/smart';
import * as React from 'react';
import { ReactNode } from 'react';

interface ThisProps {
  onSearchQueryChange: (e: any) => any;
  onUploadClick: () => any;
  onLogoutClick: () => any;
}

export class Nav extends React.Component<ThisProps> {

  public render(): ReactNode {
    return (
      <div className={'nav-wrapper flex-c'}>
        <div className={'nav flex'}>
          <div className={'nav-search ml30 mr10'}>
            <div className={'flex-m'}>
              <input type={'text'}
                     placeholder={'Search Music...'}
                     onBlur={this.handleFocus}
                     onFocus={this.handleFocus}
                     onChange={this.props.onSearchQueryChange}/>
              <i className={'fas fa-search'}/>
            </div>
          </div>
          <button className={'nav-btn'} onClick={this.props.onUploadClick}>
            <i className={'fas fa-cloud-upload-alt'}/>
          </button>
          {React.createElement(EqualizerSmart)}
          <div className={'nav-logout ml30 mr30'}>
            <a className={'flex-m'} onClick={this.props.onLogoutClick}>
              Logout
              <i className={'fas fa-sign-out-alt'}/>
            </a>
          </div>
        </div>
      </div>
    );
  }

  private handleFocus = (e: any): any => {
    e.target.parentElement.classList.toggle('active');
  }
}
