import React from 'react';
import './App.css';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { LoginPage } from "./LoginPage/LoginPage";
import { AuthenticatedPage } from './AuthenticatedPage/AuthenticatedPage';
import { PrivateRoute } from './PrivateRoute/PrivateRoute';
import { Authentication } from "./Authentication";
import Axios from 'axios';
import { RegistrationPage } from "./RegistrationPage/RegistrationPage";
import Cookies from "universal-cookie";

export const App = () => {
  // const api = Axios.create({ baseURL: "https://api.ecorewards.co.uk" });
  const api = Axios.create({ baseURL: "http://localhost:8080" });
  const cookies = new Cookies();
  const auth = new Authentication(api, cookies);

  return (
    <HashRouter>
      <Switch>
        <Route path="/login">
          <LoginPage auth={auth}/>
        </Route>
        <Route path="/register">
          <RegistrationPage api={api}/>
        </Route>
        <PrivateRoute auth={auth} path="/">
          <AuthenticatedPage auth={auth}/>
        </PrivateRoute>
      </Switch>
    </HashRouter>
  );
};

