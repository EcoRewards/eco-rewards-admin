import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { DashboardPage } from './DashboardPage/DashboardPage';
import { SideNavigation } from "./SideNavigation/SideNavigation";
import { TopBar } from "./TopBar/TopBar";
import { Footer } from "./Footer/Footer";

export const AuthenticatedPage = () => {
  return (
    <div id="wrapper">
      <SideNavigation/>
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <TopBar/>
          <Router>
            <Switch>
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
