import { Howl } from 'howler';
import { Audio } from 'models';
import { audioService, storageService } from 'services';

export enum PlaybackEvents {
  Play, Pause, Stop, End
}

class PlaybackService {
  private static SHUFFLE_KEY: string = 'shuffle';
  private static REPEAT_KEY: string = 'repeat';
  private static VOLUME_KEY: string = 'volume';

  private activeAudio: Audio;
  private howl: Howl;
  private onPlay: Function;
  private onPause: Function;
  private onStop: Function;
  private onEnd: Function;

  public constructor() {
    this.activeAudio = {};
    this.howl = new Howl({src: ['.mp3']});
    this.applySettings();
  }

  public getShuffleSettings = (): boolean => {
    return storageService.get(PlaybackService.SHUFFLE_KEY) === 'true';
  };

  public getRepeatSettings = (): boolean => {
    return storageService.get(PlaybackService.REPEAT_KEY) === 'true';
  };

  public getVolumeSettings = (): number => {
    const volume: number = +storageService.get(PlaybackService.VOLUME_KEY);
    if (isNaN(volume) || volume < 0 || volume > 1) {
      return 0;
    }
    return volume;
  };

  public saveShuffleSettings = (shuffle: boolean): void => {
    storageService.save(PlaybackService.SHUFFLE_KEY, shuffle);
  };

  public saveRepeatSettings = (repeat: boolean): void => {
    storageService.save(PlaybackService.REPEAT_KEY, repeat);
    this.howl.loop(repeat);
  };

  public saveVolumeSettings = (volume: number): void => {
    storageService.save(PlaybackService.VOLUME_KEY, volume);
    this.howl.volume(volume);
  };

  public playOrPause = (audio: Audio): void => {
    if (audio.id === this.activeAudio.id) {
      if (audio.playing) {
        this.howl.play();
      } else {
        this.howl.pause();
      }
      this.activeAudio = audio;
      return;
    }
    this.stop();
    this.howl.unload();
    this.howl = new Howl({
      src: [audioService.getAudioFileUrl(audio.fileName!)]
    });
    this.howl.play();
    this.applySettings();
    this.activeAudio = audio;
  };

  public stop = (): void => {
    this.howl.stop();
  };

  public getTime = (): number => {
    return Math.floor(this.howl.seek() as number);
  };

  public setTime = (time: number) => {
    this.howl.seek(time);
  };

  public on = (event: PlaybackEvents, cb: Function): void => {
    switch (event) {
      case PlaybackEvents.Play: this.onPlay = cb; break;
      case PlaybackEvents.Pause: this.onPause = cb; break;
      case PlaybackEvents.Stop: this.onStop = cb; break;
      case PlaybackEvents.End: this.onEnd = cb; break;
    }
    this.applySettings();
  };

  private applySettings = (): void => {
    this.howl.loop(this.getRepeatSettings());
    this.howl.volume(this.getVolumeSettings());
    this.howl.on('play', this.onPlay);
    this.howl.on('pause', this.onPause);
    this.howl.on('stop', this.onStop);
    this.howl.on('end', this.onEnd);
  };
}

export const playbackService: PlaybackService = new PlaybackService();
