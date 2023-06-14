import React from "react";
import { AxiosInstance } from "axios";
import { ServerPaginatedTable } from "../../Table/ServerPaginatedTable/ServerPaginatedTable";
import { TrophyJsonView } from "eco-rewards-hub/dist/src/trophy/Trophy";

export const TrophiesTable = ({ api }: TrophiesTableProps) => {
  const createRow = (o: TrophyJsonView) => ({
    id: o.id,
    memberId: o.member!.substr(8),
    name: o.name,
    memberGroup: o.memberGroup.substring(7),
    miles: o.miles + " miles",
    carbonSaving: o.carbonSaving + " kg",
    dateAwarded: new Date(o.dateAwarded + "+0000").toLocaleString(),
    rewards: o.rewards
  });

  const columns = [{
    name: "Member ID",
    selector: (row: any) => row.memberId,
    sortable: true,
    width: "180px"
  },{
    name: "Trophy",
    selector: (row: any) => row.name,
    sortable: true,
    width: "110px"
  },{
    name: "Awarded",
    selector: (row: any) => row.dateAwarded,
    sortable: true,
    width: "180px"
  },{
    name: "Group",
    selector: (row: any) => row.memberGroup,
    sortable: false
  },{
    name: "Miles",
    selector: (row: any) => row.miles,
    sortable: false
  },{
    name: "Carbon Saving",
    selector: (row: any) => row.carbonSaving,
    sortable: false
  },{
    name: "Rewards",
    selector: (row: any) => row.rewards,
    sortable: false
  }];

  return (
    <ServerPaginatedTable columns={columns} uri={"/trophies"} api={api} createRow={createRow} defaultSortField={"dateAwarded"} filterField={"member_id"}/>
  );
};

interface TrophiesTableProps {
  api: AxiosInstance
}
