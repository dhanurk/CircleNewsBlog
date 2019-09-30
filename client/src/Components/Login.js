import React, { Component } from "react";
import { loginUser, registerUser } from "../Actions/authActions";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Login extends Component {
  state = {
    email: "",
    password: ""
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/blogs");
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  };
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/blogs");
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  LoginSubmit = e => {
    e.preventDefault();

    const User = {
      email: this.state.email,
      password: this.state.password
    };
    // this.setState({
    //   email:'',
    //   password:''
    // })

    this.props.loginUser(User);
  };

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
          <form onSubmit={this.LoginSubmit}>
            <div class="form-group">
              <h3>Login</h3>

              <label className="float-left" for="email">
                Email address:
              </label>
              <input
                type="email"
                class="form-control"
                id="email"
                placeholder="Email Address"
                name="email"
                value={this.state.email}
                onChange={this.onChange}
              />
            </div>
            <div class="form-group">
              <label className="float-left" for="pwd">
                Password:
              </label>
              <input
                value={this.state.password}
                onChange={this.onChange}
                name="password"
                type="password"
                class="form-control"
                id="pwd"
                placeholder="Passsword"
              />
              <br />
              <div align="left">
                <button type="submit" class="btn btn-danger">
                  Login
                </button>
                &nbsp;&nbsp;&nbsp;
                <span>
                  No Account ? <Link to="/signup">SignUp here</Link>
                </span>
              </div>
            </div>
          </form>
        </div>

        {/* <br /> */}
        <br />
        <br />
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
  { loginUser, registerUser }
)(withRouter(Login));
