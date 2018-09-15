import { AxiosError, AxiosResponse } from 'axios';
import { AudioList } from 'components/dumb';
import { Audio } from 'models';
import * as React from 'react';
import { ReactNode } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { Dispatch } from 'redux';
import { audioService, playbackService, SearchResult } from 'services';
import { Actions, ActionTypes } from 'store/actions';
import { State } from 'store/states';

interface ThisProps {
  audios: Audio[];
  searchResult: SearchResult;
  activeAudio: Audio;
  spinner: boolean;
  switchActiveAudio: (audio: Audio, playing: boolean) => any;
  saveAudio: (audio: Audio) => any;
  deleteAudio: (audio: Audio) => any;
}

interface ThisState {
  editMode: boolean;
  editAudio: Audio;
  activeLyrics: {visible: boolean, audio: Audio}
}

const mapState2Props = (state: State): any => {
  return {
    audios: state.audioListState.audios,
    searchResult: state.audioListState.searchResult,
    activeAudio: state.audioListState.activeAudio,
    spinner: state.audioListState.spinner
  };
};

const mapDispatch2Props = (dispatch: Dispatch<ActionTypes>): any => {
  return {
    switchActiveAudio: (audio: Audio, playing: boolean): void => {
      dispatch(Actions.switchActiveAudio(audio, playing));
      playbackService.playOrPause(audio);
    },
    saveAudio: (audio: Audio): void => {
      dispatch(Actions.showSpinner(true));
      audioService.save(audio).then((res: AxiosResponse) => {
        dispatch(Actions.saveAudio(res.data));
        toast.success('Audio saved!');
      }).catch((err: AxiosError) => {
        if (err.response) {
          toast.error('Failed to save audio!');
        }
      }).then(() => dispatch(Actions.showSpinner(false)));
    },
    deleteAudio: (audio: Audio): void => {
      dispatch(Actions.showSpinner(true));
      audioService.deleteAudio(audio).then((res: AxiosResponse) => {
        dispatch(Actions.deleteAudio(audio));
        toast.success('Audio deleted!');
      }).catch((err: AxiosError) => {
        if (err.response) {
          toast.error('Failed to delete audio!');
        }
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
      },
      activeLyrics: {
        visible: false,
        audio: {
          title: '',
          lyrics: ''
        }
      }
    };
  }

  public render(): ReactNode {
    return <AudioList audios={this.props.audios}
                      searchResult={this.props.searchResult}
                      activeAudio={this.props.activeAudio}
                      spinner={this.props.spinner}
                      activeLyrics={this.state.activeLyrics}
                      editMode={this.state.editMode}
                      editAudio={this.state.editAudio}
                      onItemPlayClick={this.handleItemPlayClick}
                      onItemDeleteClick={this.handleItemDeleteClick}
                      onLyricsWrapperShow={this.handleLyricsWrapperShow}
                      onLyricsWrapperHide={this.handleLyricsWrapperHide}
                      onEditWrapperShow={this.handleEditWrapperShow}
                      onEditWrapperHide={this.handleEditWrapperHide}
                      onEditTitleChange={this.handleEditTitleChange}
                      onEditAuthorChange={this.handleEditAuthorChange}
                      onEditLyricsChange={this.handleEditLyricsChange}
                      onEditAudioSave={this.handleEditAudioSave}/>;
  }

  private handleItemPlayClick = (audio: Audio, e: any): void => {
    if (audio.id === this.props.activeAudio.id) {
      this.props.switchActiveAudio(audio, !audio.playing);
      return;
    }
    this.props.switchActiveAudio(audio, true);
  };

  private handleItemDeleteClick = (audio: Audio): void => {
    if (audio.id === this.props.activeAudio.id) {
      playbackService.stop();
    }
    this.props.deleteAudio(audio);
  };

  private handleLyricsWrapperShow = (audio: Audio): void => {
    this.setState({
      activeLyrics: {
        visible: true,
        audio
      }
    });
  };

  private handleLyricsWrapperHide = (): void => {
    this.setState({
      activeLyrics: {
        visible: false,
        audio: {
          title: '',
          lyrics: ''
        }
      }
    });
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
    this.props.saveAudio(this.state.editAudio);
  };
}

export default connect(mapState2Props, mapDispatch2Props)(AudioListSmart);
