import { Audio } from 'models';
import { combineReducers, Reducer } from 'redux';
import { ActionKeys, ActionTypes } from 'store/actions';
import { AudioListState, AuthState, initAudioListState, initAuthState, State } from 'store/states';

const authReducer: Reducer<AuthState> = (state: AuthState = initAuthState, action: ActionTypes): AuthState => {
  switch (action.type) {
    case ActionKeys.LOGIN_PENDING:
      return {...state, pending: true};
    case ActionKeys.LOGIN_SUCCESS:
      return {...state, loggedIn: true, pending: false, error: false};
    case ActionKeys.LOGIN_FAILED:
      return {...state, pending: false, error: true};
    case ActionKeys.LOGOUT:
      return {...state, loggedIn: false};
    default: return state;
  }
};

const audioListReducer: Reducer<AudioListState> = (state: AudioListState = initAudioListState, action: ActionTypes)
  : AudioListState => {
  switch (action.type) {
    case ActionKeys.GET_AUDIOS:
      return {...state, audios: action.payload};
    case ActionKeys.SWITCH_ACTIVE_AUDIO:
      const audios: Audio[] = [];
      for (const audio of state.audios) {
        if (audio.id === state.activeAudio.id) {
          audio.playing = false;
        }
        audios.push(audio);
      }
      action.audio.playing = action.playing;
      return {...state, audios, activeAudio: action.audio};
    case ActionKeys.SHOW_SPINNER:
      return {...state, spinner: action.payload};
    default: return state;
  }
};

export const reducers: Reducer<State> = combineReducers<State>({
  authState: authReducer,
  audioListState: audioListReducer
});
