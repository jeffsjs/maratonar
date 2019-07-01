import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getSerieByID, getSeasons, setNextEpisode, errorNextEpisode } from '../actions/actions';

import { format, differenceInDays, isValid } from 'date-fns';
import { durationToMin } from '../utils';

import FormCalendar from './form-calcular';
import Loading from './loading';

class NextEpisode extends Component {
	componentDidMount() {
		const { state, idSerie, getSerieByID, getSeasons } = this.props;
		if (state.selectedSerie !== idSerie) getSerieByID(idSerie);
		getSeasons(idSerie);
	}

	nextEpisode = (seasons, episodes) => {
		const { errorNextEpisode } = this.props;
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
		const nextEpisodes = episodesLastSeason.filter(episode => isValid(new Date(episode.releaseDate)) && differenceInDays(episode.releaseDate, today) > 0);
		nextEpisode = nextEpisodes.sort(function(a, b) { return a.id - b.id })[0];

		return nextEpisode ? this.timeToNextEpisode(nextEpisode, episodes) : errorNextEpisode('Não possui novos lançamentos.');
	};

	timeToNextEpisode = (nextEpisode, episodes) => {
		const { setNextEpisode } = this.props;
		const dateStart = format(new Date(), 'YYYY-MM-DD');

		const episodesSort = episodes.sort(function(a, b) { return a.idSeason - b.idSeason });
		const daysToNextEpisode = differenceInDays(nextEpisode.releaseDate, dateStart);
		const hoursToNextEpisode = daysToNextEpisode * 24;
		const minutesToNextEpisode = hoursToNextEpisode * 60;

		const marathonDuration = episodesSort.reduce((accumulator, season) => {
			season.allEpisodes.forEach((epi) => {
				if (isValid(new Date(epi.releaseDate)) && differenceInDays(epi.releaseDate, dateStart) < 0) {
					accumulator = accumulator + durationToMin(epi.duration);
				}
			});
			return accumulator;
		}, 0);

		setNextEpisode({minutesToNextEpisode, marathonDuration, daysToNextEpisode, hoursToNextEpisode, nextEpisode, dateStart});
	}

	componentWillReceiveProps(nextProps) {
		const { episodes, seasons, dateNextEpisode} = nextProps.state;
		if (episodes.length > 0 && episodes.length === seasons.length && dateNextEpisode.length === 0) this.nextEpisode(seasons, episodes);
	}

	render() {
		const { state, idSerie } = this.props;
		const { loading, series, seasons, episodes, error, errorMessage, nextEpisode, dateNextEpisode } = state;
		
		const serie = series.filter(s => s.id === idSerie)[0];
		
		if (error) return <div>{errorMessage}</div>;
		if (!dateNextEpisode || !serie || loading || seasons.length !== episodes.length) return <Loading />;

		return (
			<div className='calcular row column'>
				<div className='row'>
					<h2>
						{serie.title}
					</h2>
				</div>
				<div className='row'>
					<div className='item'>
						<FormCalendar />
					</div>
					<div className='item'>
						<div className='row column'> 
							<div className='item'> <h3>Next Episode</h3></div>
							<div className='item'> <b>EP: </b> {nextEpisode.id}</div>
							<div className='item'> <b>Title: </b> {nextEpisode.title}</div>
							<div className='item'> <b>Date: </b> {nextEpisode.releaseDate}</div>
							<div className='item'> <b>Duration: </b> {nextEpisode.duration}</div>
							<div className='item'> <b>IMBD: </b> {nextEpisode.imdbId}</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return { state: state.mainReducer };
};

const mapDispatchToProps = dispatch =>
	bindActionCreators({ getSerieByID, getSeasons, setNextEpisode, errorNextEpisode }, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(NextEpisode);
