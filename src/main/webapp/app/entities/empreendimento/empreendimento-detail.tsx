import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './empreendimento.reducer';
import { IEmpreendimento } from 'app/shared/model/empreendimento.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEmpreendimentoDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class EmpreendimentoDetail extends React.Component<IEmpreendimentoDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { empreendimentoEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="coreIntelligenceDataApp.empreendimento.detail.title">Empreendimento</Translate> [
            <b>{empreendimentoEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="nome">
                <Translate contentKey="coreIntelligenceDataApp.empreendimento.nome">Nome</Translate>
              </span>
            </dt>
            <dd>{empreendimentoEntity.nome}</dd>
            <dt>
              <span id="rua">
                <Translate contentKey="coreIntelligenceDataApp.empreendimento.rua">Rua</Translate>
              </span>
            </dt>
            <dd>{empreendimentoEntity.rua}</dd>
            <dt>
              <span id="numero">
                <Translate contentKey="coreIntelligenceDataApp.empreendimento.numero">Numero</Translate>
              </span>
            </dt>
            <dd>{empreendimentoEntity.numero}</dd>
            <dt>
              <span id="bairro">
                <Translate contentKey="coreIntelligenceDataApp.empreendimento.bairro">Bairro</Translate>
              </span>
            </dt>
            <dd>{empreendimentoEntity.bairro}</dd>
            <dt>
              <span id="cidade">
                <Translate contentKey="coreIntelligenceDataApp.empreendimento.cidade">Cidade</Translate>
              </span>
            </dt>
            <dd>{empreendimentoEntity.cidade}</dd>
            <dt>
              <span id="construtoraEmpreendedora">
                <Translate contentKey="coreIntelligenceDataApp.empreendimento.construtoraEmpreendedora">
                  Construtora Empreendedora
                </Translate>
              </span>
            </dt>
            <dd>{empreendimentoEntity.construtoraEmpreendedora}</dd>
            <dt>
              <span id="quantidadeQuartos">
                <Translate contentKey="coreIntelligenceDataApp.empreendimento.quantidadeQuartos">Quantidade Quartos</Translate>
              </span>
            </dt>
            <dd>{empreendimentoEntity.quantidadeQuartos}</dd>
            <dt>
              <span id="inicioComercializacao">
                <Translate contentKey="coreIntelligenceDataApp.empreendimento.inicioComercializacao">Inicio Comercializacao</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={empreendimentoEntity.inicioComercializacao} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="entregaUnidade">
                <Translate contentKey="coreIntelligenceDataApp.empreendimento.entregaUnidade">Entrega Unidade</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={empreendimentoEntity.entregaUnidade} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="faseObra">
                <Translate contentKey="coreIntelligenceDataApp.empreendimento.faseObra">Fase Obra</Translate>
              </span>
            </dt>
            <dd>{empreendimentoEntity.faseObra}</dd>
            <dt>
              <span id="tipoUnidade">
                <Translate contentKey="coreIntelligenceDataApp.empreendimento.tipoUnidade">Tipo Unidade</Translate>
              </span>
            </dt>
            <dd>{empreendimentoEntity.tipoUnidade}</dd>
            <dt>
              <span id="quantidadeUnidades">
                <Translate contentKey="coreIntelligenceDataApp.empreendimento.quantidadeUnidades">Quantidade Unidades</Translate>
              </span>
            </dt>
            <dd>{empreendimentoEntity.quantidadeUnidades}</dd>
            <dt>
              <span id="quantidadeUnidadesVendidas">
                <Translate contentKey="coreIntelligenceDataApp.empreendimento.quantidadeUnidadesVendidas">
                  Quantidade Unidades Vendidas
                </Translate>
              </span>
            </dt>
            <dd>{empreendimentoEntity.quantidadeUnidadesVendidas}</dd>
            <dt>
              <span id="estoque">
                <Translate contentKey="coreIntelligenceDataApp.empreendimento.estoque">Estoque</Translate>
              </span>
            </dt>
            <dd>{empreendimentoEntity.estoque}</dd>
            <dt>
              <span id="percentualVendido">
                <Translate contentKey="coreIntelligenceDataApp.empreendimento.percentualVendido">Percentual Vendido</Translate>
              </span>
            </dt>
            <dd>{empreendimentoEntity.percentualVendido}</dd>
            <dt>
              <span id="precoMedio">
                <Translate contentKey="coreIntelligenceDataApp.empreendimento.precoMedio">Preco Medio</Translate>
              </span>
            </dt>
            <dd>{empreendimentoEntity.precoMedio}</dd>
            <dt>
              <span id="areaUnidade">
                <Translate contentKey="coreIntelligenceDataApp.empreendimento.areaUnidade">Area Unidade</Translate>
              </span>
            </dt>
            <dd>{empreendimentoEntity.areaUnidade}</dd>
            <dt>
              <span id="formaPagamento">
                <Translate contentKey="coreIntelligenceDataApp.empreendimento.formaPagamento">Forma Pagamento</Translate>
              </span>
            </dt>
            <dd>{empreendimentoEntity.formaPagamento}</dd>
            <dt>
              <span id="caracterizacaoAreaLazer">
                <Translate contentKey="coreIntelligenceDataApp.empreendimento.caracterizacaoAreaLazer">Caracterizacao Area Lazer</Translate>
              </span>
            </dt>
            <dd>{empreendimentoEntity.caracterizacaoAreaLazer}</dd>
            <dt>
              <span id="infrestruturaSeguranca">
                <Translate contentKey="coreIntelligenceDataApp.empreendimento.infrestruturaSeguranca">Infrestrutura Seguranca</Translate>
              </span>
            </dt>
            <dd>{empreendimentoEntity.infrestruturaSeguranca}</dd>
            <dt>
              <span id="nivelAcabamento">
                <Translate contentKey="coreIntelligenceDataApp.empreendimento.nivelAcabamento">Nivel Acabamento</Translate>
              </span>
            </dt>
            <dd>{empreendimentoEntity.nivelAcabamento}</dd>
            <dt>
              <Translate contentKey="coreIntelligenceDataApp.empreendimento.levantamento">Levantamento</Translate>
            </dt>
            <dd>{empreendimentoEntity.levantamento ? empreendimentoEntity.levantamento.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/empreendimento" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/empreendimento/${empreendimentoEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ empreendimento }: IRootState) => ({
  empreendimentoEntity: empreendimento.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmpreendimentoDetail);
