import { AxiosResponse } from 'axios';
import { authService } from 'services/auth.service';
import { HttpService } from 'services/http.service';

class AudioService extends HttpService {
  private static AUDIO_URL: string = '/api/audio';

  public getAll = (query: string): Promise<AxiosResponse> => {
    return this.get(AudioService.AUDIO_URL, {
      headers: authService.getAuthenticationHeader(),
      params: {query}
    });
  };
}

export const audioService: AudioService = new AudioService();
