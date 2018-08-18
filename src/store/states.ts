import { authService } from 'services';

export interface State {
  readonly authState: AuthState;
}

export interface AuthState {
  readonly loggedIn: boolean;
  readonly pending: boolean;
}

export const initAuthState: AuthState = {
  loggedIn: !!authService.getToken(),
  pending: false
};
