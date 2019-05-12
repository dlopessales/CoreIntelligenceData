import React from 'react';
import { Switch } from 'react-router-dom';

// tslint:disable-next-line:no-unused-variable
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Levantamento from './levantamento';
import Premissa from './premissa';
import Empreendimento from './empreendimento';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}/levantamento`} component={Levantamento} />
      <ErrorBoundaryRoute path={`${match.url}/premissa`} component={Premissa} />
      <ErrorBoundaryRoute path={`${match.url}/empreendimento`} component={Empreendimento} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
