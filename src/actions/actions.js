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

export const getEpisodes = episodes => ({
  type: ACTIONS.GET_EPISODES,
  payload: episodes
});

export const showSerie = serie => ({
  type: ACTIONS.SHOW_SERIE,
  payload: serie
});