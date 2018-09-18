import { Preset, Presets, PresetTypes } from 'models';
import { storageService } from 'services/storage.service';

class EqualizerService {
  private static PRESET_KEY: string = 'preset';
  private static LOW_FREQUENCY = 100;
  private static MID_LOW_FREQUENCY = 400;
  private static MID_FREQUENCY = 1500;
  private static MID_HIGH_FREQUENCY = 5000;
  private static HIGH_FREQUENCY = 8000;
  private static MAX_GAIN: number = 24;
  private static MIN_GAIN: number = -24;

  private lf: BiquadFilterNode = Howler.ctx.createBiquadFilter();
  private mlf: BiquadFilterNode = Howler.ctx.createBiquadFilter();
  private mf: BiquadFilterNode = Howler.ctx.createBiquadFilter();
  private mhf: BiquadFilterNode = Howler.ctx.createBiquadFilter();
  private hf: BiquadFilterNode = Howler.ctx.createBiquadFilter();

  public init = (preset: Preset): void => {
    Howler.masterGain.connect(this.lf);
    Howler.masterGain.connect(this.mlf);
    Howler.masterGain.connect(this.mf);
    Howler.masterGain.connect(this.mhf);
    Howler.masterGain.connect(this.hf);
    Howler.masterGain.gain.value = 0.15;
    this.setFilter(this.lf, 'lowshelf', EqualizerService.LOW_FREQUENCY, preset.low, Howler.ctx.destination);
    this.setFilter(this.mlf, 'peaking', EqualizerService.MID_LOW_FREQUENCY, preset.midLow, this.lf);
    this.setFilter(this.mf, 'peaking', EqualizerService.MID_FREQUENCY, preset.mid, this.mlf);
    this.setFilter(this.mhf, 'peaking', EqualizerService.MID_HIGH_FREQUENCY, preset.midHigh, this.mf);
    this.setFilter(this.hf, 'highshelf', EqualizerService.HIGH_FREQUENCY, preset.high, this.mhf);
  };

  public getPresetType = (): PresetTypes => {
    const type: any = storageService.get(EqualizerService.PRESET_KEY);
    return type ? type : Presets.FLAT.type;
  };

  public savePresetType = (type: PresetTypes): void => {
    storageService.save(EqualizerService.PRESET_KEY, type);
  };

  public getMaxGain = (): number => {
    return EqualizerService.MAX_GAIN;
  };

  public getMinGain = (): number => {
    return EqualizerService.MIN_GAIN;
  };

  public applyPreset = (preset: Preset): void => {
    this.setFilter(this.lf, 'lowshelf', EqualizerService.LOW_FREQUENCY, preset.low);
    this.setFilter(this.mlf, 'peaking', EqualizerService.MID_LOW_FREQUENCY, preset.midLow);
    this.setFilter(this.mf, 'peaking', EqualizerService.MID_FREQUENCY, preset.mid);
    this.setFilter(this.mhf, 'peaking', EqualizerService.MID_HIGH_FREQUENCY, preset.midHigh);
    this.setFilter(this.hf, 'highshelf', EqualizerService.HIGH_FREQUENCY, preset.high);
  };

  private setFilter = (filter: BiquadFilterNode, type: BiquadFilterType,
                       frequency: number, gain: number, destination?: any): void => {
    filter.type = type;
    filter.frequency.value = frequency;
    filter.gain.value = gain;
    if (destination) {
      filter.connect(destination);
    }
  };
}

export const equalizerService: EqualizerService = new EqualizerService();
