import { authService } from 'services';

export interface State {
  readonly authState: AuthState;
}

export interface AuthState {
  readonly loggedIn: boolean;
  readonly pending: boolean;
  readonly error: boolean;
}

export const initAuthState: AuthState = {
  loggedIn: !!authService.getToken(),
  pending: false,
  error: false
};
