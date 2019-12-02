import React from "react";
import { toGroupId } from "eco-rewards-hub/dist/src/group/Group";
import { Row, Table } from "../../Table/Table";
import { AxiosInstance } from "axios";
import { GroupJsonView } from "eco-rewards-hub";

export const GroupsTable = ({ api, groups, links, removeGroups }: GroupsTableProps) => {
  const rows = groups.map(o => ({
    id: o.id!,
    numeric_id: toGroupId(o.id!),
    name: o.name,
    organisation: links[o.organisation].name
  }));

  const columns = [{
    name: "ID",
    selector: "numeric_id",
    sortable: true,
    width: "100px"
  },{
    name: "Name",
    selector: "name",
    sortable: true
  },{
    name: "Organisation",
    selector: "organisation",
    sortable: true
  }];

  return (
    <Table columns={columns} rows={rows} api={api} removeRows={removeGroups}/>
  );
};

interface GroupsTableProps {
  api: AxiosInstance,
  groups: GroupJsonView[],
  links: Record<string, any>,
  removeGroups: (groups: Row[]) => any
}
