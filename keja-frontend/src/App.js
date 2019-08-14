import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import './App.css';
import AuthPage from './containers/auth';
import LoginPage from './containers/login';
import BookingsPage from './containers/bookings';
import HomesPage from './containers/homes';
import Home from './containers/homePage';
import Header from './commons/header';
import loginContext from './containers/context/loginContext';
import PageNotFound from './commons/PageNotFound';

class App extends Component {
	state = {
		token: null,
		userId: null,
		tokenExpires: 0
	};

	login = (token, userId, tokenExpires) => {
		this.setState({
			token: token,
			userId: userId,
			tokenExpires: tokenExpires
		});
	};
	logout = () => {
		this.setState({
			token: null,
			userId: null,
			tokenExpires: 0.00001
		});
	};

	render() {
		const { token, userId } = this.state;
		return (
			<loginContext.Provider
				value={{
					token: token,
					userId: userId,
					login: this.login,
					logout: this.logout
				}}
			>
				<div>
					<Header />
					<Switch>
						<Redirect from="/" to="/home" exact />
						<Route path="/home" component={Home} />
						{!token && <Route path="/signup" component={AuthPage} />}
						{!token && <Route path="/login" component={LoginPage} />}
						<Route path="/homes" component={HomesPage} />
						{token && <Route path="/bookings" component={BookingsPage} />}
						<Route component={PageNotFound} />
					</Switch>
				</div>
			</loginContext.Provider>
		);
	}
}

export default App;
