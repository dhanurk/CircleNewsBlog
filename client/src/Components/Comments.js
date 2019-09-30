import React, { Component } from "react";
import { getComments } from "../Actions/blogActions";
import { loginUser } from "../Actions/authActions";
import { connect } from "react-redux";

class Comments extends Component {
  state = {
    blog: null
  };

  componentDidMount() {
    // if (localStorage.jwtToken) {
    //   let Object = localStorage.getItem("jwtToken");
    //   Object = JSON.parse(Object);
    //   const obj = {
    //     email: Object.email,
    //     password: Object.password
    //   };

    //   this.props.loginUser(obj);
    // }
    this.props.getComments(this.props.match.params.id);
  }

  componentWillReceiveProps(next) {
    console.log(next.blog);

    this.setState({ blog: next.blog.blog });
  }
  NotAuth = () => {
    if (this.state.blogs === null) {
      return <div>LOADING...</div>;
    }
  };

  render() {
    // const { comments } = this.props.blog;
    const commentss = {
      padding: "10px",
      border: "5px solid #d9534f",
      margin: "0",
      backgroundColor: "white"
    };

    return (
      <div className="container">
        {/* {this.NotAuth()} */}
        {this.state.blog === null ? (
          <div>LOADING...</div>
        ) : (
          this.state.blog.comments.map(comment => {
            return (
              <div key={comment._id}>
                <br />
                <div style={commentss}>
                  {comment.text}
                  {/* <div align="right">
                      <i>Comment by - </i>
                      <b>Dhanur Khurana</b>
                    </div> */}
                </div>
              </div>
            );
          })
        )}
      </div>
    );
  }
}

const mapStatetoProps = state => ({
  auth: state.auth,
  blog: state.blog,
  errors: state.errors
});

export default connect(
  mapStatetoProps,
  { loginUser, getComments }
)(Comments);
