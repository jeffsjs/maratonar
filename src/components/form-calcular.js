import React, { Component } from 'react';
import { withRouter } from 'react-router';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadingSeries } from '../actions/actions';

class FormCalcular extends Component {
	componentDidMount() {

	}

	render() {
		const { state, history } = this.props;
		debugger
		const { loading, series, error, errorMessage } = state;

		if (error) return <div>{errorMessage}</div>;
		if (loading) return <div>CARREGANDO...</div>;

		return (
			<div className='series'>
				{series.map(serie => (
					<div key={serie.id} onClick={() => history.push(`/calcular/${serie.id}`) }>{serie.title}</div>
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
)(FormCalcular);
