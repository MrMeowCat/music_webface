import 'components/dumb/Playback.css';
import { Audio } from 'models';
import * as React from 'react';
import { ReactNode } from 'react';
import * as ReactSlider from 'react-slider';

interface ThisProps {
  activeAudio: Audio;
  shuffle: boolean;
  repeat: boolean;
  time: number;
  volume: number;
  volumePopup: boolean;
  onActivePlayClick: () => any;
  onShuffleClick: () => any;
  onRepeatClick: () => any;
  onTimelineBeforeChange: () => any;
  onTimelineAfterChange: (time: number) => any;
  onTimelineChange: (time: number) => any;
  onVolumeChange: (volume: number) => any;
  onVolumePopupClick: () => any;
}

export class Playback extends React.Component<ThisProps> {

  public render(): ReactNode {
    return (
      <div className={this.props.activeAudio.id ? 'controls flex' : ' controls flex disabled'}>
        <div className={'control-buttons flex'}>
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
        <div className={'playback flex-m'}>
          <ReactSlider withBars={true}
                       value={this.props.time}
                       min={0}
                       max={this.props.activeAudio.duration}
                       disabled={!this.props.activeAudio.id}
                       onBeforeChange={this.props.onTimelineBeforeChange}
                       onAfterChange={this.props.onTimelineAfterChange}
                       onChange={this.props.onTimelineChange}
          />
          <div className={'volume'}>
            <div className={this.props.volumePopup ? 'volume-popup p20' : 'volume-popup p20 hidden'}>
              <ReactSlider withBars={true}
                           value={this.props.volume}
                           min={0}
                           max={1}
                           step={0.01}
                           className={'slider slider-volume'}
                           onChange={this.props.onVolumeChange}
              />
            </div>
            <button className={this.props.volumePopup ? 'volume-btn active' : 'volume-btn'}
                    onClick={this.props.onVolumePopupClick}>
              <i className={'fas fa-volume-up'}/>
            </button>
          </div>
          <span className={'time'}>{this.renderTime()}</span>
        </div>
      </div>
    );
  }

  /**
   * Triggers resize to fix buggy slider bars.
   */
  public componentDidMount(): void {
    window.dispatchEvent(new Event('resize'));
  }

  private renderTime = (): string => {
    const minutes: number = Math.floor(this.props.time / 60);
    const seconds: number = this.props.time % 60;
    const secondsString: string = seconds > 9 ? seconds.toString() : `0${seconds}`;
    return `${minutes}:${secondsString}`;
  };
}
