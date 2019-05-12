import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Empreendimento from './empreendimento';
import EmpreendimentoDetail from './empreendimento-detail';
import EmpreendimentoUpdate from './empreendimento-update';
import EmpreendimentoDeleteDialog from './empreendimento-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={EmpreendimentoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={EmpreendimentoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={EmpreendimentoDetail} />
      <ErrorBoundaryRoute path={match.url} component={Empreendimento} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={EmpreendimentoDeleteDialog} />
  </>
);

export default Routes;
