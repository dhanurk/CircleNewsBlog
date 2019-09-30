import axios from "axios";

export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/users/register", userData)
    .then(res => history.push("/login"))
    .catch(err => {
      console.log(err);
      dispatch({
        type: "GET_ERRORS",
        payload: err.response.data
      });
    });
};

export const loginUser = userData => dispatch => {
  axios
    .post("/users/login", userData)
    .then(res => {
      //   let user = {};
      axios.get("/users/current").then(data => {
        // console.log(data.data);
        localStorage.setItem("jwtToken", JSON.stringify(data.data));
        let obj = {
          _id: data.data._id,
          name: data.data.name,
          email: data.data.email
        };
        dispatch(setCurrentUser(obj));
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

export const setCurrentUser = decoded => {
  return {
    type: "SET_CURRENT_USER",
    payload: decoded
  };
};

export const logoutUser = () => dispatch => {
  localStorage.removeItem("jwtToken");
  dispatch(setCurrentUser({}));
};
