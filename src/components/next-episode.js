import React, { Component } from 'react';
import { withRouter } from 'react-router';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getSerieByID, getSeasons } from '../actions/actions';

import { format, differenceInDays, isValid } from 'date-fns';

class NextEpisode extends Component {
	componentDidMount() {
		const { state, idSerie, getSerieByID, getSeasons } = this.props;
		if (state.selectedSerie !== idSerie) getSerieByID(idSerie);
		getSeasons(idSerie);
	}

	dayNextEpisode = episodes => {
		const today = format(new Date(), 'YYYY-MM-DD');
		let result = { error: 'Não possui novos lançamentos.' };

		episodes.map(season =>
			season.allEpisodes.map(episode => {
				const releaseDate = new Date(episode.releaseDate);
				if (isValid(releaseDate) && differenceInDays(today, releaseDate) > 0) {
					result = { idSeason: season.idSeason, episode };
				}
			})
		);

		console.log(result);
	};

	componentWillReceiveProps(nextProps) {
		const { episodes, seasons, dateNextEpisode} = nextProps.state;
		if (episodes.length > 0 && episodes.length === seasons.length && dateNextEpisode.length === 0)
			this.dayNextEpisode(episodes);
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
	bindActionCreators({ getSerieByID, getSeasons }, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(NextEpisode);
