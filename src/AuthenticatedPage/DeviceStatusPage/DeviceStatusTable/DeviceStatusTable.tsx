import React from "react";
import { Table } from "../../Table/Table";
import { AxiosInstance } from "axios";
import { DeviceStatusJsonView } from "eco-rewards-hub/dist/src/device/DeviceStatus";

export const DeviceStatusTable = ({ api, statuses }: DeviceStatusTableProps) => {
  const rows = statuses.map((o,i) => ({
    id: i + "",
    name: o.deviceId,
    numeric_id: o.deviceId,
    received: new Date(o.received + "+0000").toLocaleString(),
    status: o.status
  }));

  const columns = [{
    name: "Device ID",
    selector: "numeric_id",
    sortable: true,
    width: "110px"
  },{
    name: "Received",
    selector: "received",
    sortable: true,
    width: "180px"
  },{
    name: "Status",
    selector: "status",
    sortable: false
  }];

  return (
    <Table columns={columns} rows={rows} api={api}/>
  );
};

interface DeviceStatusTableProps {
  api: AxiosInstance,
  statuses: DeviceStatusJsonView[]
}
