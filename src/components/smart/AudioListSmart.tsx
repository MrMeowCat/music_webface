import { AxiosError, AxiosResponse } from 'axios';
import { AudioList } from 'components/dumb';
import { Audio } from 'models';
import * as React from 'react';
import { ReactNode } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { audioService, SearchResult } from 'services';
import { Actions, ActionTypes } from 'store/actions';
import { State } from 'store/states';

interface ThisProps {
  audios?: Audio[];
  searchResult?: SearchResult;
  activeAudio?: Audio;
  shuffle?: boolean;
  repeat?: boolean;
  spinner?: boolean;
  switchActiveAudio: (audio: Audio, playing: boolean) => any;
  switchShuffle: (shuffle: boolean) => any;
  switchRepeat: (repeat: boolean) => any;
  saveAudio?: (audio: Audio) => any;
  deleteAudio?: (audio: Audio) => any;
}

interface ThisState {
  editMode: boolean;
  editAudio: Audio;
}

const mapState2Props = (state: State) => {
  return {
    audios: state.audioListState.audios,
    searchResult: state.audioListState.searchResult,
    activeAudio: state.audioListState.activeAudio,
    shuffle: state.audioListState.shuffle,
    repeat: state.audioListState.repeat,
    spinner: state.audioListState.spinner
  };
};

const mapDispatch2Props = (dispatch: Dispatch<ActionTypes>) => {
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
    },
    saveAudio: (audio: Audio): void => {
      dispatch(Actions.showSpinner(true));
      audioService.save(audio).then((res: AxiosResponse) => {
        dispatch(Actions.saveAudio(res.data));
      }).catch((err: AxiosError) => {
        console.log(err);
      }).then(() => dispatch(Actions.showSpinner(false)));
    },
    deleteAudio: (audio: Audio): void => {
      dispatch(Actions.showSpinner(true));
      audioService.deleteAudio(audio).then((res: AxiosResponse) => {
        dispatch(Actions.deleteAudio(audio));
      }).catch((err: AxiosError) => {
        console.log(err);
      }).then(() => dispatch(Actions.showSpinner(false)));
    }
  };
};

class AudioListSmart extends React.Component<ThisProps, ThisState> {

  public constructor(props: ThisProps) {
    super(props);
    this.state = {
      editMode: false,
      editAudio: {
        title: '',
        author: '',
        lyrics: ''
      }
    };
  }

  public render(): ReactNode {
    return <AudioList audios={this.props.audios!}
                      searchResult={this.props.searchResult!}
                      activeAudio={this.props.activeAudio!}
                      shuffle={this.props.shuffle!}
                      repeat={this.props.repeat!}
                      spinner={this.props.spinner!}
                      editMode={this.state.editMode}
                      editAudio={this.state.editAudio}
                      onActivePlayClick={this.handleActivePlayClick}
                      onShuffleClick={this.handleShuffleClick}
                      onRepeatClick={this.handleRepeatClick}
                      onItemPlayClick={this.handleItemPlayClick}
                      onItemDeleteClick={this.handleItemDeleteClick}
                      onEditWrapperShow={this.handleEditWrapperShow}
                      onEditWrapperHide={this.handleEditWrapperHide}
                      onEditTitleChange={this.handleEditTitleChange}
                      onEditAuthorChange={this.handleEditAuthorChange}
                      onEditLyricsChange={this.handleEditLyricsChange}
                      onEditAudioSave={this.handleEditAudioSave}/>;
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

  private handleItemDeleteClick = (audio: Audio): void => {
    this.props.deleteAudio!(audio);
  };

  private handleEditWrapperShow = (audio: Audio): void => {
    this.setState({
      editMode: true,
      editAudio: {...audio}
    });
  };

  private handleEditWrapperHide = (): void => {
    this.setState({
      editMode: false,
      editAudio: {
        title: '',
        author: '',
        lyrics: ''
      }
    });
  };

  private handleEditTitleChange = (e: any): void => {
    this.setState({
      editAudio: {...this.state.editAudio, title: e.target.value}
    });
  };

  private handleEditAuthorChange = (e: any): void => {
    this.setState({
      editAudio: {...this.state.editAudio, author: e.target.value}
    });
  };

  private handleEditLyricsChange = (e: any): void => {
    this.setState({
      editAudio: {...this.state.editAudio, lyrics: e.target.value}
    });
  };

  private handleEditAudioSave = (): void => {
    this.props.saveAudio!(this.state.editAudio);
  };
}

export default connect(mapState2Props, mapDispatch2Props)(AudioListSmart);
