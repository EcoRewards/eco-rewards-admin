import React from 'react';
import './App.css';
import { TopNavigation } from "./TopNavigation/TopNavigation";
import { Login } from "./Login/Login";

export const App: React.FC = () => {
  return (
    <>
      <TopNavigation/>
      <div className="row justify-content-center">
        <div className="col-4">
          <h1>Eco Rewards Hub Admin</h1>
          <Login/>
        </div>
      </div>
    </>
  );
};
