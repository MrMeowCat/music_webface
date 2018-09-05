import { Audio } from 'models';

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

interface SwitchActiveAudioAction {
  readonly type: ActionKeys.SWITCH_ACTIVE_AUDIO;
  readonly audio: Audio;
  readonly playing: boolean;
}

interface SwitchShuffleAction {
  readonly type: ActionKeys.SWITCH_SHUFFLE;
  readonly payload: boolean;
}

interface SwitchRepeatAction {
  readonly type: ActionKeys.SWITCH_REPEAT;
  readonly payload: boolean;
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
  | SwitchActiveAudioAction
  | SwitchShuffleAction
  | SwitchRepeatAction
  | ShowSpinnerAction

/* Action Keys */
export enum ActionKeys {
  LOGIN_PENDING = 'LOGIN PENDING',
  LOGIN_SUCCESS = 'LOGIN SUCCESS',
  LOGIN_FAILED = 'LOGIN FAILED',
  LOGOUT = 'LOGOUT',
  GET_AUDIOS = 'GET_AUDIOS',
  SWITCH_ACTIVE_AUDIO = 'SWITCH_ACTIVE_AUDIO',
  SWITCH_SHUFFLE = 'SWITCH_SHUFFLE',
  SWITCH_REPEAT = 'SWITCH_REPEAT',
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
  export const switchActiveAudio = (audio: Audio, playing: boolean): SwitchActiveAudioAction => {
    return {type: ActionKeys.SWITCH_ACTIVE_AUDIO, audio, playing};
  };
  export const switchShuffle = (shuffle: boolean): SwitchShuffleAction => {
    return {type: ActionKeys.SWITCH_SHUFFLE, payload: shuffle};
  };
  export const switchRepeat = (repeat: boolean): SwitchRepeatAction => {
    return {type: ActionKeys.SWITCH_REPEAT, payload: repeat};
  };
  export const showSpinner = (show: boolean): ShowSpinnerAction => {
    return {type: ActionKeys.SHOW_SPINNER, payload: show};
  };
}
