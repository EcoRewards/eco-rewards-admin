import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { DashboardPage } from './DashboardPage/DashboardPage';
import { SideNavigation } from "./SideNavigation/SideNavigation";
import { TopBar } from "./TopBar/TopBar";
import { Footer } from "./Footer/Footer";
import { Authentication } from "../Authentication";
import { SchemesPage } from "./SchemesPage/SchemesPage";
import { OrganisationsPage } from "./OrganisationsPage/OrganisationsPage";
import { GroupsPage } from './GroupsPage/GroupsPage';
import { MembersPage } from "./MembersPage/MembersPage";

export const AuthenticatedPage = ({ auth }: AuthenticatedPageProps) => {
  return (
    <div id="wrapper">
      <SideNavigation/>
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <TopBar auth={auth}/>
          <HashRouter>
            <Switch>
              <Route path="/schemes">
                <SchemesPage api={auth.getAuthenticatedApi()} />
              </Route>
              <Route path="/organisations">
                <OrganisationsPage api={auth.getAuthenticatedApi()} />
              </Route>
              <Route path="/groups">
                <GroupsPage api={auth.getAuthenticatedApi()} />
              </Route>
              <Route path="/members">
                <MembersPage api={auth.getAuthenticatedApi()} />
              </Route>
              <Route path="/">
                <DashboardPage />
              </Route>
            </Switch>
          </HashRouter>
        </div>
        <Footer/>
      </div>
    </div>
  );
};

interface AuthenticatedPageProps {
  auth: Authentication;
}
