import React, { Component } from 'react';
import '../assets/styling/homes.css';
import Modal from '../commons/modal';
import Backdrop from './backdrop/backdrop';
class HomesPage extends Component {
	state = {
		creating: false
	};

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
	};

	render() {
		const { creating } = this.state;
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
						<p>Modal yangu</p>
					</Modal>
				)}
				<div className="home-control">
					<h4>Add Home</h4>
					<button onClick={this.handleCreateHome}> Create Home</button>
				</div>
			</React.Fragment>
		);
	}
}

export default HomesPage;
