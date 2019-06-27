import React, { Component, Fragment } from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect
} from 'react-router-dom';

import Home from './pages/home';
import Calcular from './pages/calcular';

// import './styles/app.css'

class Routes extends Component {
	render() {
		return (
			<Router>
				<Fragment>
					<Switch>
						<Route exact path='/' component={() => <Home />} />
						<Route exact path='/calcular/:idSerie' component={Calcular} />
						<Redirect from='*' to='/' />
					</Switch>
				</Fragment>
			</Router>
		);
	}
}

export default Routes;
