import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './levantamento.reducer';
import { ILevantamento } from 'app/shared/model/levantamento.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ILevantamentoUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ILevantamentoUpdateState {
  isNew: boolean;
}

export class LevantamentoUpdate extends React.Component<ILevantamentoUpdateProps, ILevantamentoUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
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
  }

  saveEntity = (event, errors, values) => {
    values.dataCriacao = convertDateTimeToServer(values.dataCriacao);

    if (errors.length === 0) {
      const { levantamentoEntity } = this.props;
      const entity = {
        ...levantamentoEntity,
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
    this.props.history.push('/entity/levantamento');
  };

  render() {
    const { levantamentoEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="coreIntelligenceDataApp.levantamento.home.createOrEditLabel">
              <Translate contentKey="coreIntelligenceDataApp.levantamento.home.createOrEditLabel">Create or edit a Levantamento</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : levantamentoEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="levantamento-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="levantamento-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="nomeLabel" for="levantamento-nome">
                    <Translate contentKey="coreIntelligenceDataApp.levantamento.nome">Nome</Translate>
                  </Label>
                  <AvField id="levantamento-nome" type="text" name="nome" />
                </AvGroup>
                <AvGroup>
                  <Label id="descricaoLabel" for="levantamento-descricao">
                    <Translate contentKey="coreIntelligenceDataApp.levantamento.descricao">Descricao</Translate>
                  </Label>
                  <AvField id="levantamento-descricao" type="text" name="descricao" />
                </AvGroup>
                <AvGroup>
                  <Label id="dataCriacaoLabel" for="levantamento-dataCriacao">
                    <Translate contentKey="coreIntelligenceDataApp.levantamento.dataCriacao">Data Criacao</Translate>
                  </Label>
                  <AvInput
                    id="levantamento-dataCriacao"
                    type="datetime-local"
                    className="form-control"
                    name="dataCriacao"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.levantamentoEntity.dataCriacao)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="usuarioCriacaoLabel" for="levantamento-usuarioCriacao">
                    <Translate contentKey="coreIntelligenceDataApp.levantamento.usuarioCriacao">Usuario Criacao</Translate>
                  </Label>
                  <AvField id="levantamento-usuarioCriacao" type="text" name="usuarioCriacao" />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/levantamento" replace color="info">
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
  levantamentoEntity: storeState.levantamento.entity,
  loading: storeState.levantamento.loading,
  updating: storeState.levantamento.updating,
  updateSuccess: storeState.levantamento.updateSuccess
});

const mapDispatchToProps = {
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
)(LevantamentoUpdate);
