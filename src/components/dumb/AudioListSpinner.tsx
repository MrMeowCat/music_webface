import 'components/dumb/AudioListSpinner.css';
import * as React from 'react';
import { ReactNode } from 'react';


export class AudioListSpinner extends React.Component {

  public render(): ReactNode {
    return (
      <div className={'spinner-wrapper flex-m'}>
        <div className="spinner">
          <div className="rect1"/>
          <div className="rect2"/>
          <div className="rect3"/>
          <div className="rect4"/>
          <div className="rect5"/>
        </div>
      </div>
    );
  }
}
