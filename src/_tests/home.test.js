import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Home from '../pages/home';

describe('Home component', () => {
	it('Render Home', () => {
		const wrapper = shallow(<Home />);
		expect(toJson(wrapper)).toMatchSnapshot();
	});
});
