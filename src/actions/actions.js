import * as ACTIONS from './actions-types';

export const loadingSeries = () => ({
  type: ACTIONS.LOAD_SERIES
});

export const getSerieByID = serie => ({
  type: ACTIONS.GET_SERIE,
  payload: serie
});

export const getSeasons = seasons => ({
  type: ACTIONS.GET_SEASONS,
  payload: seasons
});

export const showSerie = serie => ({
  type: ACTIONS.SHOW_SERIE,
  payload: serie
});