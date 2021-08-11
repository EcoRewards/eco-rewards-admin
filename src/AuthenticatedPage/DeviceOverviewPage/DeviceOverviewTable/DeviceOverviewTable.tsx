import React from "react";
import { AxiosInstance } from "axios";
import { ServerPaginatedTable } from "../../Table/ServerPaginatedTable/ServerPaginatedTable";

export const DeviceOverviewTable = ({ api }: DeviceStatusTableProps) => {
  let i = 0;
  const createRow = (o: any) => ({
    id: i++ + "",
    name: o.deviceId,
    numeric_id: o.deviceId,
    received: new Date(o.lastUpdate + "+0000").toLocaleString(),
    status: o.status
  });

  const columns = [{
    name: "Device ID",
    selector: "numeric_id",
    sortable: true,
    width: "110px"
  },{
    name: "Last Update",
    selector: "received",
    sortable: true,
    width: "180px"
  },{
    name: "Status",
    selector: "status",
    sortable: false
  }];

  return (
    <ServerPaginatedTable columns={columns} uri={"/device-overview"} api={api} createRow={createRow} filterField={"device_id"}/>
  );
};

interface DeviceStatusTableProps {
  api: AxiosInstance
}
