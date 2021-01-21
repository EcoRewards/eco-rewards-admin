import React, { FormEvent, useState } from "react";
import "./LoginPage.css";
import { Authentication } from "../Authentication";
import {
  useHistory,
  useLocation
} from "react-router-dom";

export const LoginPage = ({ auth }: LoginPageProps) => {
  const history = useHistory();
  const location = useLocation<any>();
  const { from } = location.state || { from: { pathname: "/" } };
  const [loginError, setLoginError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);

  const login = async (e: FormEvent) => {
    e.preventDefault();

    await auth.login(username, password);

    if (auth.isAuthenticated) {
      window.location.href = "/"
    }
    else {
      setLoginError("Unable to login, please try again.");
    }
  };

  if (auth.isAuthenticated) {
    history.replace(from);
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-xl-10 col-lg-12 col-md-9">
          <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0">
              <div className="row">
                <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                <div className="col-lg-6">
                  <div className="p-5">
                    <div className="text-center">
                      <h1 className="h4 text-gray-900 mb-4">Login</h1>
                    </div>
                    <form className="user">
                      <div className="form-group">
                        <input type="email" className="form-control form-control-user" id="exampleInputEmail"
                               aria-describedby="emailHelp" placeholder="Enter Email Address..."
                               onChange={e => setUsername(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <input type="password" className="form-control form-control-user" id="exampleInputPassword"
                               placeholder="Password" onChange={e => setPassword(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <div className="custom-control custom-checkbox small">
                          <input type="checkbox" checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} className="custom-control-input" id="customCheck"/>
                            <label className="custom-control-label" htmlFor="customCheck">Remember Me</label>
                        </div>
                      </div>
                      <button className="btn btn-primary btn-user btn-block" onClick={login}>
                        Login
                      </button>
                    </form>
                    { loginError && (<hr />) }
                    {loginError}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface LoginPageProps {
  auth: Authentication
}
