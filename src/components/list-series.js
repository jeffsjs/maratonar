import React, { Component } from 'react';
import { withRouter } from 'react-router';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadingSeries, showSerie } from '../actions/actions';

class ListSeries extends Component {
	componentDidMount() {
		const { loadingSeries } = this.props;
		loadingSeries();
	}

	render() {
		const { state, history, showSerie } = this.props;
		const { loading, series, error, errorMessage } = state;

		if (error) return <div>{errorMessage}</div>;
		if (loading) return <div>CARREGANDO...</div>;

		return (
			<div className='series'>
				{series.map(serie => (
					<div key={serie.id} onClick={() =>{ showSerie(serie.id); history.push(`/calcular/${serie.id}`)} }>{serie.title}</div>
				))}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return { state: state.mainReducer };
};

const mapDispatchToProps = dispatch =>
	bindActionCreators({ loadingSeries, showSerie }, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(ListSeries));
