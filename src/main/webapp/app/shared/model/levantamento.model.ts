import { Moment } from 'moment';
import { IPremissa } from 'app/shared/model/premissa.model';
import { IEmpreendimento } from 'app/shared/model/empreendimento.model';

export interface ILevantamento {
  id?: number;
  nome?: string;
  descricao?: string;
  dataCriacao?: Moment;
  usuarioCriacao?: string;
  premissas?: IPremissa[];
  empreedimentos?: IEmpreendimento[];
}

export const defaultValue: Readonly<ILevantamento> = {};
