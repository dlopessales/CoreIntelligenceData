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
import { getEntity, updateEntity, createEntity, reset } from './empreendimento.reducer';
import { IEmpreendimento } from 'app/shared/model/empreendimento.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IEmpreendimentoUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IEmpreendimentoUpdateState {
  isNew: boolean;
  levantamentoId: string;
}

export class EmpreendimentoUpdate extends React.Component<IEmpreendimentoUpdateProps, IEmpreendimentoUpdateState> {
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
    values.inicioComercializacao = convertDateTimeToServer(values.inicioComercializacao);
    values.entregaUnidade = convertDateTimeToServer(values.entregaUnidade);

    if (errors.length === 0) {
      const { empreendimentoEntity } = this.props;
      const entity = {
        ...empreendimentoEntity,
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
    this.props.history.push('/entity/empreendimento');
  };

  render() {
    const { empreendimentoEntity, levantamentos, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="coreIntelligenceDataApp.empreendimento.home.createOrEditLabel">
              <Translate contentKey="coreIntelligenceDataApp.empreendimento.home.createOrEditLabel">
                Create or edit a Empreendimento
              </Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : empreendimentoEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="empreendimento-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="empreendimento-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="nomeLabel" for="empreendimento-nome">
                    <Translate contentKey="coreIntelligenceDataApp.empreendimento.nome">Nome</Translate>
                  </Label>
                  <AvField id="empreendimento-nome" type="text" name="nome" />
                </AvGroup>
                <AvGroup>
                  <Label id="ruaLabel" for="empreendimento-rua">
                    <Translate contentKey="coreIntelligenceDataApp.empreendimento.rua">Rua</Translate>
                  </Label>
                  <AvField id="empreendimento-rua" type="text" name="rua" />
                </AvGroup>
                <AvGroup>
                  <Label id="numeroLabel" for="empreendimento-numero">
                    <Translate contentKey="coreIntelligenceDataApp.empreendimento.numero">Numero</Translate>
                  </Label>
                  <AvField id="empreendimento-numero" type="string" className="form-control" name="numero" />
                </AvGroup>
                <AvGroup>
                  <Label id="bairroLabel" for="empreendimento-bairro">
                    <Translate contentKey="coreIntelligenceDataApp.empreendimento.bairro">Bairro</Translate>
                  </Label>
                  <AvField id="empreendimento-bairro" type="text" name="bairro" />
                </AvGroup>
                <AvGroup>
                  <Label id="cidadeLabel" for="empreendimento-cidade">
                    <Translate contentKey="coreIntelligenceDataApp.empreendimento.cidade">Cidade</Translate>
                  </Label>
                  <AvField id="empreendimento-cidade" type="text" name="cidade" />
                </AvGroup>
                <AvGroup>
                  <Label id="construtoraEmpreendedoraLabel" for="empreendimento-construtoraEmpreendedora">
                    <Translate contentKey="coreIntelligenceDataApp.empreendimento.construtoraEmpreendedora">
                      Construtora Empreendedora
                    </Translate>
                  </Label>
                  <AvField id="empreendimento-construtoraEmpreendedora" type="text" name="construtoraEmpreendedora" />
                </AvGroup>
                <AvGroup>
                  <Label id="quantidadeQuartosLabel" for="empreendimento-quantidadeQuartos">
                    <Translate contentKey="coreIntelligenceDataApp.empreendimento.quantidadeQuartos">Quantidade Quartos</Translate>
                  </Label>
                  <AvField id="empreendimento-quantidadeQuartos" type="string" className="form-control" name="quantidadeQuartos" />
                </AvGroup>
                <AvGroup>
                  <Label id="inicioComercializacaoLabel" for="empreendimento-inicioComercializacao">
                    <Translate contentKey="coreIntelligenceDataApp.empreendimento.inicioComercializacao">Inicio Comercializacao</Translate>
                  </Label>
                  <AvInput
                    id="empreendimento-inicioComercializacao"
                    type="datetime-local"
                    className="form-control"
                    name="inicioComercializacao"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.empreendimentoEntity.inicioComercializacao)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="entregaUnidadeLabel" for="empreendimento-entregaUnidade">
                    <Translate contentKey="coreIntelligenceDataApp.empreendimento.entregaUnidade">Entrega Unidade</Translate>
                  </Label>
                  <AvInput
                    id="empreendimento-entregaUnidade"
                    type="datetime-local"
                    className="form-control"
                    name="entregaUnidade"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.empreendimentoEntity.entregaUnidade)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="faseObraLabel" for="empreendimento-faseObra">
                    <Translate contentKey="coreIntelligenceDataApp.empreendimento.faseObra">Fase Obra</Translate>
                  </Label>
                  <AvInput
                    id="empreendimento-faseObra"
                    type="select"
                    className="form-control"
                    name="faseObra"
                    value={(!isNew && empreendimentoEntity.faseObra) || 'CONSTRUCAO'}
                  >
                    <option value="CONSTRUCAO">
                      <Translate contentKey="coreIntelligenceDataApp.FaseObra.CONSTRUCAO" />
                    </option>
                    <option value="PRONTO">
                      <Translate contentKey="coreIntelligenceDataApp.FaseObra.PRONTO" />
                    </option>
                    <option value="OUTRO">
                      <Translate contentKey="coreIntelligenceDataApp.FaseObra.OUTRO" />
                    </option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="tipoUnidadeLabel" for="empreendimento-tipoUnidade">
                    <Translate contentKey="coreIntelligenceDataApp.empreendimento.tipoUnidade">Tipo Unidade</Translate>
                  </Label>
                  <AvInput
                    id="empreendimento-tipoUnidade"
                    type="select"
                    className="form-control"
                    name="tipoUnidade"
                    value={(!isNew && empreendimentoEntity.tipoUnidade) || 'LOFT'}
                  >
                    <option value="LOFT">
                      <Translate contentKey="coreIntelligenceDataApp.TipoUnidade.LOFT" />
                    </option>
                    <option value="STUDIO">
                      <Translate contentKey="coreIntelligenceDataApp.TipoUnidade.STUDIO" />
                    </option>
                    <option value="OUTRO">
                      <Translate contentKey="coreIntelligenceDataApp.TipoUnidade.OUTRO" />
                    </option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="quantidadeUnidadesLabel" for="empreendimento-quantidadeUnidades">
                    <Translate contentKey="coreIntelligenceDataApp.empreendimento.quantidadeUnidades">Quantidade Unidades</Translate>
                  </Label>
                  <AvField id="empreendimento-quantidadeUnidades" type="string" className="form-control" name="quantidadeUnidades" />
                </AvGroup>
                <AvGroup>
                  <Label id="quantidadeUnidadesVendidasLabel" for="empreendimento-quantidadeUnidadesVendidas">
                    <Translate contentKey="coreIntelligenceDataApp.empreendimento.quantidadeUnidadesVendidas">
                      Quantidade Unidades Vendidas
                    </Translate>
                  </Label>
                  <AvField
                    id="empreendimento-quantidadeUnidadesVendidas"
                    type="string"
                    className="form-control"
                    name="quantidadeUnidadesVendidas"
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="estoqueLabel" for="empreendimento-estoque">
                    <Translate contentKey="coreIntelligenceDataApp.empreendimento.estoque">Estoque</Translate>
                  </Label>
                  <AvField id="empreendimento-estoque" type="string" className="form-control" name="estoque" />
                </AvGroup>
                <AvGroup>
                  <Label id="percentualVendidoLabel" for="empreendimento-percentualVendido">
                    <Translate contentKey="coreIntelligenceDataApp.empreendimento.percentualVendido">Percentual Vendido</Translate>
                  </Label>
                  <AvField id="empreendimento-percentualVendido" type="string" className="form-control" name="percentualVendido" />
                </AvGroup>
                <AvGroup>
                  <Label id="precoMedioLabel" for="empreendimento-precoMedio">
                    <Translate contentKey="coreIntelligenceDataApp.empreendimento.precoMedio">Preco Medio</Translate>
                  </Label>
                  <AvField id="empreendimento-precoMedio" type="string" className="form-control" name="precoMedio" />
                </AvGroup>
                <AvGroup>
                  <Label id="areaUnidadeLabel" for="empreendimento-areaUnidade">
                    <Translate contentKey="coreIntelligenceDataApp.empreendimento.areaUnidade">Area Unidade</Translate>
                  </Label>
                  <AvField id="empreendimento-areaUnidade" type="string" className="form-control" name="areaUnidade" />
                </AvGroup>
                <AvGroup>
                  <Label id="formaPagamentoLabel" for="empreendimento-formaPagamento">
                    <Translate contentKey="coreIntelligenceDataApp.empreendimento.formaPagamento">Forma Pagamento</Translate>
                  </Label>
                  <AvField id="empreendimento-formaPagamento" type="text" name="formaPagamento" />
                </AvGroup>
                <AvGroup>
                  <Label id="caracterizacaoAreaLazerLabel" for="empreendimento-caracterizacaoAreaLazer">
                    <Translate contentKey="coreIntelligenceDataApp.empreendimento.caracterizacaoAreaLazer">
                      Caracterizacao Area Lazer
                    </Translate>
                  </Label>
                  <AvField id="empreendimento-caracterizacaoAreaLazer" type="text" name="caracterizacaoAreaLazer" />
                </AvGroup>
                <AvGroup>
                  <Label id="infrestruturaSegurancaLabel" for="empreendimento-infrestruturaSeguranca">
                    <Translate contentKey="coreIntelligenceDataApp.empreendimento.infrestruturaSeguranca">
                      Infrestrutura Seguranca
                    </Translate>
                  </Label>
                  <AvField id="empreendimento-infrestruturaSeguranca" type="text" name="infrestruturaSeguranca" />
                </AvGroup>
                <AvGroup>
                  <Label id="nivelAcabamentoLabel" for="empreendimento-nivelAcabamento">
                    <Translate contentKey="coreIntelligenceDataApp.empreendimento.nivelAcabamento">Nivel Acabamento</Translate>
                  </Label>
                  <AvField id="empreendimento-nivelAcabamento" type="text" name="nivelAcabamento" />
                </AvGroup>
                <AvGroup>
                  <Label for="empreendimento-levantamento">
                    <Translate contentKey="coreIntelligenceDataApp.empreendimento.levantamento">Levantamento</Translate>
                  </Label>
                  <AvInput id="empreendimento-levantamento" type="select" className="form-control" name="levantamento.id">
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
                <Button tag={Link} id="cancel-save" to="/entity/empreendimento" replace color="info">
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
  empreendimentoEntity: storeState.empreendimento.entity,
  loading: storeState.empreendimento.loading,
  updating: storeState.empreendimento.updating,
  updateSuccess: storeState.empreendimento.updateSuccess
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
)(EmpreendimentoUpdate);
