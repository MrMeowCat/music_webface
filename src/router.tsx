import { GuardRoute } from 'components/smart';
import { HomePage, LoginPage, NotFoundPage } from 'pages';
import * as React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

export const AppRouter: React.StatelessComponent<{}> = () => {
  return (
    <HashRouter>
      <Switch>
        <GuardRoute exact={true} path="/" component={HomePage} />
        <Route exact={true} path="/login" component={LoginPage} />
        <Route component={NotFoundPage}/>
      </Switch>
    </HashRouter>
  );
};
