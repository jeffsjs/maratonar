import { takeLatest, put, call } from 'redux-saga/effects';
import * as ACTIONS from '../actions/actions-types';
import { getSeries, getSerieById, getSeasons } from '../api';

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
		yield put({ type: ACTIONS.SUCCESS_SEASONS, payload: response.data });
	} catch (err) {
		yield put({ type: ACTIONS.FAILURE_SEASONS, payload: 'Erro ao carregar seasons =/' });
	}
}

export default function* root() {
	yield takeLatest(ACTIONS.LOAD_SERIES, getSeriesTask);
	yield takeLatest(ACTIONS.GET_SERIE, getSerieByIDTask);
	yield takeLatest(ACTIONS.GET_SEASONS, getSeasonsTask);
}
