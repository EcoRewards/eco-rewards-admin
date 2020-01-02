import React from 'react';
import './App.css';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { LoginPage } from "./LoginPage/LoginPage";
import { AuthenticatedPage } from './AuthenticatedPage/AuthenticatedPage';
import { PrivateRoute } from './PrivateRoute/PrivateRoute';
import { Authentication } from "./Authentication";
import Axios from 'axios';
import { RegistrationPage } from "./RegistrationPage/RegistrationPage";

export const App = () => {
  const api = Axios.create({ baseURL: "https://api.ecorewards.co.uk" });
  const auth = new Authentication(api);

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

