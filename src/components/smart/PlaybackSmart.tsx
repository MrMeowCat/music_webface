import { Playback } from 'components/dumb';
import { Audio } from 'models';
import * as React from 'react';
import { ReactNode } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { playbackService } from 'services';
import { Actions, ActionTypes } from 'store/actions';
import { State } from 'store/states';

interface ThisProps {
  audios: Audio[];
  activeAudio: Audio;
  switchActiveAudio: (audio: Audio, playing: boolean) => any;
}

interface ThisState {
  shuffle: boolean;
  repeat: boolean;
  timelineLocked: boolean;
  time: number;
  volume: number;
  volumePopup: boolean;
}

const mapState2Props = (state: State): any => {
  return {
    audios: state.audioListState.audios,
    activeAudio: state.audioListState.activeAudio,
  };
};

const mapDispatch2Props = (dispatch: Dispatch<ActionTypes>): any => {
  return {
    switchActiveAudio: (audio: Audio, playing: boolean): void => {
      dispatch(Actions.switchActiveAudio(audio, playing));
      playbackService.playOrPause(audio);
    }
  };
};

class PlaybackSmart extends React.Component<ThisProps, ThisState> {

  public constructor(props: ThisProps) {
    super(props);
    this.state = {
      shuffle: playbackService.getShuffleSettings(),
      repeat: playbackService.getRepeatSettings(),
      timelineLocked: false,
      time: 0,
      volume: playbackService.getVolumeSettings(),
      volumePopup: false
    };
    playbackService.setOnPlay(() => {
      setInterval(() => {
        if (!this.state.timelineLocked) {
          this.setState({
            time: playbackService.getTime()
          });
        }
      }, 1000);
    });
  }

  public render(): ReactNode {
    return (
      <Playback activeAudio={this.props.activeAudio}
                shuffle={this.state.shuffle}
                repeat={this.state.repeat}
                time={this.state.time}
                volume={this.state.volume}
                volumePopup={this.state.volumePopup}
                onActivePlayClick={this.handleActivePlayClick}
                onShuffleClick={this.handleShuffleClick}
                onRepeatClick={this.handleRepeatClick}
                onTimelineBeforeChange={this.handleTimelineBeforeChange}
                onTimelineAfterChange={this.handleTimelineAfterChange}
                onTimelineChange={this.handleTimelineChange}
                onVolumeChange={this.handleVolumeChange}
                onVolumePopupClick={this.handleVolumePopupClick}
      />
    );
  }

  private handleActivePlayClick = (): void => {
    this.props.switchActiveAudio(this.props.activeAudio, !this.props.activeAudio.playing);
  };

  private handleShuffleClick = (): void => {
    playbackService.saveShuffleSettings(!this.state.shuffle);
    this.setState({
      shuffle: !this.state.shuffle
    });
  };

  private handleRepeatClick = (): void => {
    playbackService.saveRepeatSettings(!this.state.repeat);
    this.setState({
      repeat: !this.state.repeat
    });
  };

  private handleTimelineBeforeChange = (): void => this.setState({timelineLocked: true});

  private handleTimelineAfterChange = (time: number): void => {
    playbackService.setTime(time);
    this.setState({time, timelineLocked: false});
  };

  private handleTimelineChange = (time: number): void => this.setState({time});

  private handleVolumeChange = (volume: number): void => {
    playbackService.saveVolumeSettings(volume);
    this.setState({volume});
  };

  private handleVolumePopupClick = (): void => this.setState({volumePopup: !this.state.volumePopup});
}

export default connect(mapState2Props, mapDispatch2Props)(PlaybackSmart);
