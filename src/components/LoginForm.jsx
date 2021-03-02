import React from "react";
import LoginMessage from "./LoginMessage";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      serverResponse: null
    };
  }

  _onChange = (field, value) => {
    this.setState({
      [field]: value
    });
  };

  _handleSubmit = (event) => {
    event.preventDefault();
    const serverResponse = this.props.handleSubmit(
      this.state.username,
      this.state.password
    );
    this.setState(
      {
        serverResponse
      },
      () => {
        console.log("Server response is:", serverResponse);
      }
    );
  };

  render() {
    return (
      <>
        <form onSubmit={this._handleSubmit}>
          <label>
            Username:{" "}
            <input
              type="text"
              name="username"
              placeholder="your username"
              value={this.state.username}
              onChange={(event) => {
                this._onChange("username", event.target.value);
              }}
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              name="password"
              placeholder="your password"
              value={this.state.password}
              onChange={(event) => {
                this._onChange("password", event.target.value);
              }}
            />
          </label>
          <button type="submit">Login</button>
        </form>
        {!!this.state.serverResponse ? (
          <LoginMessage
            isValid={this.state.serverResponse.isValid}
            message={this.state.serverResponse.message}
          />
        ) : null}
      </>
    );
  }
}

export default LoginForm;
