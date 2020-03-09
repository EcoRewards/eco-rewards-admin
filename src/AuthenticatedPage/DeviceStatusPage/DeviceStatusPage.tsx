import React, { useEffect, useState } from "react";
import { AxiosInstance } from "axios";
import { DeviceStatusTable } from "./DeviceStatusTable/DeviceStatusTable";

export const DeviceStatusPage = ({api}: DeviceStatusPageProps) => {
  const [apiData, setApiData] = useState();

  useEffect(() => {
    async function fetchApiData() {
      const statuses = await api.get("/devices").then(r => r.data);

      setApiData({ statuses });
    }

    if (!apiData) {
      fetchApiData();
    }
  }, [api, apiData]);

  return (
    <div className="container-fluid">
      <h1 className="h3 mb-2 text-gray-800">Journeys</h1>
      <p className="mb-4">View and upload member journeys.</p>
      <DeviceStatusTable
        api={api}
        statuses={apiData ? apiData.statuses.data : []}/>
    </div>
  );
};

interface DeviceStatusPageProps {
  api: AxiosInstance
}
