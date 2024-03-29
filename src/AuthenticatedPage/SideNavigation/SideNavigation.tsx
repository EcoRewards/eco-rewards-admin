import React from 'react';
import "./SideNavigation.css";
import { NavLink } from "react-router-dom";

export const SideNavigation = ({ isAdmin }: { isAdmin: boolean }) => {
  const protectedRoutes = <>
    <li className="nav-item">
      <NavLink end={true} className={({ isActive }) => "nav-link" + (isActive ? " active": "")} to="/">
        <i className="fas fa-fw fa-tachometer-alt"></i>
        <span>Dashboard</span></NavLink>
    </li>

    <hr className="sidebar-divider"/>

    <div className="sidebar-heading">
      Manage
    </div>

    <li className="nav-item">
      <NavLink className={({ isActive }) => "nav-link" + (isActive ? " active": "")} to="/schemes">
        <i className="fas fa-fw fa-city"></i>
        <span>Schemes</span></NavLink>
    </li>

    <li className="nav-item">
      <NavLink className={({ isActive }) => "nav-link" + (isActive ? " active": "")} to="/organisations">
        <i className="fas fa-fw fa-school"></i>
        <span>Organisations</span>
      </NavLink>
    </li>

    <li className="nav-item">
      <NavLink className={({ isActive }) => "nav-link" + (isActive ? " active": "")} to="/groups">
        <i className="fas fa-fw fa-users"></i>
        <span>Groups</span>
      </NavLink>
    </li>

    <li className="nav-item">
      <NavLink className={({ isActive }) => "nav-link" + (isActive ? " active": "")} to="/members">
        <i className="fas fa-fw fa-user"></i>
        <span>Members</span></NavLink>
    </li>

    <li className="nav-item">
      <NavLink className={({ isActive }) => "nav-link" + (isActive ? " active": "")} to="/locations">
        <i className="fas fa-fw fa-location-arrow"></i>
        <span>Locations</span></NavLink>
    </li>

    <hr className="sidebar-divider"/>

    <div className="sidebar-heading">
      Reports
    </div>

    <li className="nav-item">
      <NavLink className={({ isActive }) => "nav-link" + (isActive ? " active": "")} to="/journeys">
        <i className="fas fa-fw fa-bus"></i>
        <span>Journeys</span></NavLink>
    </li>

    <li className="nav-item">
      <NavLink className={({ isActive }) => "nav-link" + (isActive ? " active": "")} to="/devices">
        <i className="fas fa-fw fa-pager"></i>
        <span>Device Status Updates</span></NavLink>
    </li>

    <li className="nav-item">
      <NavLink className={({ isActive }) => "nav-link" + (isActive ? " active": "")} to="/trophies">
        <i className="fas fa-fw fa-trophy"></i>
        <span>Trophies</span></NavLink>
    </li>
  </>

  return (
    <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
      <NavLink className="sidebar-brand d-flex align-items-center justify-content-center" to="/">
        <div className="sidebar-brand-icon rotate-n-15">
          <i className="fas fa-leaf"></i>
        </div>
        <div className="sidebar-brand-text mx-3">Eco Rewards Hub Admin</div>
      </NavLink>

      <hr className="sidebar-divider my-0"/>
      { isAdmin && protectedRoutes }
      <li className="nav-item">
          <NavLink className={({ isActive }) => "nav-link" + (isActive ? " active": "")} to="/device-overview">
          <i className="fas fa-fw fa-list-alt"></i>
          <span>Device Overview</span></NavLink>
      </li>
    </ul>
  );
};
