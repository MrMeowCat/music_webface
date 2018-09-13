import { storageService } from 'services/index';

class PlaybackService {
  private static SHUFFLE_KEY: string = 'shuffle';
  private static REPEAT_KEY: string = 'repeat';
  private static VOLUME_KEY: string = 'volume';

  public getShuffleSettings = (): boolean => {
    return storageService.get(PlaybackService.SHUFFLE_KEY) === 'true';
  };

  public getRepeatSettings = (): boolean => {
    return storageService.get(PlaybackService.REPEAT_KEY) === 'true';
  };

  public getVolumeSettings = (): number => {
    const volume: number = +storageService.get(PlaybackService.VOLUME_KEY);
    if (isNaN(volume) || volume < 0 || volume > 1) {
      return 1;
    }
    return volume;
  };

  public saveShuffleSettings = (shuffle: boolean): void => {
    storageService.save(PlaybackService.SHUFFLE_KEY, shuffle);
  };

  public saveRepeatSettings = (repeat: boolean): void => {
    storageService.save(PlaybackService.REPEAT_KEY, repeat);
  };

  public saveVolumeSettings = (volume: number): void => {
    storageService.save(PlaybackService.VOLUME_KEY, volume);
  };
}

export const playbackService: PlaybackService = new PlaybackService();
