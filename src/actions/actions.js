import * as ACTIONS from './actions-types';

export const loadingSeries = () => ({
  type: ACTIONS.LOAD_SERIES
});

export const setSeries = series => ({
  type: ACTIONS.SUCCESS_SERIES,
  payload: series
});