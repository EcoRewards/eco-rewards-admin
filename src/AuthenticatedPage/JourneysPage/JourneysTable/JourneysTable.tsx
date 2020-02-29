import React from "react";
import { Table } from "../../Table/Table";
import { AxiosInstance } from "axios";
import { JourneyJsonView } from "eco-rewards-hub";

export const JourneysTable = ({ api, journeys }: JourneysTableProps) => {
  console.log(journeys[0]);
  const rows = journeys.map(o => ({
    ...o,
    name: o.memberId,
    id: o.memberId,
    numeric_id: o.memberId.substr(8),
    processed: o.processed === null ? "Pending" : o.processed,
    carbonSaving: o.carbonSaving === null ? "-" : o.carbonSaving + "kg",
    distance: o.distance === null ? "-" : o.distance + " miles",
    rewardsEarned: o.rewardsEarned === null ? "-" : o.rewardsEarned
  }));

  const columns = [{
    name: "Member ID",
    selector: "numeric_id",
    sortable: true
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
    width: "140px"
  },{
    name: "Carbon Saving",
    selector: "carbonSaving",
    sortable: true,
    width: "140px"
  }];

  return (
    <Table columns={columns} rows={rows} api={api}/>
  );
};

interface JourneysTableProps {
  api: AxiosInstance,
  journeys: JourneyJsonView[]
}
