import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import './App.css';
import AuthPage from './containers/auth';
import BookingsPage from './containers/bookings';
import HomesPage from './containers/homes';

function App() {
	return (
		<div>
			<Switch>
				<Redirect from="/" to="/home" exact />
				<Route path="/home" component={null} />
				<Route path="/auth" component={AuthPage} />
				<Route path="/homes" component={HomesPage} />
				<Route path="/bookings" component={BookingsPage} />
			</Switch>
		</div>
	);
}

export default App;
