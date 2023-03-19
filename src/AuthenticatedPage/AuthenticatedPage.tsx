import React from 'react';
import { Route, Routes } from 'react-router-dom';
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
import { DeviceStatusPage } from "./DeviceStatusPage/DeviceStatusPage";
import { DeviceOverviewPage } from "./DeviceOverviewPage/DeviceOverviewPage";
import { LocationsPage } from "./LocationsPage/LocationsPage";
import { TrophiesPage } from "./TrophiesPage/TrophiesPage";

export const AuthenticatedPage = ({ auth }: AuthenticatedPageProps) => {
  const protectedRoutes = <Routes>
    <Route path="/schemes" element={<SchemesPage api={auth.getAuthenticatedApi()} />}/>
    <Route path="/organisations" element={<OrganisationsPage api={auth.getAuthenticatedApi()} />}/>
    <Route path="/groups" element={<GroupsPage api={auth.getAuthenticatedApi()} />}/>
    <Route path="/members" element={<MembersPage api={auth.getAuthenticatedApi()} />}/>
    <Route path="/journeys" element={<JourneysPage api={auth.getAuthenticatedApi()} />}/>
    <Route path="/devices" element={<DeviceStatusPage api={auth.getAuthenticatedApi()} />}/>
    <Route path="/device-overview" element={<DeviceOverviewPage api={auth.getAuthenticatedApi()} />}/>
    <Route path="/locations" element={<LocationsPage api={auth.getAuthenticatedApi()} />}/>
    <Route path="/trophies" element={<TrophiesPage api={auth.getAuthenticatedApi()} />}/>
    <Route path="/" element={<DashboardPage api={auth.getAuthenticatedApi()} />}/>
  </Routes>;

  const nonAdminDashboard = <Routes>
    <Route path="/" element={<DeviceOverviewPage api={auth.getAuthenticatedApi()} />}/>
  </Routes>;

  return (
    <div id="wrapper">
      <SideNavigation isAdmin={auth.isAdmin}/>
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <TopBar auth={auth}/>
          { auth.isAdmin ? protectedRoutes : nonAdminDashboard }
        </div>
        <Footer/>
      </div>
    </div>
  );
};

interface AuthenticatedPageProps {
  auth: Authentication;
}
