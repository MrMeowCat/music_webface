import { Audio } from 'models';
import { authService, SearchResult } from 'services';

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
  spinner: false
};
