class StorageService {

  public save = (key: string, o: any): void => {
    localStorage.setItem(key, o);
  };

  public get = (key: string): string => {
    return localStorage.getItem(key) as string;
  };

  public remove = (key: string): void => localStorage.removeItem(key);
}

export const storageService: StorageService = new StorageService();
