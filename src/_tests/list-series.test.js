import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import ListSeries from '../components/list-series';

import configureStore from 'redux-mock-store';
const mockStore = configureStore();

const initialState = {	
		loading: false,
		error: false,
		errorMessage: '',
		series: [
			{
				id: '3',
				imdbId: 'tt0475784',
				title: 'Westworld',
				numberOfSeasons: 3,
				releaseDate: '2017-01-28'
			},
			{
				id: '5',
				imdbId: 'tt6468322',
				title: 'La Casa de Papel',
				numberOfSeasons: 3,
				releaseDate: '2017-08-28'
			},
			{
				id: '6',
				imdbId: 'tt0098936',
				title: 'Twin Peaks',
				numberOfSeasons: 2,
				releaseDate: '1991-08-03',
				img:
					'https://m.media-amazon.com/images/M/MV5BMTExNzk2NjcxNTNeQTJeQWpwZ15BbWU4MDcxOTczOTIx._V1_SX300.jpg'
			}
		],
		seasons: [],
		episodes: [],
		selectedSerie: '3',
		dateStart: '',
		dateNextEpisode: '',
		nextEpisode: [],
		marathonDuration: 0,
		daysToNextEpisode: 0,
		minutesToNextEpisode: 0,
		hoursToNextEpisode: 0

};

const store = mockStore(initialState);

describe('ListSeries component', () => {
	it('Render ListSeries', () => {
		const wrapper = shallow(<ListSeries store={store} />).dive();
		expect(toJson(wrapper)).toMatchSnapshot();
	});
});
