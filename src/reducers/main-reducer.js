import * as ACTIONS from '../actions/actions-types';

const INITIAL_STATE = {
	loading: false,
	error: false,
	errorMessage: '',
	series: [],
	seasons: [],
	episodes: [],
	selectedSerie: '',
	dateStart: '',
	dateNextEpisode: '',
	nextEpisode: [],
	marathonDuration: 0,
	daysToNextEpisode: 0,
	minutesToNextEpisode: 0,
	hoursToNextEpisode: 0,
};

export default function(state = INITIAL_STATE, action) {
	switch (action.type) {
		case ACTIONS.LOAD_SERIES:
			return { ...state, loading: true };
		case ACTIONS.SUCCESS_SERIES:
			return { ...state, series: [...action.payload], loading: false, error: false, errorMessage: '' };
		case ACTIONS.SHOW_SERIE:
			return { ...state, selectedSerie: action.payload, seasons: [], episodes: [], nextEpisode: [], dateNextEpisode: ''};
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

		case ACTIONS.SET_NEXT_EPISODE:
			return {...state, dateNextEpisode: action.payload.nextEpisode.releaseDate, ...action.payload };

		case ACTIONS.SET_POSTER_SEASON:
			return {...state, series: addPoster(action.payload, state) };

		case ACTIONS.FAILURE_SERIES:
		case ACTIONS.FAILURE_SERIE_ID:
		case ACTIONS.FAILURE_EPISODES:
		case ACTIONS.ERROR_NEXT_EPISODE:
			return { ...state, series: [], season: [], episodes: [], nextEpisode: [], loading: false, error: true, errorMessage: action.payload };
		default:
			return state;
	}
}

const addPoster = (poster, state) => {
	let { series } = state;
	series.forEach(serie => {
		if (serie.imdbId === poster.imdbId) {
			serie.img = poster.img
		} 
	})
	return series;
}