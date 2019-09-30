import axios from "axios";

export const newBlog = (blog, history) => dispatch => {
  axios
    .post("/blog", blog)
    .then(data => {
      history.push("/blogs");
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: "GET_ERRORS",
        payload: err.response.data
      });
    });
};

export const getAllBlogs = () => dispatch => {
  axios
    .get("/blog")
    .then(res =>
      dispatch({
        type: "GET_BLOGS",
        payload: res.data
      })
    )
    .catch(err => console.log(err));
};

export const addComment = (comment, id) => dispatch => {
  axios
    .post(`/blog/comment/${id}`, comment)
    .then(res => {
      dispatch({
        type: "ADD_COMMENT",
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);

      dispatch({
        type: "GET_ERRORS",
        payload: err.response.data
      });
    });
};

export const getComments = id => dispatch => {
  axios
    .get(`/blog/${id}`)
    .then(res => {
      dispatch({
        type: "GET_COMMENTS",
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: "GET_ERRORS",
        payload: err.response.data
      });
    });
};
