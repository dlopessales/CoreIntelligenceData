import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IEmpreendimento, defaultValue } from 'app/shared/model/empreendimento.model';

export const ACTION_TYPES = {
  FETCH_EMPREENDIMENTO_LIST: 'empreendimento/FETCH_EMPREENDIMENTO_LIST',
  FETCH_EMPREENDIMENTO: 'empreendimento/FETCH_EMPREENDIMENTO',
  CREATE_EMPREENDIMENTO: 'empreendimento/CREATE_EMPREENDIMENTO',
  UPDATE_EMPREENDIMENTO: 'empreendimento/UPDATE_EMPREENDIMENTO',
  DELETE_EMPREENDIMENTO: 'empreendimento/DELETE_EMPREENDIMENTO',
  RESET: 'empreendimento/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IEmpreendimento>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type EmpreendimentoState = Readonly<typeof initialState>;

// Reducer

export default (state: EmpreendimentoState = initialState, action): EmpreendimentoState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_EMPREENDIMENTO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_EMPREENDIMENTO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_EMPREENDIMENTO):
    case REQUEST(ACTION_TYPES.UPDATE_EMPREENDIMENTO):
    case REQUEST(ACTION_TYPES.DELETE_EMPREENDIMENTO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_EMPREENDIMENTO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_EMPREENDIMENTO):
    case FAILURE(ACTION_TYPES.CREATE_EMPREENDIMENTO):
    case FAILURE(ACTION_TYPES.UPDATE_EMPREENDIMENTO):
    case FAILURE(ACTION_TYPES.DELETE_EMPREENDIMENTO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_EMPREENDIMENTO_LIST):
      return {
        ...state,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_EMPREENDIMENTO):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_EMPREENDIMENTO):
    case SUCCESS(ACTION_TYPES.UPDATE_EMPREENDIMENTO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_EMPREENDIMENTO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/empreendimentos';

// Actions

export const getEntities: ICrudGetAllAction<IEmpreendimento> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_EMPREENDIMENTO_LIST,
    payload: axios.get<IEmpreendimento>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IEmpreendimento> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_EMPREENDIMENTO,
    payload: axios.get<IEmpreendimento>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IEmpreendimento> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_EMPREENDIMENTO,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IEmpreendimento> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_EMPREENDIMENTO,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IEmpreendimento> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_EMPREENDIMENTO,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
