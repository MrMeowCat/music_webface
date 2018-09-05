import { AudioList } from 'components/dumb';
import { Audio } from 'models';
import * as React from 'react';
import { ReactNode } from 'react';
import { connect } from 'react-redux';
import { State } from 'store/states';

interface ThisProps {
  audios?: Audio[];
  activeAudio?: Audio;
  spinner?: boolean;
}

const mapState2Props = (state: State) => {
  return {
    audios: state.audioListState.audios,
    spinner: state.audioListState.spinner
  }
};

class AudioListSmart extends React.Component<ThisProps> {

  public render(): ReactNode {
    return <AudioList audios={this.props.audios!}
                      activeAudio={this.props.activeAudio!}
                      spinner={this.props.spinner!}
                      onItemPlayClick={this.handleItemPlayClick}/>;
  }

  private handleItemPlayClick = (audio: Audio): void => {
    console.log(audio);
  };
}

export default connect(mapState2Props, null)(AudioListSmart);
