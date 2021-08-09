import React from "react";
import { AxiosInstance } from "axios";
import { DeviceStatusTable } from "./DeviceStatusTable/DeviceStatusTable";

export const DeviceStatusPage = ({api}: DeviceStatusPageProps) => {

  return (
    <div className="container-fluid">
      <h1 className="h3 mb-2 text-gray-800">Device Status</h1>
      <p className="mb-4">View status messages from devices connected to The Things Network.</p>
      <DeviceStatusTable api={api}/>
    </div>
  );
};

interface DeviceStatusPageProps {
  api: AxiosInstance
}
