import { Equalizer } from 'components/dumb';
import { Preset, PresetTypes } from 'models';
import * as React from 'react';
import { ReactNode } from 'react';
import { equalizerService } from 'services/equalizer.service';

interface ThisState {
  visible: boolean;
  preset: Preset;
}

export default class EqualizerSmart extends React.Component<{}, ThisState> {

  public constructor(props: {}) {
    super(props);
    this.state = {
      visible: false,
      preset: equalizerService.getPreset()
    };
    equalizerService.init(this.state.preset);
  }

  public render(): ReactNode {
    return (
      <Equalizer visible={this.state.visible}
                 preset={this.state.preset}
                 maxGain={equalizerService.getMaxGain()}
                 minGain={equalizerService.getMinGain()}
                 onEqualizerWrapperShow={this.handleEqualizerWrapperShow}
                 onEqualizerWrapperHide={this.handleEqualizerWrapperHide}
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
    equalizerService.savePreset(this.state.preset);
  };

  private handleLowChange = (gain: number): void => {
    this.setState({
      preset: {
        ...this.state.preset,
        type: PresetTypes.CUSTOM,
        low: gain
      }
    }, () => equalizerService.applyPreset(this.state.preset));
  };

  private handleMidLowChange = (gain: number): void => {
    this.setState({
      preset: {
        ...this.state.preset,
        type: PresetTypes.CUSTOM,
        midLow: gain
      }
    }, () => equalizerService.applyPreset(this.state.preset));
  };

  private handleMidChange = (gain: number): void => {
    this.setState({
      preset: {
        ...this.state.preset,
        type: PresetTypes.CUSTOM,
        mid: gain
      }
    }, () => equalizerService.applyPreset(this.state.preset));
  };

  private handleMidHighChange = (gain: number): void => {
    this.setState({
      preset: {
        ...this.state.preset,
        type: PresetTypes.CUSTOM,
        midHigh: gain
      }
    }, () => equalizerService.applyPreset(this.state.preset));
  };

  private handleHighChange = (gain: number): void => {
    this.setState({
      preset: {
        ...this.state.preset,
        type: PresetTypes.CUSTOM,
        high: gain
      }
    }, () => equalizerService.applyPreset(this.state.preset));
  };
}
