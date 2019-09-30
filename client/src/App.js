import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import PrivateRoute from "./PrivateRoute.jsx";
import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./Reducers/index.js";
import * as authActions from "./Actions/authActions.js";

// LOADING COMPONENTS
import Navbar from "./Components/Navbar";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Blogs from "./Components/Blogs";
import CreateBlog from "./Components/CreateBlog";
import Comments from "./Components/Comments";

//SETTING UP THE STORE
const initialState = {};
// const middleware = [thunk];
const stores = createStore(rootReducer, applyMiddleware(thunk));

if (localStorage.jwtToken) {
  let Object = localStorage.getItem("jwtToken");
  Object = JSON.parse(Object);
  // console.log(Object);

  const obj = {
    email: Object.email,
    password: Object.password
  };

  stores.dispatch(authActions.loginUser(obj));
}

class App extends Component {
  // componentDidMount() {
  //   if (localStorage.jwtToken) {
  //     let Object = localStorage.getItem("jwtToken");
  //     Object = JSON.parse(Object);
  //     // console.log(Object);

  //     const obj = {
  //       email: Object.email,
  //       password: Object.password
  //     };

  //     stores.dispatch(loginUser(obj));
  //   }
  // }
  render() {
    return (
      <Provider store={stores}>
        <Router>
          <div>
            <Route path="/" component={Navbar} />
            <Route exact path="/" component={Login} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/blogs" component={Blogs}></Route>
            <Route exact path="/blogs/:id" component={Comments}></Route>
            <Switch>
              <Route path="/createBlog" component={CreateBlog}></Route>
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
