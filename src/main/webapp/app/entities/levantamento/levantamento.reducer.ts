import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ILevantamento, defaultValue } from 'app/shared/model/levantamento.model';

export const ACTION_TYPES = {
  FETCH_LEVANTAMENTO_LIST: 'levantamento/FETCH_LEVANTAMENTO_LIST',
  FETCH_LEVANTAMENTO: 'levantamento/FETCH_LEVANTAMENTO',
  CREATE_LEVANTAMENTO: 'levantamento/CREATE_LEVANTAMENTO',
  UPDATE_LEVANTAMENTO: 'levantamento/UPDATE_LEVANTAMENTO',
  DELETE_LEVANTAMENTO: 'levantamento/DELETE_LEVANTAMENTO',
  RESET: 'levantamento/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ILevantamento>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type LevantamentoState = Readonly<typeof initialState>;

// Reducer

export default (state: LevantamentoState = initialState, action): LevantamentoState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_LEVANTAMENTO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_LEVANTAMENTO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_LEVANTAMENTO):
    case REQUEST(ACTION_TYPES.UPDATE_LEVANTAMENTO):
    case REQUEST(ACTION_TYPES.DELETE_LEVANTAMENTO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_LEVANTAMENTO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_LEVANTAMENTO):
    case FAILURE(ACTION_TYPES.CREATE_LEVANTAMENTO):
    case FAILURE(ACTION_TYPES.UPDATE_LEVANTAMENTO):
    case FAILURE(ACTION_TYPES.DELETE_LEVANTAMENTO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_LEVANTAMENTO_LIST):
      return {
        ...state,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_LEVANTAMENTO):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_LEVANTAMENTO):
    case SUCCESS(ACTION_TYPES.UPDATE_LEVANTAMENTO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_LEVANTAMENTO):
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

const apiUrl = 'api/levantamentos';

// Actions

export const getEntities: ICrudGetAllAction<ILevantamento> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_LEVANTAMENTO_LIST,
    payload: axios.get<ILevantamento>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<ILevantamento> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_LEVANTAMENTO,
    payload: axios.get<ILevantamento>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ILevantamento> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_LEVANTAMENTO,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ILevantamento> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_LEVANTAMENTO,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ILevantamento> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_LEVANTAMENTO,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
