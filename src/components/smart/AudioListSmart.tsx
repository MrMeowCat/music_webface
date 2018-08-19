import { AudioList } from 'components/dumb';
import { Audio } from 'models';
import * as React from 'react';
import { ReactNode } from 'react';
import { connect } from 'react-redux';
import { State } from 'store/states';

interface ThisProps {
  audios?: Audio[];
}

const mapState2Props = (state: State) => {
  return {
    audios: state.audioListState.audios
  }
};

class AudioListSmart extends React.Component<ThisProps> {

  public render(): ReactNode {
    return <AudioList audios={this.props.audios!}/>;
  }
}

export default connect(mapState2Props, null)(AudioListSmart);
