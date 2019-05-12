import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ILevantamento } from 'app/shared/model/levantamento.model';
import { getEntities as getLevantamentos } from 'app/entities/levantamento/levantamento.reducer';
import { getEntity, updateEntity, createEntity, reset } from './premissa.reducer';
import { IPremissa } from 'app/shared/model/premissa.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPremissaUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IPremissaUpdateState {
  isNew: boolean;
  levantamentoId: string;
}

export class PremissaUpdate extends React.Component<IPremissaUpdateProps, IPremissaUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      levantamentoId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getLevantamentos();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { premissaEntity } = this.props;
      const entity = {
        ...premissaEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/premissa');
  };

  render() {
    const { premissaEntity, levantamentos, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="coreIntelligenceDataApp.premissa.home.createOrEditLabel">
              <Translate contentKey="coreIntelligenceDataApp.premissa.home.createOrEditLabel">Create or edit a Premissa</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : premissaEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="premissa-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="premissa-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="descricaoLabel" for="premissa-descricao">
                    <Translate contentKey="coreIntelligenceDataApp.premissa.descricao">Descricao</Translate>
                  </Label>
                  <AvField id="premissa-descricao" type="text" name="descricao" />
                </AvGroup>
                <AvGroup>
                  <Label for="premissa-levantamento">
                    <Translate contentKey="coreIntelligenceDataApp.premissa.levantamento">Levantamento</Translate>
                  </Label>
                  <AvInput id="premissa-levantamento" type="select" className="form-control" name="levantamento.id">
                    <option value="" key="0" />
                    {levantamentos
                      ? levantamentos.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/premissa" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  levantamentos: storeState.levantamento.entities,
  premissaEntity: storeState.premissa.entity,
  loading: storeState.premissa.loading,
  updating: storeState.premissa.updating,
  updateSuccess: storeState.premissa.updateSuccess
});

const mapDispatchToProps = {
  getLevantamentos,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PremissaUpdate);
