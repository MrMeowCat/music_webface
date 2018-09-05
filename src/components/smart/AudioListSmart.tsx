import { AudioList } from 'components/dumb';
import { Audio } from 'models';
import * as React from 'react';
import { ReactNode } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Actions, ActionTypes } from 'store/actions';
import { State } from 'store/states';

interface ThisProps {
  audios?: Audio[];
  activeAudio?: Audio;
  spinner?: boolean;
  switchActiveAudio: (audio: Audio, playing: boolean) => any;
}

const mapState2Props = (state: State) => {
  return {
    audios: state.audioListState.audios,
    activeAudio: state.audioListState.activeAudio,
    spinner: state.audioListState.spinner
  }
};

const mapDispatch2Props = (dispatch: Dispatch<ActionTypes>) => {
  return {
    switchActiveAudio: (audio: Audio, playing: boolean) => {
      dispatch(Actions.switchActiveAudio(audio, playing));
    }
  }
};

class AudioListSmart extends React.Component<ThisProps> {

  public render(): ReactNode {
    return <AudioList audios={this.props.audios!}
                      activeAudio={this.props.activeAudio!}
                      spinner={this.props.spinner!}
                      onActivePlayClick={this.handleActivePlayClick}
                      onItemPlayClick={this.handleItemPlayClick}/>;
  }

  private handleActivePlayClick = (): void => {
    this.props.switchActiveAudio(this.props.activeAudio!, !this.props.activeAudio!.playing);
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
