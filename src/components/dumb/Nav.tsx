import 'components/dumb/Nav.css';
import * as React from 'react';
import { ReactNode } from 'react';

interface ThisProps {
  onSearchQueryChange: (e: any) => any;
  onLogoutClick: () => any;
}

export class Nav extends React.Component<ThisProps> {

  public render(): ReactNode {
    return (
      <div>
        <div>
          <input onChange={this.props.onSearchQueryChange}/>
        </div>
        <div>
          <button onClick={this.props.onLogoutClick}>Logout</button>
        </div>
      </div>
    );
  }
}
