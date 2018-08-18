import { AxiosResponse } from 'axios';
import { HttpService } from 'services/http.service';
import { storageService } from 'services/storage.service';

class AuthService extends HttpService {
  private static TOKEN_KEY: string = 'token';
  private static PERMISSIONS_KEY: string = 'permissions';
  private static LOGIN_URL: string = '/api/login';

  public login = (username: string, password: string): Promise<AxiosResponse> => {
    return this.post(AuthService.LOGIN_URL, {username, password}).then(res => {
      storageService.save(AuthService.TOKEN_KEY, res.data.token);
      storageService.save(AuthService.PERMISSIONS_KEY, res.data.authorities);
      return res;
    });
  };

  public logout = (): void => {
    storageService.remove(AuthService.TOKEN_KEY);
    storageService.remove(AuthService.PERMISSIONS_KEY);
  };

  public getToken = (): string => storageService.get(AuthService.TOKEN_KEY);

  public hasAnyPermission = (...permissions: string[]): boolean => {
    const savedPermissions: string = storageService.get(AuthService.PERMISSIONS_KEY);
    if (!savedPermissions) {
      return false;
    }
    const actualPermissions: string[] = savedPermissions.split(',');
    return permissions.filter(permission => actualPermissions.indexOf(permission) !== -1).length > 0;
  };
}

export const Permissions: any = {
  GUEST: 'ROLE_GUEST',
  ADMIN: 'ROLE_ADMIN'
};

export const authService: AuthService = new AuthService();
