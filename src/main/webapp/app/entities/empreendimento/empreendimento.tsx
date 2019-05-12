import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import {
  Translate,
  ICrudGetAllAction,
  TextFormat,
  getSortState,
  IPaginationBaseState,
  getPaginationItemsNumber,
  JhiPagination
} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './empreendimento.reducer';
import { IEmpreendimento } from 'app/shared/model/empreendimento.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IEmpreendimentoProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export type IEmpreendimentoState = IPaginationBaseState;

export class Empreendimento extends React.Component<IEmpreendimentoProps, IEmpreendimentoState> {
  state: IEmpreendimentoState = {
    ...getSortState(this.props.location, ITEMS_PER_PAGE)
  };

  componentDidMount() {
    this.getEntities();
  }

  sort = prop => () => {
    this.setState(
      {
        order: this.state.order === 'asc' ? 'desc' : 'asc',
        sort: prop
      },
      () => this.sortEntities()
    );
  };

  sortEntities() {
    this.getEntities();
    this.props.history.push(`${this.props.location.pathname}?page=${this.state.activePage}&sort=${this.state.sort},${this.state.order}`);
  }

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { empreendimentoList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="empreendimento-heading">
          <Translate contentKey="coreIntelligenceDataApp.empreendimento.home.title">Empreendimentos</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="coreIntelligenceDataApp.empreendimento.home.createLabel">Create new Empreendimento</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={this.sort('id')}>
                  <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('nome')}>
                  <Translate contentKey="coreIntelligenceDataApp.empreendimento.nome">Nome</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('rua')}>
                  <Translate contentKey="coreIntelligenceDataApp.empreendimento.rua">Rua</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('numero')}>
                  <Translate contentKey="coreIntelligenceDataApp.empreendimento.numero">Numero</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('bairro')}>
                  <Translate contentKey="coreIntelligenceDataApp.empreendimento.bairro">Bairro</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('cidade')}>
                  <Translate contentKey="coreIntelligenceDataApp.empreendimento.cidade">Cidade</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('construtoraEmpreendedora')}>
                  <Translate contentKey="coreIntelligenceDataApp.empreendimento.construtoraEmpreendedora">
                    Construtora Empreendedora
                  </Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('quantidadeQuartos')}>
                  <Translate contentKey="coreIntelligenceDataApp.empreendimento.quantidadeQuartos">Quantidade Quartos</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('inicioComercializacao')}>
                  <Translate contentKey="coreIntelligenceDataApp.empreendimento.inicioComercializacao">Inicio Comercializacao</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('entregaUnidade')}>
                  <Translate contentKey="coreIntelligenceDataApp.empreendimento.entregaUnidade">Entrega Unidade</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('faseObra')}>
                  <Translate contentKey="coreIntelligenceDataApp.empreendimento.faseObra">Fase Obra</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('tipoUnidade')}>
                  <Translate contentKey="coreIntelligenceDataApp.empreendimento.tipoUnidade">Tipo Unidade</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('quantidadeUnidades')}>
                  <Translate contentKey="coreIntelligenceDataApp.empreendimento.quantidadeUnidades">Quantidade Unidades</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('quantidadeUnidadesVendidas')}>
                  <Translate contentKey="coreIntelligenceDataApp.empreendimento.quantidadeUnidadesVendidas">
                    Quantidade Unidades Vendidas
                  </Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('estoque')}>
                  <Translate contentKey="coreIntelligenceDataApp.empreendimento.estoque">Estoque</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('percentualVendido')}>
                  <Translate contentKey="coreIntelligenceDataApp.empreendimento.percentualVendido">Percentual Vendido</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('precoMedio')}>
                  <Translate contentKey="coreIntelligenceDataApp.empreendimento.precoMedio">Preco Medio</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('areaUnidade')}>
                  <Translate contentKey="coreIntelligenceDataApp.empreendimento.areaUnidade">Area Unidade</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('formaPagamento')}>
                  <Translate contentKey="coreIntelligenceDataApp.empreendimento.formaPagamento">Forma Pagamento</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('caracterizacaoAreaLazer')}>
                  <Translate contentKey="coreIntelligenceDataApp.empreendimento.caracterizacaoAreaLazer">
                    Caracterizacao Area Lazer
                  </Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('infrestruturaSeguranca')}>
                  <Translate contentKey="coreIntelligenceDataApp.empreendimento.infrestruturaSeguranca">Infrestrutura Seguranca</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('nivelAcabamento')}>
                  <Translate contentKey="coreIntelligenceDataApp.empreendimento.nivelAcabamento">Nivel Acabamento</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="coreIntelligenceDataApp.empreendimento.levantamento">Levantamento</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {empreendimentoList.map((empreendimento, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${empreendimento.id}`} color="link" size="sm">
                      {empreendimento.id}
                    </Button>
                  </td>
                  <td>{empreendimento.nome}</td>
                  <td>{empreendimento.rua}</td>
                  <td>{empreendimento.numero}</td>
                  <td>{empreendimento.bairro}</td>
                  <td>{empreendimento.cidade}</td>
                  <td>{empreendimento.construtoraEmpreendedora}</td>
                  <td>{empreendimento.quantidadeQuartos}</td>
                  <td>
                    <TextFormat type="date" value={empreendimento.inicioComercializacao} format={APP_DATE_FORMAT} />
                  </td>
                  <td>
                    <TextFormat type="date" value={empreendimento.entregaUnidade} format={APP_DATE_FORMAT} />
                  </td>
                  <td>
                    <Translate contentKey={`coreIntelligenceDataApp.FaseObra.${empreendimento.faseObra}`} />
                  </td>
                  <td>
                    <Translate contentKey={`coreIntelligenceDataApp.TipoUnidade.${empreendimento.tipoUnidade}`} />
                  </td>
                  <td>{empreendimento.quantidadeUnidades}</td>
                  <td>{empreendimento.quantidadeUnidadesVendidas}</td>
                  <td>{empreendimento.estoque}</td>
                  <td>{empreendimento.percentualVendido}</td>
                  <td>{empreendimento.precoMedio}</td>
                  <td>{empreendimento.areaUnidade}</td>
                  <td>{empreendimento.formaPagamento}</td>
                  <td>{empreendimento.caracterizacaoAreaLazer}</td>
                  <td>{empreendimento.infrestruturaSeguranca}</td>
                  <td>{empreendimento.nivelAcabamento}</td>
                  <td>
                    {empreendimento.levantamento ? (
                      <Link to={`levantamento/${empreendimento.levantamento.id}`}>{empreendimento.levantamento.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${empreendimento.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${empreendimento.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${empreendimento.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <Row className="justify-content-center">
          <JhiPagination
            items={getPaginationItemsNumber(totalItems, this.state.itemsPerPage)}
            activePage={this.state.activePage}
            onSelect={this.handlePagination}
            maxButtons={5}
          />
        </Row>
      </div>
    );
  }
}

const mapStateToProps = ({ empreendimento }: IRootState) => ({
  empreendimentoList: empreendimento.entities,
  totalItems: empreendimento.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Empreendimento);
