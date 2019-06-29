import * as ACTIONS from '../actions/actions-types';

const INITIAL_STATE = {
	loading: false,
	error: false,
	errorMessage: '',
	series: [],
	seasons: [],
	episodes: [],
	selectedSerie: '',
	marathonDuration: 0,
	dateStart: '',
	dateNextEpisode: '',
	hourPerDay: 0,
	daysToNextEpisode: 0,
};

export default function(state = INITIAL_STATE, action) {
	switch (action.type) {
		case ACTIONS.LOAD_SERIES:
			return { ...state, loading: true };
		case ACTIONS.SUCCESS_SERIES:
			return { ...state, series: [...action.payload], loading: false };
		case ACTIONS.SHOW_SERIE:
			return { ...state, selectedSerie: action.payload };
		case ACTIONS.SUCCESS_SERIE_ID:
			return { ...state, series: [action.payload.serie], selectedSerie: action.payload.id };
		case ACTIONS.GET_SEASONS:
				return { ...state, loading: true, selectedSerie: action.payload  };
		case ACTIONS.SUCCESS_SEASONS:
				return { ...state, seasons: [...action.payload], loading: false};

		case ACTIONS.GET_EPISODES:
				return { ...state, loading: true };
		case ACTIONS.SUCCESS_EPISODES:
				return { ...state, episodes: [...state.episodes, action.payload], loading: false};

		case ACTIONS.FAILURE_SERIES:
		case ACTIONS.FAILURE_SERIE_ID:
		case ACTIONS.FAILURE_EPISODES:
			return { ...state, series: [], season: [], episodes: [], loading: false, error: true, errorMessage: action.payload };
		default:
			return state;
	}
}

// const deleteCampanha = (idCampanha, state) => {
// 	const { campanhas } = state;
// 	return campanhas.filter( item => item._id.search(idCampanha) === -1 );
// };
