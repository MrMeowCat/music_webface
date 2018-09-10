import { AxiosResponse } from 'axios';
import { Audio } from 'models';
import { storageService } from 'services';
import { authService } from 'services/auth.service';
import { HttpService } from 'services/http.service';

export interface SearchResult {
  records: SearchRecord[];
}

export interface SearchRecord {
  index: number;
  start: number;
  end: number;
  inTitle: boolean;
}

class AudioService extends HttpService {
  private static AUDIO_URL: string = '/api/audio';
  private static COVER_ART_URL: string = '/api/audio/cover';
  private static AUDIO_FILE_URL: string = '/api/audio/file';
  private static SHUFFLE_KEY: string = 'shuffle';
  private static REPEAT_KEY: string = 'repeat';

  public getAll = (): Promise<AxiosResponse> => {
    return this.get(AudioService.AUDIO_URL, {
      headers: authService.getAuthenticationHeader()
    });
  };

  public searchAudios = (audios: Audio[], query: string): Promise<SearchResult> => {
    return new Promise<SearchResult>(resolve => {
      const result: SearchResult = {
        records: []
      };
      audios.forEach((audio: Audio, index: number) => {
        if (!query) {
          result.records.push({index, start: 0, end: 0, inTitle: true});
          return;
        }
        let start: number = -1;
        let end: number = -1;
        let inTitle: boolean = true;
        if (audio.title) {
          start = audio.title.search(new RegExp(query, 'i'));
        }
        if (start === -1 && audio.author) {
          start = audio.author.search(new RegExp(query, 'i'));
          inTitle = false;
        }
        if (start !== -1) {
          end = start + query.length;
          result.records.push({index, start, end, inTitle});
        }
      });
      resolve(result);
    });
  };

  public upload = (file: File): Promise<AxiosResponse> => {
    const fd: FormData = new FormData();
    fd.append('file', file);
    return this.post(AudioService.AUDIO_URL, fd, {
      headers: {
        ...authService.getAuthenticationHeader(),
        'content-type': 'multipart/form-data',
      }
    });
  };

  public save = (audio: Audio): Promise<AxiosResponse> => {
    return this.put(AudioService.AUDIO_URL, audio, {
      headers: authService.getAuthenticationHeader()
    });
  };

  public deleteAudio = (audio: Audio): Promise<AxiosResponse> => {
    return this.delete(`${AudioService.AUDIO_URL}/${audio.id}`, {
      headers: authService.getAuthenticationHeader()
    });
  };

  public getCoverArtUrl = (coverArtName: string): string => {
    return `${HttpService.DOMAIN}${AudioService.COVER_ART_URL}/${coverArtName}`;
  };

  public getAudioFileUrl = (file: string): string => {
    return `${HttpService.DOMAIN}${AudioService.AUDIO_FILE_URL}/${file}`;
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
