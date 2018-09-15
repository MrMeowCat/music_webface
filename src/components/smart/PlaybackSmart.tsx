import { Playback } from 'components/dumb';
import { Audio } from 'models';
import * as React from 'react';
import { ReactNode } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { PlaybackEvents, playbackService } from 'services';
import { Actions, ActionTypes } from 'store/actions';
import { State } from 'store/states';
import { Utils } from 'utils';
import Timer = NodeJS.Timer;

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

  private interval: Timer;
  private playedAudios: {[id: string]: Audio} = {};

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
  }

  public componentDidMount(): void {
    playbackService.on(PlaybackEvents.Play, () => {
      this.interval = setInterval(() => {
        if (!this.state.timelineLocked) {
          this.setState({time: playbackService.getTime()});
        }
      }, 1000);
    });
    playbackService.on(PlaybackEvents.Pause, () => {
      clearInterval(this.interval);
    });
    playbackService.on(PlaybackEvents.Stop, () => {
      clearInterval(this.interval);
      this.setState({time: 0});
    });
    playbackService.on(PlaybackEvents.End, () => {
      clearInterval(this.interval);
      this.playNext();
    });
  }

  public componentWillUnmount(): void {
    clearInterval(this.interval);
    playbackService.on(PlaybackEvents.Play, () => {});
    playbackService.on(PlaybackEvents.Pause, () => {});
    playbackService.on(PlaybackEvents.Stop, () => {});
    playbackService.on(PlaybackEvents.End, () => {});
    playbackService.stop();
    this.props.switchActiveAudio({}, false);
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
    if (this.state.shuffle) {
      this.playedAudios = {};
    }
    this.setState({shuffle: !this.state.shuffle});
  };

  private handleRepeatClick = (): void => {
    playbackService.saveRepeatSettings(!this.state.repeat);
    this.setState({repeat: !this.state.repeat});
  };

  private handleTimelineBeforeChange = (): void => {
    this.setState({timelineLocked: true});
  };

  private handleTimelineAfterChange = (time: number): void => {
    playbackService.setTime(time);
    this.setState({time, timelineLocked: false});
  };

  private handleTimelineChange = (time: number): void => {
    this.setState({time});
  };

  private handleVolumeChange = (volume: number): void => {
    playbackService.saveVolumeSettings(volume);
    this.setState({volume});
  };

  private handleVolumePopupClick = (): void => {
    this.setState({volumePopup: !this.state.volumePopup});
  };

  private playNext = (): void => {
    if (this.state.repeat) {
      return;
    }
    const next: Audio = this.state.shuffle ? this.getNextShuffle() : this.getNext();
    this.props.switchActiveAudio(next, true);
  };

  private getNext = (): Audio => {
    let next: Audio = this.props.activeAudio;
    for (let i: number = 0, length: number = this.props.audios.length; i < length; i++) {
      const audio: Audio = this.props.audios[i];
      if (next.id === audio.id) {
        next = this.props.audios[i === length - 1 ? 0 : i + 1];
        break;
      }
    }
    return next;
  };

  private getNextShuffle = (): Audio => {
    const next: Audio = this.props.activeAudio;
    this.playedAudios[next.id!] = next;
    const ids: string[] = this.props.audios.map((audio: Audio) => audio.id!);
    let filteredIds: string[] = ids.filter((id: string) => !this.playedAudios[id]);
    if (filteredIds.length === 0) {
      this.playedAudios = {};
      this.playedAudios[next.id!] = next;
      filteredIds = ids.filter((id: string) => !this.playedAudios[id]);
    }
    const nextId: string = filteredIds[Utils.randomInt(0, filteredIds.length)];
    return this.props.audios.find((audio: Audio) => audio.id === nextId)!;
  }
}

export default connect(mapState2Props, mapDispatch2Props)(PlaybackSmart);
