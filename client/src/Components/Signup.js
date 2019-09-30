import React, { Component } from "react";
import { registerUser } from "../Actions/authActions";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Signup extends Component {
  state = {
    name: "",
    emails: "",
    passwords: "",
    cpasswords: ""
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  SignUpSubmit = e => {
    e.preventDefault();

    const newUser = {
      email: this.state.emails,
      password: this.state.passwords,
      name: this.state.name
    };
    this.props.registerUser(newUser, this.props.history);
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/blogs");
    }
  }

  render() {
    const loginStyle = {
      padding: "10px",
      border: "5px solid #d9534f",
      margin: "0",
      backgroundColor: "#d9d6d2",
      boxShadow: "10px 10px 5px grey",
      fontFamily: "Comic Sans MS"
    };
    return (
      <div className="container" align="center">
        <br />
        <br />
        <br />
        <br />
        <div className="col-md-8" style={loginStyle}>
          <form onSubmit={this.SignUpSubmit}>
            <div class="form-group">
              <h3>SignUp</h3>
              <label className="float-left" for="email">
                Name:
              </label>
              <input
                value={this.state.name}
                onChange={this.onChange}
                name="name"
                type="text"
                class="form-control"
                id="name"
                placeholder="Name"
              />
              <label className="float-left" for="email">
                Email address:
              </label>
              <input
                value={this.state.emails}
                onChange={this.onChange}
                name="emails"
                type="email"
                class="form-control"
                id="email"
                placeholder="Email Address"
              />
              <label className="float-left" for="pwd">
                Password:
              </label>
              <input
                value={this.state.passwords}
                onChange={this.onChange}
                name="passwords"
                type="password"
                class="form-control"
                id="pwd"
                placeholder="Passsword"
              />
            </div>
            <div class="form-group">
              <br />
              <div align="left">
                <button type="submit" class="btn btn-danger">
                  SignUp
                </button>
                &nbsp;&nbsp;Already have a account..
                <Link to="/login">Login here</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStatetoProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStatetoProps,
  { registerUser }
)(withRouter(Signup));
