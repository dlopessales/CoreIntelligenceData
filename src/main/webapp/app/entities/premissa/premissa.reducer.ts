import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPremissa, defaultValue } from 'app/shared/model/premissa.model';

export const ACTION_TYPES = {
  FETCH_PREMISSA_LIST: 'premissa/FETCH_PREMISSA_LIST',
  FETCH_PREMISSA: 'premissa/FETCH_PREMISSA',
  CREATE_PREMISSA: 'premissa/CREATE_PREMISSA',
  UPDATE_PREMISSA: 'premissa/UPDATE_PREMISSA',
  DELETE_PREMISSA: 'premissa/DELETE_PREMISSA',
  RESET: 'premissa/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPremissa>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type PremissaState = Readonly<typeof initialState>;

// Reducer

export default (state: PremissaState = initialState, action): PremissaState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PREMISSA_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PREMISSA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PREMISSA):
    case REQUEST(ACTION_TYPES.UPDATE_PREMISSA):
    case REQUEST(ACTION_TYPES.DELETE_PREMISSA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PREMISSA_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PREMISSA):
    case FAILURE(ACTION_TYPES.CREATE_PREMISSA):
    case FAILURE(ACTION_TYPES.UPDATE_PREMISSA):
    case FAILURE(ACTION_TYPES.DELETE_PREMISSA):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PREMISSA_LIST):
      return {
        ...state,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_PREMISSA):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PREMISSA):
    case SUCCESS(ACTION_TYPES.UPDATE_PREMISSA):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PREMISSA):
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

const apiUrl = 'api/premissas';

// Actions

export const getEntities: ICrudGetAllAction<IPremissa> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_PREMISSA_LIST,
    payload: axios.get<IPremissa>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IPremissa> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PREMISSA,
    payload: axios.get<IPremissa>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IPremissa> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PREMISSA,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPremissa> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PREMISSA,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPremissa> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PREMISSA,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
