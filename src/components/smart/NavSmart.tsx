import { AxiosResponse } from 'axios';
import { Nav } from 'components/dumb';
import * as React from 'react';
import { ReactNode } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { audioService, authService } from 'services';
import { Actions, ActionTypes } from 'store/actions';

interface ThisProps {
  getAudios?: (query: string) => any;
  logout?: () => any;
}

const mapDispatch2Props = (dispatch: Dispatch<ActionTypes>) => {
  return {
    getAudios: (query: string) => {
      audioService.getAll(query).then((res: AxiosResponse) => {
        dispatch(Actions.getAudios(res.data));
      });
    },
    logout: () => {
      authService.logout();
      dispatch(Actions.logout());
    }
  };
};

class NavSmart extends React.Component<ThisProps> {

  public constructor(props: ThisProps) {
    super(props);
    this.props.getAudios!('');
  }

  public render(): ReactNode {
    return <Nav onSearchQueryChange={this.handleSearchQueryChange}
                onLogoutClick={this.handleLogoutClick}/>;
  }

  private handleSearchQueryChange = (e: any): void => this.props.getAudios!(e.target.value);

  private handleLogoutClick = (): void => {
    this.props.logout!();
  };
}

export default connect(null, mapDispatch2Props)(NavSmart);
