import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { DashboardPage } from './DashboardPage/DashboardPage';
import { SideNavigation } from "./SideNavigation/SideNavigation";
import { TopBar } from "./TopBar/TopBar";
import { Footer } from "./Footer/Footer";
import { Authentication } from "../Authentication";
import { SchemesPage } from "./SchemesPage/SchemesPage";

export const AuthenticatedPage = ({ auth }: AuthenticatedPageProps) => {
  return (
    <div id="wrapper">
      <SideNavigation/>
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <TopBar auth={auth}/>
          <Router>
            <Switch>
              <Route path="/schemes">
                <SchemesPage />
              </Route>
              <Route path="/">
                <DashboardPage />
              </Route>
            </Switch>
          </Router>
        </div>
        <Footer/>
      </div>
    </div>
  );
};

interface AuthenticatedPageProps {
  auth: Authentication;
}
