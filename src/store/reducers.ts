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
    case ActionKeys.SEARCH_AUDIOS:
      return {...state, searchResult: action.payload};
    case ActionKeys.SAVE_AUDIO: {
      const audios: Audio[] = state.audios;
      for (const audio of audios) {
        if (audio.id === action.payload.id) {
          audio.title = action.payload.title;
          audio.author = action.payload.author;
          audio.lyrics = action.payload.lyrics;
        }
      }
      return {...state, audios};
    }
    case ActionKeys.DELETE_AUDIO: {
      const audios: Audio[] = state.audios.filter((audio: Audio) => audio.id !== action.payload.id);
      const activeAudio: Audio = action.payload.id === state.activeAudio.id ? {} : state.activeAudio;
      return {...state, audios, activeAudio};
    }
    case ActionKeys.SWITCH_ACTIVE_AUDIO: {
      const audios: Audio[] = [];
      for (const audio of state.audios) {
        if (audio.id === state.activeAudio.id) {
          audio.playing = false;
        }
        audios.push(audio);
      }
      action.audio.playing = action.playing;
      return {...state, audios, activeAudio: action.audio};
    }
    case ActionKeys.SHOW_SPINNER:
      return {...state, spinner: action.payload};
    default: return state;
  }
};

export const reducers: Reducer<State> = combineReducers<State>({
  authState: authReducer,
  audioListState: audioListReducer
});
