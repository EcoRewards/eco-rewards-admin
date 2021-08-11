import React from "react";
import { AxiosInstance } from "axios";
import { DeviceOverviewTable } from "./DeviceOverviewTable/DeviceOverviewTable";

export const DeviceOverviewPage = ({api}: DeviceStatusPageProps) => {

  return (
    <div className="container-fluid">
      <h1 className="h3 mb-2 text-gray-800">Device Overview</h1>
      <p className="mb-4">Last status message received from devices connected to The Things Network.</p>
      <DeviceOverviewTable api={api}/>
    </div>
  );
};

interface DeviceStatusPageProps {
  api: AxiosInstance
}
