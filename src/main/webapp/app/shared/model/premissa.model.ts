import { ILevantamento } from 'app/shared/model/levantamento.model';

export interface IPremissa {
  id?: number;
  descricao?: string;
  levantamento?: ILevantamento;
}

export const defaultValue: Readonly<IPremissa> = {};
