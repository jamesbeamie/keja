import React, { Component } from 'react';
import '../assets/styling/homes.css';
import Modal from '../commons/modal';
import Backdrop from './backdrop/backdrop';
import loginContext from '../containers/context/loginContext';
import HomeList from '../components/Homes/homeList';
import Spinner from '../commons/Spinner';
class HomesPage extends Component {
	state = {
		creating: false,
		homeArray: [],
		isLoading: false
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
					throw new Error('Error creating Home');
				}
				return res.json();
			})
			.then((resData) => {
				console.log('resData', resData);
				// this.fetchHomes();
				this.setState((prevState) => {
					const updatedArray = [ ...prevState.homeArray ];
					updatedArray.push({
						_id: resData.data.addHome._id,
						name: resData.data.addHome.name,
						homeType: resData.data.addHome.homeType,
						price: resData.data.addHome.price,
						creator: {
							_id: this.context.userId
						}
					});
					return { homeArray: updatedArray };
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};

	fetchHomes = () => {
		this.setState({ isLoading: true });
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
					throw new Error('Error creating Home');
				}
				return res.json();
			})
			.then((resData) => {
				console.log('fetchedData', resData);
				const homes = resData.data.homes;
				this.setState({
					homeArray: homes,
					isLoading: false
				});
			})
			.catch((err) => {
				console.log(err);
				this.setState({
					isLoading: false
				});
			});
	};

	render() {
		const { creating, homeArray, isLoading } = this.state;
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
				{isLoading ? <Spinner /> : <HomeList homes={homeArray} authorisedUser={this.context.userId} />}
			</React.Fragment>
		);
	}
}

export default HomesPage;
