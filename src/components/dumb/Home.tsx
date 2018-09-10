import 'components/dumb/Home.css';
import { AudioListSmart, NavSmart } from 'components/smart';
import * as React from 'react';
import { ReactNode } from 'react';

interface ThisState {
  contentPadding: number;
}

export class Home extends React.Component<{}, ThisState> {

  constructor(props: any) {
    super(props);
    this.state = {
      contentPadding: 0
    }
  }

  public componentDidMount(): void {
    const nav: Element | null = document.querySelector('.nav-wrapper');
    if (!nav) {
      return;
    }
    this.setState({
      contentPadding: nav.clientHeight
    });
  }

  public render(): ReactNode {
    return (
      <div>
        {React.createElement(NavSmart)}
        <div style={{paddingTop: this.state.contentPadding}} className={'pl30 pr30 flex-c'}>
          {React.createElement(AudioListSmart)}
        </div>
      </div>
    );
  }
}
