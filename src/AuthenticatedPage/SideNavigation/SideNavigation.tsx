import React from 'react';
import "./SideNavigation.css";
import { Link } from "react-router-dom";

export const SideNavigation = () => {
  return (
    <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
      <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
        <div className="sidebar-brand-icon rotate-n-15">
          <i className="fas fa-leaf"></i>
        </div>
        <div className="sidebar-brand-text mx-3">Eco Rewards Hub Admin</div>
      </a>

      <hr className="sidebar-divider my-0"/>

      <li className="nav-item">
        <Link className="nav-link" to="/login">
          <i className="fas fa-fw fa-tachometer-alt"></i>
          <span>Dashboard</span></Link>
      </li>

      <hr className="sidebar-divider"/>

      <div className="sidebar-heading">
        Manage
      </div>

      <li className="nav-item active">
        <a className="nav-link" href="charts.html">
          <i className="fas fa-fw fa-folder"></i>
          <span>Schemes</span></a>
      </li>

      <li className="nav-item">
        <a className="nav-link" href="charts.html">
          <i className="fas fa-fw fa-chart-area"></i>
          <span>Organisations</span></a>
      </li>

      <li className="nav-item">
        <a className="nav-link" href="charts.html">
          <i className="fas fa-fw fa-chart-area"></i>
          <span>Groups</span></a>
      </li>

      <li className="nav-item">
        <a className="nav-link" href="charts.html">
          <i className="fas fa-fw fa-chart-area"></i>
          <span>Members</span></a>
      </li>

      <hr className="sidebar-divider"/>

      <div className="sidebar-heading">
        Reports
      </div>

      <li className="nav-item">
        <a className="nav-link" href="tables.html">
          <i className="fas fa-fw fa-table"></i>
          <span>Journeys</span></a>
      </li>

    </ul>
  );
};
