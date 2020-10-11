import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";

import { toast } from "react-toastify";
import Form from 'react-bootstrap/Form';

const Login = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    mail: "",
    password: ""
  });

  const { mail, password } = inputs;

  const onChange = e =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body = { mail, password };
      const response = await fetch(
        "/authentication/login",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify(body)
        }
      );

      const parseRes = await response.json();

      if (parseRes.jwtToken) {
        localStorage.setItem("token", parseRes.jwtToken);
        setAuth(true);
        toast.success("Logged in Successfully");
      } else {
        setAuth(false);
        toast.error(parseRes);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <h1 className="mt-5 text-center">Login</h1>
      <Form onSubmit={onSubmitForm}>
        <input
          type="text"
          name="mail"
          value={mail}
          onChange={e => onChange(e)}
          className="form-control my-3"
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={e => onChange(e)}
          className="form-control my-3"
        />
        <button class="btn btn-success btn-block">Submit</button>
      </Form>
      <Link to="/register">register</Link>
    </Fragment>
  );
};

export default Login;
