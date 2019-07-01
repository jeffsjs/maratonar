import React, { Component } from 'react';
import { withRouter } from 'react-router';

import NextEpisode from '../components/next-episode';

import { ReactComponent as Icon } from '../imgs/calendar-day.svg';

class Calcular extends Component {
	render() {
    const { history } = this.props;
		const { idSerie } = this.props.match.params;
		return (
			<div className='home'>
				<div className='header'>
					<h1 className='row row-reverse space-between'>
						<span><Icon /> Calcular</span>
						<button className='btn' onClick={() => history.push('/')}>Home</button>
					</h1>
				</div>
				<NextEpisode idSerie={idSerie} />
			</div>
		);
	}
}

export default withRouter(Calcular);
