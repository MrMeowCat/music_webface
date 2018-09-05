import { AudioList } from 'components/dumb';
import { Audio } from 'models';
import * as React from 'react';
import { ReactNode } from 'react';
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
  spinner?: boolean;
  switchActiveAudio: (audio: Audio, playing: boolean) => any;
  switchShuffle: (shuffle: boolean) => any;
  switchRepeat: (repeat: boolean) => any;
}

const mapState2Props = (state: State) => {
  return {
    audios: state.audioListState.audios,
    activeAudio: state.audioListState.activeAudio,
    shuffle: state.audioListState.shuffle,
    repeat: state.audioListState.repeat,
    spinner: state.audioListState.spinner
  }
};

const mapDispatch2Props = (dispatch: Dispatch<ActionTypes>) => {
  return {
    switchActiveAudio: (audio: Audio, playing: boolean) => {
      dispatch(Actions.switchActiveAudio(audio, playing));
    },
    switchShuffle: (shuffle: boolean) => {
      audioService.saveShuffleSettings(shuffle);
      dispatch(Actions.switchShuffle(shuffle));
    },
    switchRepeat: (repeat: boolean) => {
      audioService.saveRepeatSettings(repeat);
      dispatch(Actions.switchRepeat(repeat));
    },
  }
};

class AudioListSmart extends React.Component<ThisProps> {

  public render(): ReactNode {
    return <AudioList audios={this.props.audios!}
                      activeAudio={this.props.activeAudio!}
                      shuffle={this.props.shuffle!}
                      repeat={this.props.repeat!}
                      spinner={this.props.spinner!}
                      onActivePlayClick={this.handleActivePlayClick}
                      onShuffleClick={this.handleShuffleClick}
                      onRepeatClick={this.handleRepeatClick}
                      onItemPlayClick={this.handleItemPlayClick}/>;
  }

  private handleActivePlayClick = (): void => {
    this.props.switchActiveAudio(this.props.activeAudio!, !this.props.activeAudio!.playing);
  };

  private handleShuffleClick = (): void => {
    this.props.switchShuffle(!this.props.shuffle);
  };

  private handleRepeatClick = (): void => {
    this.props.switchRepeat(!this.props.repeat);
  };

  private handleItemPlayClick = (audio: Audio, e: any): void => {
    if (audio.id === this.props.activeAudio!.id) {
      this.props.switchActiveAudio(audio, !audio.playing);
      return;
    }
    this.props.switchActiveAudio(audio, true);
  };
}

export default connect(mapState2Props, mapDispatch2Props)(AudioListSmart);
