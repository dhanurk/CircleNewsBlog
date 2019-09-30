import React, { Component } from "react";
import { newBlog } from "../Actions/blogActions";
import { setCurrentUser, loginUser } from "../Actions/authActions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class CreateBlog extends Component {
  state = {
    blog: ""
  };

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
  //     if (!this.props.auth.isAthenticated) {
  //       // this.props.history.push("/login");
  //     }
  //   }
  // }

  onChange = e => {
    this.setState({
      blog: e.target.value
    });
  };

  Submit = () => {
    const Blog = {
      text: this.state.blog
    };
    this.props.newBlog(Blog, this.props.history);
  };

  render() {
    const textArea = {
      backgroundColor: "#ed9595",
      fontSize: "23px"
    };
    return (
      <div className="container">
        <h2 align="center">Write a Blog</h2>
        <br />
        <textarea
          style={textArea}
          className="col-md-12"
          rows="25"
          placeholder="Enter your BLOG here"
          value={this.state.blog}
          onChange={this.onChange}
        ></textarea>
        <div>
          <br />
          <button
            className="float-right btn btn-lg btn-danger"
            onClick={this.Submit}
          >
            Submit
          </button>
          <br />
        </div>
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
  { newBlog, setCurrentUser, loginUser }
)(CreateBlog);
