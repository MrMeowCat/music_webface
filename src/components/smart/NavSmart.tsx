import { AxiosError, AxiosResponse } from 'axios';
import { Nav } from 'components/dumb';
import { Audio } from 'models';
import * as React from 'react';
import { ReactNode } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { audioService, authService, SearchResult } from 'services';
import { Actions, ActionTypes } from 'store/actions';
import { State } from 'store/states';

interface ThisProps {
  audios?: Audio[];
  getAudios?: () => any;
  searchAudios?: (audios: Audio[], query: string) => any;
  logout?: () => any;
}

const mapState2Props: any = (state: State): any => {
  return {
    audios: state.audioListState.audios
  }
};

const mapDispatch2Props: any = (dispatch: Dispatch<ActionTypes>): any => {
  const searchAudios = (audios: Audio[], query: string) => {
    audioService.searchAudios(audios, query).then((result: SearchResult) => {
      dispatch(Actions.searchAudios(result));
    });
  };
  return {
    getAudios: () => {
      dispatch(Actions.showSpinner(true));
      audioService.getAll().then((res: AxiosResponse) => {
        dispatch(Actions.getAudios(res.data));
        searchAudios(res.data, '');
        dispatch(Actions.showSpinner(false));
      }).catch((err: AxiosError) => {
        dispatch(Actions.showSpinner(false));
      });
    },
    searchAudios,
    logout: () => {
      authService.logout();
      dispatch(Actions.logout());
    }
  };
};

class NavSmart extends React.Component<ThisProps> {

  public constructor(props: ThisProps) {
    super(props);
    this.props.getAudios!();
  }

  public render(): ReactNode {
    return <Nav onSearchQueryChange={this.handleSearchQueryChange}
                onLogoutClick={this.handleLogoutClick}/>;
  }

  private handleSearchQueryChange = (e: any): void => {
    e.persist();
    this.props.searchAudios!(this.props.audios!, e.target.value);
  };

  private handleLogoutClick = (): void => {
    this.props.logout!();
  };
}

export default connect(mapState2Props, mapDispatch2Props)(NavSmart);
