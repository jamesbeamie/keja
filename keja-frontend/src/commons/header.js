import React from 'react';
import { NavLink } from 'react-router-dom';
import '../assets/styling/navbar.css';

const Header = () => {

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
						<NavLink to="/bookings" exact>
							Bookings
						</NavLink>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default Header;
