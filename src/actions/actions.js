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

export const setNextEpisode = episode => ({
  type: ACTIONS.SET_NEXT_EPISODE,
  payload: episode
});

export const errorNextEpisode = error => ({
  type: ACTIONS.ERROR_NEXT_EPISODE,
  payload: error
});


export const loadPosterSeason = season => ({
  type: ACTIONS.LOAD_POSTER_SEASON,
  payload: season
});