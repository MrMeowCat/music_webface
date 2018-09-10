import 'components/dumb/Playback.css';
import { Audio } from 'models';
import * as React from 'react';
import { ReactNode } from 'react';

interface ThisProps {
  activeAudio: Audio;
  shuffle: boolean;
  repeat: boolean;
  onActivePlayClick: () => any;
  onShuffleClick: () => any;
  onRepeatClick: () => any;
}

export class Playback extends React.Component<ThisProps> {

  public render(): ReactNode {
    return (
      <div className={this.props.activeAudio.id ? 'controls flex' : ' controls flex disabled'}>
        <div className={'control-buttons'}>
          <button disabled={!this.props.activeAudio.id}
                  className={this.props.shuffle ? 'active' : ''}
                  onClick={this.props.onShuffleClick}
          >
            <i className={'fas fa-random active'}/>
          </button>
          <button disabled={!this.props.activeAudio.id}
                  className={this.props.repeat ? 'active' : ''}
                  onClick={this.props.onRepeatClick}
          >
            <i className={'fas fa-redo'}/>
          </button>
          <button disabled={!this.props.activeAudio.id} onClick={this.props.onActivePlayClick}>
            <i className={this.props.activeAudio.playing ? 'fas fa-pause' : 'fas fa-play'}/>
          </button>
        </div>
      </div>
    );
  }

}
