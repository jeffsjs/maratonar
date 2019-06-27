import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadingSeries } from '../actions/actions';

class ListSeries extends Component {
	componentDidMount() {
		const { loadingSeries } = this.props;
		loadingSeries();
	}

	render() {
		const { loading, series, error, errorMessage } = this.props.state;

		if (error) return <div>{errorMessage}</div>;
		if (loading) return <div>CARREGANDO...</div>;

		return (
			<div className='series'>
				{series.map(serie => (
					<div key={serie.id}>{serie.title}</div>
				))}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return { state: state.mainReducer };
};

const mapDispatchToProps = dispatch =>
	bindActionCreators({ loadingSeries }, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ListSeries);
