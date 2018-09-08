import { Audio } from 'models';
import { audioService, authService, SearchResult } from 'services';

export interface State {
  readonly authState: AuthState;
  readonly audioListState: AudioListState;
}

export interface AuthState {
  readonly loggedIn: boolean;
  readonly pending: boolean;
  readonly error: boolean;
}

export interface AudioListState {
  readonly audios: Audio[];
  readonly searchResult: SearchResult;
  readonly activeAudio: Audio;
  readonly shuffle: boolean;
  readonly repeat: boolean;
  readonly spinner: boolean;
}

export const initAuthState: AuthState = {
  loggedIn: !!authService.getToken(),
  pending: false,
  error: false
};

export const initAudioListState: AudioListState = {
  audios: [],
  searchResult: {records: []},
  activeAudio: {},
  shuffle: audioService.getShuffleSettings(),
  repeat: audioService.getRepeatSettings(),
  spinner: false
};
