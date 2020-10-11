import React, { Fragment, useState, useEffect } from "react";

import "react-toastify/dist/ReactToastify.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import { toast } from "react-toastify";

//components

import Login from "./components/Login";
import Register from "./components/Register";
import Main from "./components/Main";
import Admin from "./components/Admin"




toast.configure();

function App() {
  const checkAuthenticated = async () => {
      
    try {
      const res = await fetch("http://localhost:3001/authentication/verify", {
        method: "POST",
        headers: { jwtToken: localStorage.token }
      });

      

      const parseRes = await res.json();

      console.log(parseRes);
      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    checkAuthenticated();
  }, []);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = boolean => {
    setIsAuthenticated(boolean);
  };

  return (
    <Fragment>
      <Router>
        <div className="container">
          <Switch>
            <Route
              exact
              path="/login"
              render={props =>
                !isAuthenticated ? (
                  <Login {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/" />
                )
              }
            />
            <Route
              exact
              path="/register"
              render={props =>
                !isAuthenticated ? (
                  <Register {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/" />
                )
              }
            />
            <Route
              exact
              path="/"
              render={props =>
                isAuthenticated ? (
                  <Main {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              exact
              path="/Admin"
              render={props =>
                isAuthenticated ? (
                  <Admin {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />


          </Switch>
        </div>
      </Router>
    </Fragment>
  );
}

export default App;
