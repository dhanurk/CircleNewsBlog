import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { loginUser } from "../Actions/authActions";
import { logoutUser } from "../Actions/authActions.js";

class Navbar extends Component {
  state = {
    isAuthenticated: false,
    user: "Madhav"
  };

  //LOGGING USER AUTOMATICALLY
  // if (localStorage.jwtToken) {
  //   let Object = localStorage.getItem("jwtToken");
  //   Object = JSON.parse(Object);

  // this.props.setCurrentUser(Object);

  //   stores.dispatch(setCurrentUser(Object));
  // }
  // componentDidMount() {
  //   if (localStorage.jwtToken) {
  //     let Object = localStorage.getItem("jwtToken");
  //     Object = JSON.parse(Object);
  //     // console.log(Object);

  //     const obj = {
  //       email: Object.email,
  //       password: Object.password
  //     };

  //     this.props.loginUser(obj);
  //   }
  // }

  logout = () => {
    this.props.logoutUser();
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;
    // const isAuthenticated = this.state.isAuthenticated;

    const authLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="active nav-link" to="/blogs">
            All Blogs
          </Link>
        </li>
        <li className="nav-item">
          <Link className="active nav-link" to="/createBlog">
            Create Blog
          </Link>
        </li>
        <li className="active nav-item">
          <span
            style={{
              color: "white",
              position: "relative",
              top: "8px",
              left: "7px",
              cursor: "pointer"
            }}
            onClick={this.logout}
          >
            Logout
          </span>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="active nav-link" to="/blogs">
            All Blogs
          </Link>
        </li>
        <li className="nav-item">
          <Link className="active nav-link" to="/login">
            Login
          </Link>
        </li>
      </ul>
    );

    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-danger mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">
            BlogApp
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </div>
      </nav>
    );
  }
}

const mapStatetoProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStatetoProps,
  { loginUser, logoutUser }
)(Navbar);
