import React, { Component } from 'react';
import { withRouter } from 'react-router';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getSerieByID, getSeasons } from '../actions/actions';

class NextEpisode extends Component {
	componentDidMount() {
		const { state, idSerie, getSerieByID, getSeasons } = this.props;
		if (state.selectedSerie !== idSerie) getSerieByID(idSerie);
		getSeasons(idSerie);
	}

	render() {
    const { state, history, idSerie } = this.props;
		const { loading, seasons, error, errorMessage } = state;

		if (error) return <div>{errorMessage}</div>;
		if (loading) return <div>CARREGANDO...</div>;

		return (
			<div className='seasons'>
				{seasons.map(season => <div key={season.id}>{`Temporada: ${season.id}, Data: ${season.releaseDate}`}</div>)}
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
