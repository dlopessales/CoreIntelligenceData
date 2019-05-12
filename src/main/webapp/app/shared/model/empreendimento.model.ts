import { Moment } from 'moment';
import { ILevantamento } from 'app/shared/model/levantamento.model';

export const enum FaseObra {
  CONSTRUCAO = 'CONSTRUCAO',
  PRONTO = 'PRONTO',
  OUTRO = 'OUTRO'
}

export const enum TipoUnidade {
  LOFT = 'LOFT',
  STUDIO = 'STUDIO',
  OUTRO = 'OUTRO'
}

export interface IEmpreendimento {
  id?: number;
  nome?: string;
  rua?: string;
  numero?: number;
  bairro?: string;
  cidade?: string;
  construtoraEmpreendedora?: string;
  quantidadeQuartos?: number;
  inicioComercializacao?: Moment;
  entregaUnidade?: Moment;
  faseObra?: FaseObra;
  tipoUnidade?: TipoUnidade;
  quantidadeUnidades?: number;
  quantidadeUnidadesVendidas?: number;
  estoque?: number;
  percentualVendido?: number;
  precoMedio?: number;
  areaUnidade?: number;
  formaPagamento?: string;
  caracterizacaoAreaLazer?: string;
  infrestruturaSeguranca?: string;
  nivelAcabamento?: string;
  levantamento?: ILevantamento;
}

export const defaultValue: Readonly<IEmpreendimento> = {};
