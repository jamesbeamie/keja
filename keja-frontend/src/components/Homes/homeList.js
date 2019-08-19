import React from 'react';
import HomeItem from './homeItem';
import '../../assets/styling/homeList.css';

const HomeList = (props) => {
	// can also use () then call this.props
	const fetchedHomes = props.homes.map((home) => {
		console.log(props.homes);
		return (
			<HomeItem
				key={home._id}
				homeid={home._id}
				name={home.name}
				price={home.price}
				owner={home.creator._id}
				user={props.authorisedUser}
			/>
		);
	});
	return <ul className="home_list">{fetchedHomes}</ul>;
};

export default HomeList;
