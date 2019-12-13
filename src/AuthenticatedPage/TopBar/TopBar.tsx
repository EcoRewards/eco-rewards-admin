import React from 'react';
import { Authentication } from "../../Authentication";

export const TopBar = ({ auth }: TopBarProps) => {

  const logout = (e: any) => {
    e.preventDefault();

    auth.logout();
  };

  return (
    <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
      <span className="text-gray-600 small">Welcome back, { auth.getName() }</span>

      <ul className="navbar-nav ml-auto">

        <li className="nav-item dropdown no-arrow">
          <a className="dropdown-toggle" href="/logout" onClick={logout} id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span className="mr-2 d-none d-lg-inline text-gray-600 small">Logout</span>
            <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
          </a>
        </li>

      </ul>

    </nav>

  );
};

interface TopBarProps {
  auth: Authentication;
}
