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
import { JourneysPage } from "./JourneysPage/JourneysPage";
import {DeviceStatusPage} from "./DeviceStatusPage/DeviceStatusPage";
import { DeviceOverviewPage } from "./DeviceOverviewPage/DeviceOverviewPage";

export const AuthenticatedPage = ({ auth }: AuthenticatedPageProps) => {
  const protectedRoutes = <Switch>
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
    <Route path="/journeys">
      <JourneysPage api={auth.getAuthenticatedApi()} />
    </Route>
    <Route path="/devices">
      <DeviceStatusPage api={auth.getAuthenticatedApi()} />
    </Route>
    <Route path="/device-overview">
      <DeviceOverviewPage api={auth.getAuthenticatedApi()} />
    </Route>
    <Route path="/">
      <DashboardPage api={auth.getAuthenticatedApi()} />
    </Route>
  </Switch>;

  const nonAdminDashboard = <>
    <Route path="/">
      <DeviceOverviewPage api={auth.getAuthenticatedApi()} />
    </Route>
  </>;

  return (
    <div id="wrapper">
      <SideNavigation isAdmin={auth.isAdmin}/>
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <TopBar auth={auth}/>
          <HashRouter>
            <Switch>
              { auth.isAdmin ? protectedRoutes : nonAdminDashboard }
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
