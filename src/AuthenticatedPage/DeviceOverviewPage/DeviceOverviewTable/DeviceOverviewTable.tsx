import React from "react";
import { AxiosInstance } from "axios";
import { ServerPaginatedTable } from "../../Table/ServerPaginatedTable/ServerPaginatedTable";

export const DeviceOverviewTable = ({ api }: DeviceStatusTableProps) => {
  let i = 0;
  const createRow = (o: any) => ({
    id: i++ + "",
    name: o.deviceId,
    numeric_id: o.deviceId,
    received: o.lastUpdate,
    status: o.status
  });

  const columns = [{
    name: "Device ID",
    selector: (row: any) => row.numeric_id,
    sortable: true,
    width: "110px"
  },{
    name: "Last Update",
    selector: (row: any) => row.received,
    sortable: true,
    width: "180px",
    cell: (row: any) => new Date(row.received + "+0000").toLocaleString()
  },{
    name: "Status",
    selector: (row: any) => row.status,
    sortable: false
  }];

  return (
    <ServerPaginatedTable columns={columns} uri={"/device-overview"} api={api} createRow={createRow}/>
  );
};

interface DeviceStatusTableProps {
  api: AxiosInstance
}
