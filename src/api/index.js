import config from './config';
const { instance, instanceOMBD } = config;

export const getSeries = () => {
	return instance.get('/series');
};

export const getSerieById = (idSerie) => {
	return instance.get(`/series/${idSerie}`);
};

export const getSeasons = (idSerie) => {
	return instance.get(`/series/${idSerie}/seasons`);
};

export const getEpisodes = ({idSerie, idSeason}) => {
	return instance.get(`/series/${idSerie}/seasons/${idSeason}/episodes`);
};

export const getPosterSeason = (imdbId) => {
	return instanceOMBD.get('', { params: {i: imdbId}});
};
