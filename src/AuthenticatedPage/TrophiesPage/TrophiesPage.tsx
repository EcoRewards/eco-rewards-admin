import React from "react";
import { AxiosInstance } from "axios";
import { TrophiesTable } from "./DeviceStatusTable/TrophiesTable";

export const TrophiesPage = ({api}: TrophiesPageProps) => {

  return (
    <div className="container-fluid">
      <h1 className="h3 mb-2 text-gray-800">Trophies</h1>
      <TrophiesTable api={api}/>
    </div>
  );
};

interface TrophiesPageProps {
  api: AxiosInstance
}
