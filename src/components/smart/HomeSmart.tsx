import { Home } from 'components/dumb';
import * as React from 'react';
import { ReactNode } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { authService } from 'services';
import { Actions, ActionTypes } from 'store/actions';

interface ThisProps {
  logout: () => any;
}

const mapDispatch2Props = (dispatch: Dispatch<ActionTypes>) => {
  return {
    logout: () => dispatch(Actions.logout())
  };
};

class HomeSmart extends React.Component<ThisProps> {

  public constructor(props: ThisProps) {
    super(props);
  }

  public render(): ReactNode {
    return <Home onLogoutClick={this.handleLogoutClick}/>;
  }

  private handleLogoutClick = (): void => {
    authService.logout();
    this.props.logout();
  };
}

export default connect(null, mapDispatch2Props)(HomeSmart);
