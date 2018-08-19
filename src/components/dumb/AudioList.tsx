import 'components/dumb/AudioList.css';
import { Audio } from 'models';
import * as React from 'react';
import { ReactNode } from 'react';

interface ThisProps {
  audios: Audio[];
}

export class AudioList extends React.Component<ThisProps> {

  public render(): ReactNode {
    return (
      <div>
        {this.renderAudios()}
      </div>
    );
  }

  private renderAudios = (): ReactNode => {
    return this.props.audios.map((audio: Audio) => (
      <div key={audio.id}>
        <h2>{audio.title}</h2>
      </div>
    ));
  }
}
