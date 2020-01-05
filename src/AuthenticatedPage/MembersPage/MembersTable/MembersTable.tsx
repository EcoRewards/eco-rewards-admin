import React from "react";
import { Row, Table } from "../../Table/Table";
import { AxiosInstance } from "axios";
import { MemberJsonView } from "eco-rewards-hub";

export const MembersTable = ({ api, members, links, removeMembers }: MembersTableProps) => {
  const rows = members.map(m => ({
    id: m.id!,
    numeric_id: m.id!.substr(8),
    name: links[m.group].name,
    defaultTransportMode: m.defaultTransportMode,
    defaultDistance: m.defaultDistance + " miles",
    carbonSaving: m.carbonSaving + "kg",
    rewards: m.rewards,
    organisation: links[links[m.group].organisation].name,
    scheme: links[links[links[m.group].organisation].scheme].name
  }));

  const columns = [{
    name: "ID",
    selector: "numeric_id",
    sortable: true,
    width: "180px"
  },{
    name: "Scheme",
    selector: "scheme",
    sortable: true
  },{
    name: "Organisation",
    selector: "organisation",
    sortable: true
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
