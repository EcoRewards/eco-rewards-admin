import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { LoginPage } from "./LoginPage/LoginPage";
import { AuthenticatedPage } from './AuthenticatedPage/AuthenticatedPage';

export const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/">
          <AuthenticatedPage />
        </Route>
      </Switch>
    </Router>
  );
};
