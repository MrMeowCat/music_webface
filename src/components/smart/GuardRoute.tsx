import * as React from 'react';
import { ReactNode } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router';
import { State } from 'store/states';

const mapState2Props = (state: State) => {
  return {
    loggedIn: state.authState.loggedIn
  };
};

const GuardRoute: React.StatelessComponent<any> = ({component: Component, loggedIn, ...rest}) => {
  const renderByProps = (props: any): ReactNode => (
    loggedIn ?
      <Component {...props}/> :
      <Redirect to={'/login'}/>
  );
  return <Route {...rest} render={renderByProps}/>;
};

export default connect(mapState2Props)(GuardRoute);
