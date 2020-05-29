import { SIGNUP_MUTATION } from "../../graphql/mutations/signup";
import { graphql } from "react-apollo";
import * as compose from "lodash.flowright";
import React, { Component } from "react";

export class SignUpComponent extends Component {
  state = {
    username: "",
    email: "",
    password: "",
  };
  handleInputChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };
  render() {
    const { username, email, password } = this.state;
    return (
      <div>
        <form>
          <input
            name='username'
            placeholder='username'
            value={username}
            onChange={this.handleInputChange}
          />
          <input
            name='email'
            placeholder='email'
            value={email}
            onChange={this.handleInputChange}
          />
          <input
            name='password'
            placeholder='password'
            value={password}
            onChange={this.handleInputChange}
          />
        </form>
      </div>
    );
  }
}
export default compose(graphql(SIGNUP_MUTATION))(SignUpComponent);
