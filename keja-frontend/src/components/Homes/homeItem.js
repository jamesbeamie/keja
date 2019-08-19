import React from 'react';
import '../../assets/styling/homeItem.css';

const HomeItem = (props) => (
	<li key={props.homeid} className="home_list-item">
		<div>
			<h3>Name: {props.name}</h3>
			<h5>Price: Ksh {props.price}</h5>
		</div>
		<div>
			{props.user === props.owner ? (
				<React.Fragment>
					<p>You're the owner</p>
					<button className="btn" onClick={props.onDetail.bind(this, props.homeid)}>
						View home
					</button>
				</React.Fragment>
			) : (
				<button className="btn" onClick={props.onDetail.bind(this, props.homeid)}>
					View home
				</button>
			)}
		</div>
	</li>
);

export default HomeItem;
