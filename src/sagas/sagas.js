import { takeLatest, takeEvery, put, call, all } from 'redux-saga/effects';
import * as ACTIONS from '../actions/actions-types';
import { getSeries, getSerieById, getSeasons, getEpisodes, getPosterSeason } from '../api';

function* getSeriesTask() {
	try {
		const response = yield call(getSeries);
		yield put({ type: ACTIONS.SUCCESS_SERIES, payload: response.data });
	} catch (err) {
		yield put({ type: ACTIONS.FAILURE_SERIES, payload: 'Erro ao carregar =/' });
	}
}

function* getSerieByIDTask({ payload }) {
	try {
		const response = yield call(getSerieById, payload);
		yield put({ type: ACTIONS.SUCCESS_SERIE_ID, payload: { id: payload, serie: response.data } });
	} catch (err) {
		yield put({ type: ACTIONS.FAILURE_SERIE_ID, payload: 'Erro ao carregar serie =/' });
	}
}

function* getSeasonsTask({ payload }) {
	try {
		const response = yield call(getSeasons, payload);

		yield all(response.data.map(season => {
			return put({ type: ACTIONS.GET_EPISODES, payload: {idSerie: payload, idSeason: season.id} })
		}));
		
		yield put({ type: ACTIONS.SUCCESS_SEASONS, payload: response.data });
	} catch (err) {
		yield put({ type: ACTIONS.FAILURE_SEASONS, payload: 'Erro ao carregar seasons =/' });
	}
}

function* getEpisodesTask({ payload }) {
	try {
		const response = yield call(getEpisodes, {idSerie: payload.idSerie, idSeason: payload.idSeason});
		yield put({ type: ACTIONS.SUCCESS_EPISODES, payload: {idSeason: payload.idSeason, allEpisodes: response.data} });
	} catch (err) {
		yield put({ type: ACTIONS.FAILURE_EPISODES, payload: 'Erro ao carregar episodes =/' });
	}
}

function* getPosterSeasonTask({ payload }) {
	const getPosters = localStorage.getItem(ACTIONS.LOAD_POSTER_SEASON);
	const objPosters = getPosters ? JSON.parse(getPosters) : [];
	try {
		const response = yield call(getPosterSeason, payload);
		let newPoster = { imdbId: payload, img: response.data.Poster }

		objPosters.push(newPoster);
		localStorage.setItem(ACTIONS.LOAD_POSTER_SEASON, JSON.stringify(objPosters));
		yield put({ type: ACTIONS.SET_POSTER_SEASON, payload: newPoster });
	} catch (err) {
		objPosters.push({ imdbId: payload, img: false })
		localStorage.setItem(ACTIONS.LOAD_POSTER_SEASON, JSON.stringify(objPosters));
		yield put({ type: ACTIONS.SET_POSTER_SEASON, payload: { imdbId: payload, img: false } });
	}
}

export default function* root() {
	yield takeLatest(ACTIONS.LOAD_SERIES, getSeriesTask);
	yield takeLatest(ACTIONS.GET_SERIE, getSerieByIDTask);
	yield takeLatest(ACTIONS.GET_SEASONS, getSeasonsTask);
	yield takeEvery(ACTIONS.GET_EPISODES, getEpisodesTask);
	yield takeEvery(ACTIONS.LOAD_POSTER_SEASON, getPosterSeasonTask);
}
