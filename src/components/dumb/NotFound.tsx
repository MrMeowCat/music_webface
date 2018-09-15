import 'components/dumb/NotFound.css';
import * as React from 'react';
import { ReactElement } from 'react';

export const NotFound: React.StatelessComponent = (): ReactElement<{}> => (
  <div className={'not-found flex-col-m'}>
    <h1>Page Not Found...</h1>
    <a onClick={goBack}>Go back</a>
  </div>
);

const goBack = (): void => {
  window.history.back();
};
