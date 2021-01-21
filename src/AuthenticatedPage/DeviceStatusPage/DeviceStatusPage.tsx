import React, { useEffect, useState } from "react";
import { AxiosInstance } from "axios";
import { DeviceStatusTable } from "./DeviceStatusTable/DeviceStatusTable";
import { DeviceStatusJsonView } from "eco-rewards-hub/dist/src/device/DeviceStatus";

export const DeviceStatusPage = ({api}: DeviceStatusPageProps) => {
  const [apiData, setApiData] = useState<ApiData>();

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
      <h1 className="h3 mb-2 text-gray-800">Device Status</h1>
      <p className="mb-4">View status messages from devices connected to The Things Network.</p>
      <DeviceStatusTable
        api={api}
        statuses={apiData ? apiData.statuses.data : []}/>
    </div>
  );
};

interface DeviceStatusPageProps {
  api: AxiosInstance
}

interface ApiData {
  statuses: {
    data: DeviceStatusJsonView[]
  }
}
