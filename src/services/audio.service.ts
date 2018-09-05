import { AxiosResponse } from 'axios';
import { authService } from 'services/auth.service';
import { HttpService } from 'services/http.service';
import { storageService } from 'services/index';

class AudioService extends HttpService {
  private static AUDIO_URL: string = '/api/audio';
  private static COVER_ART_URL: string = '/api/audio/cover';
  private static SHUFFLE_KEY: string = 'shuffle';
  private static REPEAT_KEY: string = 'repeat';

  public getAll = (query: string): Promise<AxiosResponse> => {
    return this.get(AudioService.AUDIO_URL, {
      headers: authService.getAuthenticationHeader(),
      params: {query}
    });
  };

  public getCoverArtUrl = (coverArtName: string): string => {
    return `${HttpService.DOMAIN}${AudioService.COVER_ART_URL}/${coverArtName}`;
  };

  public getShuffleSettings = (): boolean => {
    return storageService.get(AudioService.SHUFFLE_KEY) === 'true';
  };

  public getRepeatSettings = (): boolean => {
    return storageService.get(AudioService.REPEAT_KEY) === 'true';
  };

  public saveShuffleSettings = (shuffle: boolean): void => {
    storageService.save(AudioService.SHUFFLE_KEY, shuffle);
  };

  public saveRepeatSettings = (repeat: boolean): void => {
    storageService.save(AudioService.REPEAT_KEY, repeat);
  };
}

export const audioService: AudioService = new AudioService();
