export enum PresetTypes {
  FLAT = 'FLAT',
  TREBLE_BOOST = 'TREBLE_BOOST',
  BASS_BOOST = 'BASS_BOOST',
  HEADPHONES = 'HEADPHONES',
  LAPTOP = 'LAPTOP',
  PORTABLE_SPEAKERS = 'PORTABLE_SPEAKERS',
  HOME_STEREO = 'HOME_STEREO',
  TV = 'TV',
  CAR = 'CAR',
  CUSTOM = 'CUSTOM'
}

export interface Preset {
  type: PresetTypes;
  label: string;
  low: number;
  midLow: number;
  mid: number;
  midHigh: number;
  high: number;
}

export const Presets: {[key in PresetTypes]: Preset} = {
  [PresetTypes.FLAT]: {
    type: PresetTypes.FLAT,
    label: 'Flat',
    low: 0,
    midLow: 0,
    mid: 0,
    midHigh: 0,
    high: 0
  },
  [PresetTypes.TREBLE_BOOST]: {
    type: PresetTypes.TREBLE_BOOST,
    label: 'Treble Boost',
    low: 0,
    midLow: 0,
    mid: 2,
    midHigh: 12,
    high: 16
  },
  [PresetTypes.BASS_BOOST]: {
    type: PresetTypes.BASS_BOOST,
    label: 'Bass Boost',
    low: 16,
    midLow: 10,
    mid: 2,
    midHigh: 0,
    high: 0
  },
  [PresetTypes.HEADPHONES]: {
    type: PresetTypes.HEADPHONES,
    label: 'Headphones',
    low: 16,
    midLow: 8,
    mid: 2,
    midHigh: 6,
    high: 14
  },
  [PresetTypes.LAPTOP]: {
    type: PresetTypes.LAPTOP,
    label: 'Laptop',
    low: 12,
    midLow: 12,
    mid: 6,
    midHigh: 10,
    high: 12
  },
  [PresetTypes.PORTABLE_SPEAKERS]: {
    type: PresetTypes.PORTABLE_SPEAKERS,
    label: 'Portable Speakers',
    low: 18,
    midLow: 12,
    mid: 8,
    midHigh: 12,
    high: 14
  },
  [PresetTypes.HOME_STEREO]: {
    type: PresetTypes.HOME_STEREO,
    label: 'Home Stereo',
    low: 12,
    midLow: 8,
    mid: 4,
    midHigh: 8,
    high: 12
  },
  [PresetTypes.TV]: {
    type: PresetTypes.TV,
    label: 'TV',
    low: 3,
    midLow: 10,
    mid: -2,
    midHigh: 8,
    high: 11
  },
  [PresetTypes.CAR]: {
    type: PresetTypes.CAR,
    label: 'Car',
    low: 18,
    midLow: 6,
    mid: 0,
    midHigh: 6,
    high: 14
  },
  [PresetTypes.CUSTOM]: {
    type: PresetTypes.CUSTOM,
    label: 'Custom',
    low: 0,
    midLow: 0,
    mid: 0,
    midHigh: 0,
    high: 0
  }
};
