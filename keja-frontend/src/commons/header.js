import React from 'react';
import { NavLink } from 'react-router-dom';
import '../assets/styling/navbar.css';
import loginContext from '../containers/context/loginContext';

const Header = () => {
	return (
		<loginContext.Consumer>
			{(context) => {
				return (
					<header className="navigation-bar">
						<div className="navigation-bar_logo">
							<h4>keja</h4>
						</div>
						<nav className="navigation-bar_links">
							<ul>
								<li>
									<NavLink to="/" exact>
										Home
									</NavLink>
									{' | '}
									<NavLink to="/homes" exact>
										Homes
									</NavLink>
									{' | '}
									{context.token && (
										<NavLink to="/bookings" exact>
											Bookings
										</NavLink>
									)}
								</li>
								{context.token && (
									<li>
										<button onClick={context.logout}>logout</button>
									</li>
								)}
							</ul>
						</nav>
					</header>
				);
			}}
		</loginContext.Consumer>
	);
};

export default Header;
