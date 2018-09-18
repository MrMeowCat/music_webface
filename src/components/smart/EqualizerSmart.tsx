import { Equalizer } from 'components/dumb';
import { Preset, Presets, PresetTypes } from 'models';
import * as React from 'react';
import { ReactNode } from 'react';
import { equalizerService } from 'services/equalizer.service';

interface ThisState {
  visible: boolean;
  presets: Preset[],
  preset: Preset;
}

export default class EqualizerSmart extends React.Component<{}, ThisState> {

  public constructor(props: {}) {
    super(props);
    this.state = {
      visible: false,
      presets: [
        Presets.FLAT,
        Presets.TREBLE_BOOST,
        Presets.BASS_BOOST,
        Presets.HEADPHONES,
        Presets.LAPTOP,
        Presets.PORTABLE_SPEAKERS,
        Presets.HOME_STEREO,
        Presets.TV,
        Presets.CAR,
        Presets.CUSTOM
      ],
      preset: Presets[equalizerService.getPresetType()]
    };
    equalizerService.init(this.state.preset);
  }

  public render(): ReactNode {
    return (
      <Equalizer visible={this.state.visible}
                 presets={this.state.presets}
                 preset={this.state.preset}
                 maxGain={equalizerService.getMaxGain()}
                 minGain={equalizerService.getMinGain()}
                 onEqualizerWrapperShow={this.handleEqualizerWrapperShow}
                 onEqualizerWrapperHide={this.handleEqualizerWrapperHide}
                 onPresetChange={this.handlePresetChange}
                 onLowChange={this.handleLowChange}
                 onMidLowChange={this.handleMidLowChange}
                 onMidChange={this.handleMidChange}
                 onMidHighChange={this.handleMidHighChange}
                 onHighChange={this.handleHighChange}
      />
    );
  }

  private handleEqualizerWrapperShow = (): void => {
    this.setState({visible: true});
  };

  private handleEqualizerWrapperHide = (): void => {
    this.setState({visible: false});
    equalizerService.savePresetType(this.state.preset.type);
  };

  private handlePresetChange = (select: {label: string, value: Preset}): void => {
    this.setState({preset: select.value}, () => equalizerService.applyPreset(this.state.preset));
  };

  private handleLowChange = (gain: number): void => {
    const preset: Preset = Presets[PresetTypes.CUSTOM];
    this.assignValue(preset, 'low', gain);
    this.setState({preset}, () => equalizerService.applyPreset(this.state.preset));
  };

  private handleMidLowChange = (gain: number): void => {
    const preset: Preset = Presets[PresetTypes.CUSTOM];
    this.assignValue(preset, 'midLow', gain);
    this.setState({preset}, () => equalizerService.applyPreset(this.state.preset));
  };

  private handleMidChange = (gain: number): void => {
    const preset: Preset = Presets[PresetTypes.CUSTOM];
    this.assignValue(preset, 'mid', gain);
    this.setState({preset}, () => equalizerService.applyPreset(this.state.preset));
  };

  private handleMidHighChange = (gain: number): void => {
    const preset: Preset = Presets[PresetTypes.CUSTOM];
    this.assignValue(preset, 'midHigh', gain);
    this.setState({preset}, () => equalizerService.applyPreset(this.state.preset));
  };

  private handleHighChange = (gain: number): void => {
    const preset: Preset = Presets[PresetTypes.CUSTOM];
    this.assignValue(preset, 'high', gain);
    this.setState({preset}, () => equalizerService.applyPreset(this.state.preset));
  };

  private assignValue = (preset: Preset, key: string, value: number): void => {
    for (const property in preset) {
      if (typeof preset[property] === 'number') {
        preset[property] = this.state.preset[property];
      }
    }
    if ((preset as object).hasOwnProperty(key)) {
      preset[key] = value;
    }
  };
}
