import React from "react";
import { Table } from "../../Table/Table";
import { AxiosInstance } from "axios";
import { JourneyJsonView } from "eco-rewards-hub";

export const JourneysTable = ({ api, journeys }: JourneysTableProps) => {
  const rows = journeys.map((o, i) => ({
    ...o,
    name: o.memberId.substr(8),
    id: o.memberId.substr(8) + "_" + i,
    numeric_id: o.memberId.substr(8),
    uploaded: new Date(o.uploaded + "+0000").toLocaleString(),
    travelDate: new Date(o.travelDate + "+0000").toLocaleString(),
    processed: o.processed === null ? "Pending" : new Date(o.processed +"+0000").toLocaleString(),
    carbonSaving: o.carbonSaving === null ? "-" : o.carbonSaving + "kg",
    distance: o.distance === null ? "-" : o.distance + " miles",
    rewardsEarned: o.rewardsEarned === null ? "-" : o.rewardsEarned
  }));

  const columns = [{
    name: "Member ID",
    selector: "numeric_id",
    sortable: true,
    width: "180px"
  },{
    name: "Source",
    selector: "source",
    sortable: true,
    width: "110px"
  },{
    name: "Device",
    selector: "deviceId",
    sortable: true,
    width: "110px"
  },{
    name: "Latitude",
    selector: "latitude",
    sortable: false,
    width: "100px"
  },{
    name: "Longitude",
    selector: "longitude",
    sortable: false,
    width: "100px"
  },{
    name: "Uploaded",
    selector: "uploaded",
    sortable: true,
    width: "170px"
  },{
    name: "Processed",
    selector: "processed",
    sortable: true,
    width: "170px"
  },{
    name: "Travel Date",
    selector: "travelDate",
    sortable: true,
    width: "170px"
  },{
    name: "Distance",
    selector: "distance",
    sortable: true,
    width: "90px"
  },{
    name: "Mode",
    selector: "mode",
    sortable: true,
    width: "90px"
  },{
    name: "Rewards Earned",
    selector: "rewardsEarned",
    sortable: true,
    width: "80px"
  },{
    name: "Carbon Saving",
    selector: "carbonSaving",
    sortable: true,
    width: "80px"
  }];

  return (
    <Table columns={columns} rows={rows} api={api}/>
  );
};

interface JourneysTableProps {
  api: AxiosInstance,
  journeys: JourneyJsonView[]
}
