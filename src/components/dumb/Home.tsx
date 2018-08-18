import * as React from 'react';
import { ReactNode } from 'react';

interface ThisProps {
}

export class Home extends React.Component<ThisProps> {

  public constructor(props: ThisProps) {
    super(props);
    this.state = {
    };
  }

  public render(): ReactNode {
    return <p>Home</p>;
  }
}
