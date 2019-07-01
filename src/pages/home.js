import React, { Component } from 'react';

import { ReactComponent as Logo } from '../imgs/calendar-alt.svg';
import ListSeries from '../components/list-series';

class Home extends Component {
	render() {
		return (
			<div className='home'>
				<div className='header'>
					<h1 className='row row-reverse'>
						<div className='logo'>
							<Logo /> Maratornar App
						</div>
					</h1>
				</div>

				<div className='row'>
					<h2>Seasons</h2>
				</div>
				<ListSeries />
			</div>
		);
	}
}
export default Home;
