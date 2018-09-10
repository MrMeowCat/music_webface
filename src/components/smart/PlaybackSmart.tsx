import { Playback } from 'components/dumb';
import { Audio } from 'models';
import { ReactNode } from 'react';
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { audioService } from 'services';
import { Actions, ActionTypes } from 'store/actions';
import { State } from 'store/states';

interface ThisProps {
  audios?: Audio[];
  activeAudio?: Audio;
  shuffle?: boolean;
  repeat?: boolean;
  switchActiveAudio?: (audio: Audio, playing: boolean) => any;
  switchShuffle?: (shuffle: boolean) => any;
  switchRepeat?: (repeat: boolean) => any;
}

const mapState2Props = (state: State): any => {
  return {
    audios: state.audioListState.audios,
    activeAudio: state.audioListState.activeAudio,
    shuffle: state.audioListState.shuffle,
    repeat: state.audioListState.repeat,
  };
};

const mapDispatch2Props = (dispatch: Dispatch<ActionTypes>): any => {
  return {
    switchActiveAudio: (audio: Audio, playing: boolean): void => {
      dispatch(Actions.switchActiveAudio(audio, playing));
    },
    switchShuffle: (shuffle: boolean): void => {
      audioService.saveShuffleSettings(shuffle);
      dispatch(Actions.switchShuffle(shuffle));
    },
    switchRepeat: (repeat: boolean): void => {
      audioService.saveRepeatSettings(repeat);
      dispatch(Actions.switchRepeat(repeat));
    }
  };
};

class PlaybackSmart extends React.Component<ThisProps> {

  public render(): ReactNode {
    return (
      <Playback activeAudio={this.props.activeAudio!}
                shuffle={this.props.shuffle!}
                repeat={this.props.repeat!}
                onActivePlayClick={this.handleActivePlayClick}
                onShuffleClick={this.handleShuffleClick}
                onRepeatClick={this.handleRepeatClick}
      />
    );
  }

  private handleActivePlayClick = (): void => {
    this.props.switchActiveAudio!(this.props.activeAudio!, !this.props.activeAudio!.playing);
  };

  private handleShuffleClick = (): void => {
    this.props.switchShuffle!(!this.props.shuffle);
  };

  private handleRepeatClick = (): void => {
    this.props.switchRepeat!(!this.props.repeat);
  };
}

export default connect(mapState2Props, mapDispatch2Props)(PlaybackSmart);
