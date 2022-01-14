import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import isEmail from "validator/lib/isEmail";
import isEmpty from "validator/lib/isEmpty";
import { showErrorMessage } from "../components/helpers/message";
import { showLoading } from "../components/helpers/loading";
import { signin } from "../api/auth";
import {
  setAuthentication,
  isAuthenticated,
} from "../components/helpers/clientAuth";
import "./SignIn.css";

function SignIn() {
  let history = useHistory();
  const [formData, setFormData] = useState({
    email: "joe@gmail.in",
    password: "kkkeeeee",
    errorMsg: false,
    loading: false,
    //redirectToDashboard: false,     //didn't need it....
  });
  useEffect(() => {
    if (isAuthenticated() && isAuthenticated().role === 1) {
      console.log("Redirecting to admin dashboard....");
      history.push("/admin/dashboard");
    } else if(isAuthenticated() && isAuthenticated().role === 0){
      console.log("Redirecting to user dashboard....");
      history.push("/user/dashboard");
    }
  }, [history]);

  const { email, password, errorMsg, loading } = formData;

  const handleChange = (evt) => {
    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value,
      errorMsg: false,
    });
  };
  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (isEmpty(password) || isEmpty(email)) {
      setFormData({
        ...formData,
        errorMsg: "All fields are required",
      });
    } else if (!isEmail(email)) {
      setFormData({
        ...formData,
        errorMsg: "Incorrect Email",
      });
    } else {
      console.log("All good SignIn front end");

      const { email, password } = formData;
      const data = { email, password };
      setFormData({
        ...formData,
        loading: true,
      });
      signin(data)
        .then((response) => {
          setAuthentication(response.data.token, response.data.user);
          if (isAuthenticated() && isAuthenticated().role === 1) {
            console.log("Redirecting to admin dashboard....");
            history.push("/admin/dashboard");
          } else {
            console.log("Redirecting to user dashboard....");
            history.push("/user/dashboard");
          }
        })

        .catch((err) => {
          console.log("Sign In API function error:", err);
          setFormData({
            ...formData,
            loading: false,
            errorMsg: err.response.data.errorMessage
          })
        });
    }
  };

  const SignInForm = () => (
    <form className="signup-form " onSubmit={handleSubmit} noValidate>
      {/*EMAIL*/}
      <div className="form-group input-group">
        <div className="input-group-prepend">
          <span className="input-group-text">
            <i className="fa fa-envelope"></i>
          </span>
        </div>
        <input
          name="email"
          value={email}
          className="form-control"
          placeholder="Email-Address"
          type="email"
          onChange={handleChange}
        />
      </div>
      {/*Password*/}
      <div className="form-group input-group">
        <div className="input-group-prepend">
          <span className="input-group-text">
            <i className="fa fa-lock"></i>
          </span>
        </div>
        <input
          name="password"
          value={password}
          className="form-control"
          placeholder="Create Password"
          type="password"
          onChange={handleChange}
        />
      </div>

      {/*Button*/}
      <div className="form-group">
        <button type="submit" className="btn btn-primary btn-block">
          Sign-In
        </button>
      </div>
      {/*already have account*/}
      <p className="text-center text-white bg-dark">
        Don't have an account?
        <Link to="/signup">Register Here</Link>
      </p>
    </form>
  );

  return (
    <div className="signin-container">
      <div className="row px-3 vh-100">
        <div className="col-md-5 mx-auto align-self-center">
          {errorMsg && showErrorMessage(errorMsg)}
          {loading && <div className="text-center">{showLoading()}</div>}
          {SignInForm()}
        </div>
      </div>
    </div>
  );
}

export default SignIn;
