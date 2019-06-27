import { takeLatest, put, call } from 'redux-saga/effects';
import * as ACTIONS from '../actions/actions-types';
import { getSeries } from '../api';


function* getSeriesTask() {
	try {
		const response = yield call(getSeries);
		yield put({ type: ACTIONS.SUCCESS_SERIES, payload: response.data });
	} catch (err) {
		yield put({ type: ACTIONS.FAILURE_SERIES, payload: 'Erro ao carregar =/' });
	}
}

export default function* root() {
	yield takeLatest(ACTIONS.LOAD_SERIES, getSeriesTask);
}
