import React, { Component } from 'react';
import '../assets/styling/homes.css';
import Modal from '../commons/modal';
import Backdrop from './backdrop/backdrop';
import loginContext from '../containers/context/loginContext';
class HomesPage extends Component {
	state = {
		creating: false,
		homeArray: []
	};

	constructor(props) {
		super(props);

		this.nameEl = React.createRef();
		this.homeTypeEl = React.createRef();
		this.priceEl = React.createRef();
	}

	componentDidMount() {
		this.fetchHomes();
	}

	static contextType = loginContext;

	handleCreateHome = () => {
		this.setState({
			creating: true
		});
	};

	handleCancel = () => {
		this.setState({
			creating: false
		});
	};

	handleConfirm = () => {
		this.setState({
			creating: false
		});
		const name = this.nameEl.current.value;
		const homeType = this.homeTypeEl.current.value;
		const price = +this.priceEl.current.value;

		// validation

		if (name.trim().length === 0 || homeType.trim().length === 0 || price <= 0) {
			return;
		}
		const home = { name, homeType, price };
		console.log('kejas', home);
		const requestBody = {
			query: `
                mutation {
                    addHome(homeInput: {name: "${name}", homeType: "${homeType}", price: ${price}}){
                        _id
   						name
    					homeType
    					price
    					creator{
							_id
							email
						}
                    }
                }
            `
		};

		// get token from context

		const token = this.context.token;
		// acces api
		fetch('http://localhost:3001/graphql', {
			method: 'POST',
			body: JSON.stringify(requestBody),
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + token
			}
		})
			.then((res) => {
				if (res.status !== 200 && res.status !== 201) {
					throw new Error('Error creating blog');
				}
				return res.json();
			})
			.then((resData) => {
				console.log('resData', resData);
				this.fetchHomes();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	fetchHomes = () => {
		const requestBody = {
			query: `
                query {
                    homes{
                        _id
   						name
    					homeType
    					price
    					creator{
							_id
							email
						}
                    }
                }
            `
		};

		// acces api
		fetch('http://localhost:3001/graphql', {
			method: 'POST',
			body: JSON.stringify(requestBody),
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then((res) => {
				if (res.status !== 200 && res.status !== 201) {
					throw new Error('Error creating blog');
				}
				return res.json();
			})
			.then((resData) => {
				console.log('fetchedData', resData);
				const homes = resData.data.homes;
				this.setState({
					homeArray: homes
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};

	render() {
		const { creating, homeArray } = this.state;
		const fetchedHomes = homeArray.map((home) => {
			return (
				<li key={home._id} className="home_list-item">
					{home.name}
				</li>
			);
		});
		return (
			<React.Fragment>
				{creating && <Backdrop />}
				{creating && (
					<Modal
						title="Add keja"
						canCancel
						canConfirm
						onCancel={this.handleCancel}
						onConfirm={this.handleConfirm}
					>
						<form>
							<div className="form-control">
								<label htmlFor="name">Name</label>
								<input type="text" id="name" ref={this.nameEl} />
							</div>
							<div className="form-control">
								<label htmlFor="homeType">homeType</label>
								<input type="text" id="homeType" ref={this.homeTypeEl} />
							</div>
							<div className="form-control">
								<label htmlFor="price">Price</label>
								<input type="text" id="price" ref={this.priceEl} />
							</div>
						</form>
					</Modal>
				)}
				{this.context.token && (
					<div className="home-control">
						<h4>Add Home</h4>
						<button onClick={this.handleCreateHome}> Create Home</button>
					</div>
				)}
				<ul className="home_list">{fetchedHomes}</ul>
			</React.Fragment>
		);
	}
}

export default HomesPage;
