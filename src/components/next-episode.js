import React, { Component } from 'react';
import { withRouter } from 'react-router';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getSerieByID, getSeasons, setNextEpisode } from '../actions/actions';

import { format, differenceInDays } from 'date-fns';

import { durationToMin } from '../utils'

class NextEpisode extends Component {
	componentDidMount() {
		const { state, idSerie, getSerieByID, getSeasons } = this.props;
		if (state.selectedSerie !== idSerie) getSerieByID(idSerie);
		getSeasons(idSerie);
	}

	nextEpisode = (seasons, episodes) => {
		const today = format(new Date(), 'YYYY-MM-DD');
		const nextSeasons = seasons.filter(season => differenceInDays(season.releaseDate, today) > 0);
		let nextEpisode = {}
		if (nextSeasons.length > 0) {
			const nextSeason = nextSeasons.reduce((previous, current) => previous.id < current.id ? previous : current );
			if (nextSeason) {
				nextEpisode = episodes.filter(episodes => episodes.idSeason === nextSeason.id)[0].allEpisodes.filter(episode => episode.id === "1")[0]
				return this.timeToNextEpisode(nextEpisode, episodes)
			}
		}

		const seasonsSortDesc = seasons.sort(function(a, b) { return b.id - a.id })[0];
		const episodesLastSeason = episodes.filter(episodes => episodes.idSeason === seasonsSortDesc.id)[0].allEpisodes;
		const nextEpisodes = episodesLastSeason.filter(episode => differenceInDays(episode.releaseDate, today) > 0);
		nextEpisode = nextEpisodes.sort(function(a, b) { return a.id - b.id })[0];

		return nextEpisode ? this.timeToNextEpisode(nextEpisode, episodes) : console.log({ error: 'Não possui novos lançamentos.' })
	};

	timeToNextEpisode = (nextEpisode, episodes) => {
		const { setNextEpisode } = this.props;
		const dateStart = format(new Date(), 'YYYY-MM-DD');

		const episodesSort = episodes.sort(function(a, b) { return a.idSeason - b.idSeason });
		const daysToNextEpisode = differenceInDays(nextEpisode.releaseDate, dateStart);
		const hoursToNextEpisode = daysToNextEpisode * 24;
		const minutesToNextEpisode = hoursToNextEpisode * 60;

		const marathonDuration = episodesSort.reduce(function(accumulator, season) {
			season.allEpisodes.forEach(function(epi) {
				if (differenceInDays(epi.releaseDate, dateStart) < 0) {
					accumulator = accumulator + durationToMin(epi.duration);
				}
			});
			return accumulator;
		}, 0);

		setNextEpisode({minutesToNextEpisode, marathonDuration, daysToNextEpisode, hoursToNextEpisode, nextEpisode, dateStart})

		console.log(differenceInDays(nextEpisode.releaseDate, dateStart), marathonDuration);
	}

	componentWillReceiveProps(nextProps) {
		const { episodes, seasons, dateNextEpisode} = nextProps.state;
		if (episodes.length > 0 && episodes.length === seasons.length && dateNextEpisode.length === 0) this.nextEpisode(seasons, episodes);
	}

	render() {
		const { state, history, idSerie } = this.props;
		const { loading, seasons, episodes, error, errorMessage } = state;

		if (error) return <div>{errorMessage}</div>;
		if (loading) return <div>CARREGANDO...</div>;
		if (seasons.length !== episodes.length)
			return <div>CARREGANDO EPISODES...</div>;

		return (
			<div className='seasons'>
				{seasons.map(season => (
					<div key={season.id}>{`Temporada: ${season.id}, Data: ${
						season.releaseDate
					}`}</div>
				))}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return { state: state.mainReducer };
};

const mapDispatchToProps = dispatch =>
	bindActionCreators({ getSerieByID, getSeasons, setNextEpisode }, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(NextEpisode);
