import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Premissa from './premissa';
import PremissaDetail from './premissa-detail';
import PremissaUpdate from './premissa-update';
import PremissaDeleteDialog from './premissa-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PremissaUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PremissaUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PremissaDetail} />
      <ErrorBoundaryRoute path={match.url} component={Premissa} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={PremissaDeleteDialog} />
  </>
);

export default Routes;
