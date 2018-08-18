import * as React from 'react';
import { ReactNode } from 'react';

interface ThisProps {
  onLogoutClick: () => any;
}

export class Home extends React.Component<ThisProps> {

  public constructor(props: ThisProps) {
    super(props);
    this.state = {
    };
  }

  public render(): ReactNode {
    return (
      <div>
        <button onClick={this.props.onLogoutClick}>Logout</button>
      </div>
    );
  }
}
