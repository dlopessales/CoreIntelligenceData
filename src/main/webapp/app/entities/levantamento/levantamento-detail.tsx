import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './levantamento.reducer';
import { ILevantamento } from 'app/shared/model/levantamento.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ILevantamentoDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class LevantamentoDetail extends React.Component<ILevantamentoDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { levantamentoEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="coreIntelligenceDataApp.levantamento.detail.title">Levantamento</Translate> [
            <b>{levantamentoEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="nome">
                <Translate contentKey="coreIntelligenceDataApp.levantamento.nome">Nome</Translate>
              </span>
            </dt>
            <dd>{levantamentoEntity.nome}</dd>
            <dt>
              <span id="descricao">
                <Translate contentKey="coreIntelligenceDataApp.levantamento.descricao">Descricao</Translate>
              </span>
            </dt>
            <dd>{levantamentoEntity.descricao}</dd>
            <dt>
              <span id="dataCriacao">
                <Translate contentKey="coreIntelligenceDataApp.levantamento.dataCriacao">Data Criacao</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={levantamentoEntity.dataCriacao} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="usuarioCriacao">
                <Translate contentKey="coreIntelligenceDataApp.levantamento.usuarioCriacao">Usuario Criacao</Translate>
              </span>
            </dt>
            <dd>{levantamentoEntity.usuarioCriacao}</dd>
          </dl>
          <Button tag={Link} to="/entity/levantamento" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/levantamento/${levantamentoEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ levantamento }: IRootState) => ({
  levantamentoEntity: levantamento.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LevantamentoDetail);
