import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllBlogs, addComment } from "../Actions/blogActions";
import { loginUser } from "../Actions/authActions";
import { Link } from "react-router-dom";

class Blogs extends Component {
  state = {
    blogs: null,
    comment: "",
    error: ""
  };

  componentDidMount() {
    // if (localStorage.jwtToken) {
    //   let Object = localStorage.getItem("jwtToken");
    //   Object = JSON.parse(Object);
    //   // console.log(Object);

    //   const obj = {
    //     email: Object.email,
    //     password: Object.password
    //   };

    //   this.props.loginUser(obj);
    // }
    this.props.getAllBlogs();
  }

  componentWillReceiveProps(next) {
    this.setState({ blogs: next.blog.blogs });
  }

  NotAuth = i => {
    if (this.state.blogs == null) {
      return <div>LOADING...</div>;
    }
  };
  render() {
    let { blogs } = this.props.blog;

    const blogStyle = {
      padding: "10px",
      border: "5px solid #d9534f",
      margin: "0",
      backgroundColor: "white"
    };

    const textarea = {
      backgroundColor: "#d9d6d2",
      fontSize: "20px"
    };

    const color = {
      color: "red"
    };

    return (
      <div className="container">
        <h1>All Blogs</h1>
        <br />
        {this.NotAuth()}
        {this.props.auth.isAuthenticated
          ? this.props.blog.blogs.map(blog => {
              // console.log(blog);

              return (
                <div key={blog._id}>
                  <div style={blogStyle} className="row">
                    <div className="col-md-3">
                      <img src={require("./i.png")}></img>
                      <br />
                      <br />

                      <h4>
                        <b> {blog.user.name}</b>
                      </h4>
                    </div>
                    <div className="col-md-9">{blog.blogContent} </div>
                    <textarea
                      className="form-control"
                      style={textarea}
                      placeholder="Add a Comment"
                      value={this.state.comment}
                      onChange={e => {
                        this.setState({ comment: e.target.value });
                      }}
                    ></textarea>
                    <br />{" "}
                    {this.state.error != "" ? (
                      <div class="alert alert-danger">
                        <strong>{this.state.error}</strong>
                        <br />
                      </div>
                    ) : (
                      ""
                    )}
                    <div>
                      <button
                        onClick={() => {
                          if (
                            this.state.comment === null ||
                            this.state.comment === ""
                          ) {
                            this.setState({
                              error: "Please write something"
                            });
                          } else {
                            const obj = {
                              text: this.state.comment
                            };
                            this.props.addComment(obj, blog._id);
                            this.setState({
                              comment: ""
                            });
                          }
                        }}
                        className="btn btn-danger"
                      >
                        Comment
                      </button>
                    </div>
                    <Link to={`/blogs/${blog._id}`}>
                      <button className="btn">
                        <span style={color}>View All Comments</span>
                      </button>
                    </Link>
                  </div>
                  <br />
                  <br />
                </div>
              );
            })
          : this.props.blog.blogs.map(blog => {
              // console.log(blog);

              return (
                <div>
                  <div style={blogStyle} className="row">
                    <div className="col-md-3">
                      <img src={require("./i.png")}></img>
                      <br />
                      <br />

                      <h4>
                        <b> {blog.user.name}</b>
                      </h4>
                    </div>
                    <div className="col-md-9">{blog.blogContent} </div>

                    <br />
                    <Link to={`/blogs/${blog._id}`}>
                      <button className="btn">
                        <span style={color}>View All Comments</span>
                      </button>
                    </Link>
                  </div>
                  <br />
                  <br />
                </div>
              );
            })}
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
  { getAllBlogs, loginUser, addComment }
)(Blogs);
