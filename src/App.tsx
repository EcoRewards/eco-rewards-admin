import React from 'react';
import './App.css';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { LoginPage } from "./LoginPage/LoginPage";
import { AuthenticatedPage } from './AuthenticatedPage/AuthenticatedPage';
import { PrivateRoute } from './PrivateRoute/PrivateRoute';
import { Authentication } from "./Authentication";
import Axios from 'axios';

export const App = () => {
  const auth = new Authentication(Axios.create({
    baseURL: "https://api.ecorewards.co.uk"
  }));

  return (
    <HashRouter>
      <Switch>
        <Route path="/login">
          <LoginPage auth={auth}/>
        </Route>
        <PrivateRoute auth={auth} path="/">
          <AuthenticatedPage auth={auth}/>
        </PrivateRoute>
      </Switch>
    </HashRouter>
  );
};

