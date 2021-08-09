import React from "react";
import { AxiosInstance } from "axios";
import { JourneyJsonView } from "eco-rewards-hub";
import { ServerPaginatedTable } from "../../Table/ServerPaginatedTable/ServerPaginatedTable";

export const JourneysTable = ({ api }: JourneysTableProps) => {
  let i = 0;
  const createRow = (j: JourneyJsonView) => ({
    ...j,
    name: j.memberId.substr(8),
    id: j.memberId.substr(8) + "_" + i++,
    numeric_id: j.memberId.substr(8),
    uploaded: new Date(j.uploaded + "+0000").toLocaleString(),
    travelDate: new Date(j.travelDate + "+0000").toLocaleString(),
    processed: j.processed === null ? "Pending" : new Date(j.processed +"+0000").toLocaleString(),
    carbonSaving: j.carbonSaving === null ? "-" : j.carbonSaving + "kg",
    distance: j.distance === null ? "-" : j.distance + " miles",
    rewardsEarned: j.rewardsEarned === null ? "-" : j.rewardsEarned
  });

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
    <ServerPaginatedTable columns={columns} uri={"/journeys"} createRow={createRow} api={api} filterField={"smartcard"}/>
  );
};

interface JourneysTableProps {
  api: AxiosInstance
}
