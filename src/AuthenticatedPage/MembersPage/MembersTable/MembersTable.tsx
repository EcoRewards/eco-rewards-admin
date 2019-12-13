import React from "react";
import { Row, Table } from "../../Table/Table";
import { AxiosInstance } from "axios";
import { MemberJsonView } from "eco-rewards-hub";

export const MembersTable = ({ api, members, links, removeMembers }: MembersTableProps) => {
  const rows = members.map(o => ({
    id: o.id!,
    numeric_id: o.id!.substr(8),
    name: links[o.group].name,
    defaultTransportMode: o.defaultTransportMode,
    defaultDistance: o.defaultDistance + " miles",
    carbonSaving: o.carbonSaving + "kg",
    rewards: o.rewards
  }));

  const columns = [{
    name: "ID",
    selector: "numeric_id",
    sortable: true,
    width: "180px"
  },{
    name: "Group",
    selector: "name",
    sortable: true
  },{
    name: "Default Mode",
    selector: "defaultTransportMode",
    sortable: false
  },{
    name: "Default Distance",
    selector: "defaultDistance",
    sortable: true
  },{
    name: "Rewards",
    selector: "rewards",
    sortable: true
  },{
    name: "Carbon Saving",
    selector: "carbonSaving",
    sortable: true
  }];

  return (
    <Table columns={columns} rows={rows} api={api} removeRows={removeMembers}/>
  );
};

interface MembersTableProps {
  api: AxiosInstance,
  members: MemberJsonView[],
  links: Record<string, any>,
  removeMembers: (members: Row[]) => any
}
