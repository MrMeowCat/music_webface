import 'components/dumb/Equalizer.css';
import { Preset } from 'models';
import * as React from 'react';
import { ReactNode } from 'react';
import Select from 'react-select';
import * as ReactSlider from 'react-slider';

interface ThisProps {
  visible: boolean;
  presets: Preset[],
  preset: Preset;
  maxGain: number;
  minGain: number;
  onEqualizerWrapperShow: () => any;
  onEqualizerWrapperHide: () => any;
  onPresetChange: (select: {label: string, value: Preset}) => any;
  onLowChange: (gain: number) => any;
  onMidLowChange: (gain: number) => any;
  onMidChange: (gain: number) => any;
  onMidHighChange: (gain: number) => any;
  onHighChange: (gain: number) => any;
}

export class Equalizer extends React.Component<ThisProps> {

  public componentWillUpdate(): void {
    // trigger resize to fix buggy slider bars
    window.dispatchEvent(new Event('resize'));
  }

  public componentDidMount(): void {
    window.addEventListener('keyup', this.handleWindowKeyup);
  }

  public componentWillUnmount(): void {
    window.removeEventListener('keyup', this.handleWindowKeyup);
  }

  public render(): ReactNode {
    const options: any = this.props.presets.map((preset: Preset) => {
      return {
        value: preset,
        label: preset.label
      };
    });
    const value: any = {
      value: this.props.preset,
      label: this.props.preset.label
    };
    return (
      <React.Fragment>
        <button className={'nav-btn'} onClick={this.props.onEqualizerWrapperShow}>
          <i className={'fas fa-cog'}/>
        </button>
        <div className={'wrapper equalizer-wrapper'}
             style={{display: this.props.visible ? 'flex' : 'none'}}
             onClick={this.hideEqualizerWrapper}>
          <div className={'form equalizer'}>
            <div className={'form-header flex-b p20'}>
              <p>Equalizer</p>
              <button onClick={this.hideEqualizerWrapper}>
                <i className={'fas fa-times'}/>
              </button>
            </div>
            <div className={'form-body p20'}>
              <div className={'select-wrapper mb30'}>
                <Select options={options}
                        value={value}
                        isSearchable={false}
                        isMulti={false}
                        isClearable={false}
                        classNamePrefix={'s'}
                        onChange={this.props.onPresetChange}
                />
              </div>
              <div className={'flex'}>
                <div className={'scale flex-col-m flex-b'}>
                  <p>+{this.props.maxGain}</p>
                  <p>0</p>
                  <p>{this.props.minGain}</p>
                </div>
                <div className={'filters'}>
                  <div>
                    <p>Low</p>
                    <ReactSlider withBars={true}
                                 orientation={'vertical'}
                                 value={this.props.preset.low}
                                 min={this.props.minGain}
                                 max={this.props.maxGain}
                                 step={0.5}
                                 invert={true}
                                 className={'slider slider-eq'}
                                 onChange={this.props.onLowChange}
                    />
                  </div>
                  <div>
                    <p>Mid Low</p>
                    <ReactSlider withBars={true}
                                 orientation={'vertical'}
                                 value={this.props.preset.midLow}
                                 min={this.props.minGain}
                                 max={this.props.maxGain}
                                 step={0.5}
                                 invert={true}
                                 className={'slider slider-eq'}
                                 onChange={this.props.onMidLowChange}
                    />
                  </div>
                  <div>
                    <p>Mid</p>
                    <ReactSlider withBars={true}
                                 orientation={'vertical'}
                                 value={this.props.preset.mid}
                                 min={this.props.minGain}
                                 max={this.props.maxGain}
                                 step={0.5}
                                 invert={true}
                                 className={'slider slider-eq'}
                                 onChange={this.props.onMidChange}
                    />
                  </div>
                  <div>
                    <p>Mid High</p>
                    <ReactSlider withBars={true}
                                 orientation={'vertical'}
                                 value={this.props.preset.midHigh}
                                 min={this.props.minGain}
                                 max={this.props.maxGain}
                                 step={0.5}
                                 invert={true}
                                 className={'slider slider-eq'}
                                 onChange={this.props.onMidHighChange}
                    />
                  </div>
                  <div>
                    <p>High</p>
                    <ReactSlider withBars={true}
                                 orientation={'vertical'}
                                 value={this.props.preset.high}
                                 min={this.props.minGain}
                                 max={this.props.maxGain}
                                 step={0.5}
                                 invert={true}
                                 className={'slider slider-eq'}
                                 onChange={this.props.onHighChange}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className={'form-footer flex p20'}>
              <button className={'cancel-btn'} onClick={this.props.onEqualizerWrapperHide}>Cancel</button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }

  private hideEqualizerWrapper = (e: any): void => {
    const tagName: string = e.target.tagName.toLowerCase();
    if (e.target.classList.contains('equalizer-wrapper') || tagName === 'button' || tagName === 'i') {
      this.props.onEqualizerWrapperHide();
    }
  };

  private handleWindowKeyup = (e: KeyboardEvent): void => {
    if (e.code === 'Escape') {
      this.props.onEqualizerWrapperHide();
    }
  };
}
