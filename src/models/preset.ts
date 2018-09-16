export enum PresetTypes {
  FLAT = 'FLAT',
  // TREBLE_BOOST = 'TREBLE_BOOST',
  // BASS_BOOST = 'BASS_BOOST',
  // HEADPHONES = 'HEADPHONES',
  // LAPTOP = 'LAPTOP',
  // PORTABLE_SPEAKERS = 'PORTABLE_SPEAKERS',
  // HOME_STEREO = 'HOME_STEREO',
  // TV = 'TV',
  // CAR = 'CAR',
  CUSTOM = 'CUSTOM'
}

export interface Preset {
  type: PresetTypes;
  low: number;
  midLow: number;
  mid: number;
  midHigh: number;
  high: number;
}

export const DefaultPresets: {[key in PresetTypes]: Preset} = {
  [PresetTypes.FLAT]: {
    type: PresetTypes.FLAT,
    low: 0,
    midLow: 0,
    mid: 0,
    midHigh: 0,
    high: 0
  },
  [PresetTypes.CUSTOM]: {
    type: PresetTypes.CUSTOM,
    low: 0,
    midLow: 0,
    mid: 0,
    midHigh: 0,
    high: 0
  }
};
