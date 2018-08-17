import * as React from 'react';
import { ReactNode } from 'react';
import { Redirect, Route } from 'react-router';
import { authService } from 'services';

export const GuardRoute: React.StatelessComponent<any> = ({component: Component, ...rest}) => {
  const token: string = authService.getToken();
  const renderByProps = (props: any): ReactNode => (
    token ?
      <Component {...props}/> :
      <Redirect to={'/login'}/>
  );
  return <Route {...rest} render={renderByProps}/>;
};
