import React from "react";
import { AxiosInstance } from "axios";
import { DeviceStatusJsonView } from "eco-rewards-hub/dist/src/device/DeviceStatus";
import { ServerPaginatedTable } from "../../Table/ServerPaginatedTable/ServerPaginatedTable";

export const DeviceStatusTable = ({ api }: DeviceStatusTableProps) => {
  let i = 0;
  const createRow = (o: DeviceStatusJsonView) => ({
    id: i++ + "",
    name: o.deviceId,
    numeric_id: o.deviceId,
    received: new Date(o.received + "+0000").toLocaleString(),
    status: o.status
  });

  const columns = [{
    name: "Device ID",
    selector: (row: any) => row.numeric_id,
    sortable: true,
    width: "110px"
  },{
    name: "Received",
    selector: (row: any) => row.received,
    sortable: true,
    width: "180px"
  },{
    name: "Status",
    selector: (row: any) => row.status,
    sortable: false
  }];

  return (
    <ServerPaginatedTable columns={columns} uri={"/devices"} api={api} createRow={createRow} filterField={"device_id"}/>
  );
};

interface DeviceStatusTableProps {
  api: AxiosInstance
}
