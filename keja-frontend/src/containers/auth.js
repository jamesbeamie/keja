import React, { Component } from 'react';
import '../assets/styling/auth.css';
class AuthPage extends Component {
	state = {
		isLogin: true
	};

	constructor(props) {
		super(props);

		// create refs to link input fields
		this.emailEl = React.createRef();
		this.passwordEl = React.createRef();
		this.nameEl = React.createRef();
	}

	handleSignUp = (event) => {
		event.preventDefault();
		const username = this.nameEl.current.value;
		const email = this.emailEl.current.value;
		const password = this.passwordEl.current.value;

		if (email.trim().length === 0 || password.trim().length === 0) {
			return;
		}

		const requestBody = {
			query: `
                mutation {
                    createUser(userInput: {email: "${email}", password: "${password}", userName: "${username}"}){
                        _id
                        userName
                        email
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
					throw new Error('Signup failed');
				}
			})
			.catch((err) => {
				console.log(err);
			});
		console.log(email, password);
	};

	render() {
		return (
			<form className="auth-form" onSubmit={this.handleSignUp}>
				<div className="form-control">
					<label htmlFor="userName">Username:</label>
					<input type="text" id="userName" ref={this.nameEl} />
				</div>
				<div className="form-control">
					<label htmlFor="email">E-mail:</label>
					<input type="email" id="email" ref={this.emailEl} />
				</div>
				<div className="form-control">
					<label htmlFor="password">Password:</label>
					<input type="password" id="password" ref={this.passwordEl} />
				</div>
				<div className="form-actions">
					<button type="submit">Signup</button>
					<a href="/">Or login</a>
				</div>
			</form>
		);
	}
}

export default AuthPage;
