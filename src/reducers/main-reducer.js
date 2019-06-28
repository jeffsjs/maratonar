import * as ACTIONS from '../actions/actions-types';

const INITIAL_STATE = {
	loading: false,
	error: false,
	errorMessage: '',
	series: [],
	seasons: [],
	selectedSerie: '',
	marathonDuration: 0,
	dateStart: '2019-06-27',
	dateNextEpisode: '',
	hourPerDay: 0,
};

export default function(state = INITIAL_STATE, action) {
	switch (action.type) {
		case ACTIONS.LOAD_SERIES:
			return { ...state, loading: true };

		case ACTIONS.SUCCESS_SERIES:
			return { ...state, series: [...action.payload], loading: false };

		case ACTIONS.FAILURE_SERIES:
		case ACTIONS.FAILURE_SERIE_ID:
			return { ...state, series: [], loading: false, error: true, errorMessage: action.payload };

		case ACTIONS.SHOW_SERIE:
			return { ...state, selectedSerie: action.payload };

		case ACTIONS.SUCCESS_SERIE_ID:
			return { ...state, series: [action.payload.serie], selectedSerie: action.payload.id };
			
		case ACTIONS.GET_SEASONS:
				return { ...state, loading: true, selectedSerie: action.payload  };

		case ACTIONS.SUCCESS_SEASONS:
				return { ...state, seasons: [...action.payload], loading: false};

		default:
			return state;
	}
}

// const deleteCampanha = (idCampanha, state) => {
// 	const { campanhas } = state;
// 	return campanhas.filter( item => item._id.search(idCampanha) === -1 );
// };
