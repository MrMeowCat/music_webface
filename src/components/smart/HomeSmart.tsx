import { Home } from 'components/dumb';
import * as React from 'react';
import { ReactNode } from 'react';

interface ThisState {
}

export class HomeSmart extends React.Component<any, ThisState> {

  public constructor(props: any) {
    super(props);
    this.state = {
    };
  }

  public render(): ReactNode {
    return <Home/>;
  }
}
