import { Audio } from 'models';
import { authService } from 'services';

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
}

export const initAuthState: AuthState = {
  loggedIn: !!authService.getToken(),
  pending: false,
  error: false
};

export const initAudioListState: AudioListState = {
  audios: []
};
