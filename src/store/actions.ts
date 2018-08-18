/* Action Keys */
export enum ActionKeys {
  LOGIN_PENDING = 'LOGIN PENDING',
  LOGIN_SUCCESS = 'LOGIN SUCCESS',
  LOGIN_FAILED = 'LOGIN FAILED',
  LOGOUT = 'LOGOUT',
}

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

export type ActionTypes =
| LoginPendingAction
| LoginSuccessAction
| LoginFailedAction
| LogoutAction

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
}
