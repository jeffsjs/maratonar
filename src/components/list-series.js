import React, { Component } from 'react';
import { withRouter } from 'react-router';

import * as ACTIONS from '../actions/actions-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadingSeries, showSerie, loadPosterSeason } from '../actions/actions';

import { getPosterSeason } from '../api'
import { ReactComponent as NoImage } from '../imgs/file-image.svg';

class ListSeries extends Component {
	componentDidMount() {
		const { loadingSeries } = this.props;
		loadingSeries();
	}

	renderPoster = (imdbID, img) => {
		const { loadPosterSeason } = this.props;
		if (img && img.length > 0) return <img className='img-poster' src={img} />;

		const getPosters = localStorage.getItem(ACTIONS.LOAD_POSTER_SEASON);
		const objPosters = getPosters && getPosters.length > 0 ? JSON.parse(getPosters) : [];
		const seasonPoster = objPosters.filter(season => season.imdbId === imdbID);

		if (seasonPoster.length === 0) loadPosterSeason(imdbID);
		return seasonPoster.length !== 0 ? <img className='img-poster' src={seasonPoster[0].img} /> : <NoImage />;
	}

	render() {
		const { state, history, showSerie } = this.props;
		const { loading, series, error, errorMessage } = state;

		if (error) return <div>{errorMessage}</div>;
		if (loading) return <div>CARREGANDO...</div>;

		if (series.length > 0) getPosterSeason(series[0].imdbId)

		return (
			<div className='series row flex-wrap space-around'>
				{series.map(serie => (
					<div className='card-season item' key={serie.id} onClick={() =>{ showSerie(serie.id); history.push(`/calcular/${serie.id}`)} }>
						<div className='card-code'>{serie.imdbId}</div>
						<div className='card-poster'>{this.renderPoster(serie.imdbId, serie.img)}</div>
						<div className='card-title'>{serie.title}</div>
						<div className='card-seadons'>
							<div>{`Seasons: ${serie.numberOfSeasons}`}</div>
							<div>{`Date: ${serie.releaseDate}`}</div>
						</div>

					</div>
				))}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return { state: state.mainReducer };
};

const mapDispatchToProps = dispatch =>
	bindActionCreators({ loadingSeries, showSerie, loadPosterSeason }, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(ListSeries));
