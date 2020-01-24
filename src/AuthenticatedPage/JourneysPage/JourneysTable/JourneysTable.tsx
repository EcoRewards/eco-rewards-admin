import React from "react";
import { Table } from "../../Table/Table";
import { AxiosInstance } from "axios";
import { JourneyJsonView } from "eco-rewards-hub";

export const JourneysTable = ({ api, journeys }: JourneysTableProps) => {
  const rows = journeys.map(o => ({
    ...o,
    name: o.source,
    id: o.memberId,
    numeric_id: o.memberId.substr(8),
    processed: o.processed === null ? "Pending" : o.processed,
    carbonSaving: o.carbonSaving === null ? "-" : o.carbonSaving + "kg",
    rewardsEarned: o.rewardsEarned === null ? "-" : o.rewardsEarned
  }));

  const columns = [{
    name: "Member ID",
    selector: "numeric_id",
    sortable: true
  },{
    name: "Source",
    selector: "source",
    sortable: true
  },{
    name: "Uploaded",
    selector: "uploaded",
    sortable: true
  },{
    name: "Processed",
    selector: "processed",
    sortable: true
  },{
    name: "Travel Date",
    selector: "travelDate",
    sortable: true
  },{
    name: "Distance",
    selector: "distance",
    sortable: true
  },{
    name: "Mode",
    selector: "mode",
    sortable: true
  },{
    name: "Rewards Earned",
    selector: "rewardsEarned",
    sortable: true
  },{
    name: "Carbon Saving",
    selector: "carbonSaving",
    sortable: true
  }];

  return (
    <Table columns={columns} rows={rows} api={api}/>
  );
};

interface JourneysTableProps {
  api: AxiosInstance,
  journeys: JourneyJsonView[]
}
