import { AxiosResponse } from 'axios';
import { authService } from 'services/auth.service';
import { HttpService } from 'services/http.service';

class AudioService extends HttpService {
  private static AUDIO_URL: string = '/api/audio';
  private static COVER_ART_URL: string = '/api/audio/cover';

  public getAll = (query: string): Promise<AxiosResponse> => {
    return this.get(AudioService.AUDIO_URL, {
      headers: authService.getAuthenticationHeader(),
      params: {query}
    });
  };

  public getCoverArtUrl = (coverArtName: string): string => {
    return `${HttpService.DOMAIN}${AudioService.COVER_ART_URL}/${coverArtName}`;
  };
}

export const audioService: AudioService = new AudioService();
