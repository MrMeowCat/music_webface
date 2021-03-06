import { Audio } from 'models';
import { SearchResult } from 'services';

/* Action Types */
interface LoginPendingAction {
  readonly type: ActionKeys.LOGIN_PENDING
}

interface LoginSuccessAction {
  readonly type: ActionKeys.LOGIN_SUCCESS
}

interface LoginFailedAction {
  readonly type: ActionKeys.LOGIN_FAILED;
}

interface LogoutAction {
  readonly type: ActionKeys.LOGOUT;
}

interface GetAudiosAction {
  readonly type: ActionKeys.GET_AUDIOS;
  readonly payload: Audio[];
}

interface SearchAudiosAction {
  readonly type: ActionKeys.SEARCH_AUDIOS;
  readonly payload: SearchResult;
}

interface SaveAudioAction {
  readonly type: ActionKeys.SAVE_AUDIO;
  readonly payload: Audio;
}

interface DeleteAudioAction {
  readonly type: ActionKeys.DELETE_AUDIO;
  readonly payload: Audio;
}

interface SwitchActiveAudioAction {
  readonly type: ActionKeys.SWITCH_ACTIVE_AUDIO;
  readonly audio: Audio;
  readonly playing: boolean;
}

interface ShowSpinnerAction {
  readonly type: ActionKeys.SHOW_SPINNER;
  readonly payload: boolean;
}

export type ActionTypes =
  | LoginPendingAction
  | LoginSuccessAction
  | LoginFailedAction
  | LogoutAction
  | GetAudiosAction
  | SearchAudiosAction
  | SaveAudioAction
  | DeleteAudioAction
  | SwitchActiveAudioAction
  | ShowSpinnerAction

/* Action Keys */
export enum ActionKeys {
  LOGIN_PENDING = 'LOGIN PENDING',
  LOGIN_SUCCESS = 'LOGIN SUCCESS',
  LOGIN_FAILED = 'LOGIN FAILED',
  LOGOUT = 'LOGOUT',
  GET_AUDIOS = 'GET_AUDIOS',
  SEARCH_AUDIOS = 'SEARCH_AUDIOS',
  SAVE_AUDIO = 'SAVE_AUDIO',
  DELETE_AUDIO = 'DELETE_AUDIO',
  SWITCH_ACTIVE_AUDIO = 'SWITCH_ACTIVE_AUDIO',
  SHOW_SPINNER = 'SHOW_SPINNER'
}

/* Action Creators */
export namespace Actions {
  export const loginPending = (): LoginPendingAction => {
    return {type: ActionKeys.LOGIN_PENDING};
  };
  export const loginSuccess = (): LoginSuccessAction => {
    return {type: ActionKeys.LOGIN_SUCCESS};
  };
  export const loginFailed = (): LoginFailedAction => {
    return {type: ActionKeys.LOGIN_FAILED};
  };
  export const logout = (): LogoutAction => {
    return {type: ActionKeys.LOGOUT};
  };
  export const getAudios = (audios: Audio[]): GetAudiosAction => {
    return {type: ActionKeys.GET_AUDIOS, payload: audios};
  };
  export const searchAudios = (result: SearchResult): SearchAudiosAction => {
    return {type: ActionKeys.SEARCH_AUDIOS, payload: result};
  };
  export const saveAudio = (audio: Audio): SaveAudioAction => {
    return {type: ActionKeys.SAVE_AUDIO, payload: audio};
  };
  export const deleteAudio = (audio: Audio): DeleteAudioAction => {
    return {type: ActionKeys.DELETE_AUDIO, payload: audio};
  };
  export const switchActiveAudio = (audio: Audio, playing: boolean): SwitchActiveAudioAction => {
    return {type: ActionKeys.SWITCH_ACTIVE_AUDIO, audio, playing};
  };
  export const showSpinner = (show: boolean): ShowSpinnerAction => {
    return {type: ActionKeys.SHOW_SPINNER, payload: show};
  };
}
