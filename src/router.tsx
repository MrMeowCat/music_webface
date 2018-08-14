import { HomePage, LoginPage } from 'pages';
import * as React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

export const AppRouter: React.StatelessComponent<{}> = () => {
  return (
    <HashRouter>
      <Switch>
        <Route exact={true} path="/" component={HomePage} />
        <Route exact={true} path="/login" component={LoginPage} />
      </Switch>
    </HashRouter>
  );
};
