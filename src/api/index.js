import instance from './config';
const DATE_DEFAULT = '?mockDate=2019-03-01'

export const getSeries = () => {
	return instance.get('/series'+DATE_DEFAULT);
};

export const getSerieById = (idSerie) => {
	return instance.get(`/series/${idSerie}`+DATE_DEFAULT);
};

export const getSeasons = (idSerie) => {
	return instance.get(`/series/${idSerie}/seasons`+DATE_DEFAULT);
};

export const getEpisodes = ({idSerie, idSeason}) => {
	return instance.get(`/series/${idSerie}/seasons/${idSeason}/episodes`+DATE_DEFAULT);
};