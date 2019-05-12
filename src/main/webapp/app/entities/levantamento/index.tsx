import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Levantamento from './levantamento';
import LevantamentoDetail from './levantamento-detail';
import LevantamentoUpdate from './levantamento-update';
import LevantamentoDeleteDialog from './levantamento-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={LevantamentoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={LevantamentoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={LevantamentoDetail} />
      <ErrorBoundaryRoute path={match.url} component={Levantamento} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={LevantamentoDeleteDialog} />
  </>
);

export default Routes;
