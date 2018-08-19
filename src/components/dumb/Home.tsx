import { AudioListSmart, NavSmart } from 'components/smart';
import * as React from 'react';
import { ReactNode } from 'react';

export class Home extends React.Component {

  public render(): ReactNode {
    return (
      <div>
        <NavSmart/>
        <AudioListSmart/>
      </div>
    );
  }
}
