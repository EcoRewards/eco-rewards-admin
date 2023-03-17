import React from "react";
import { toGroupId } from "eco-rewards-hub/dist/src/group/Group";
import { AxiosInstance } from "axios";
import { GroupJsonView, SchemeJsonView } from "eco-rewards-hub";
import { ServerPaginatedTable } from "../../Table/ServerPaginatedTable/ServerPaginatedTable";

export const GroupsTable = ({ api }: GroupsTableProps) => {
  const createRow = (o: GroupJsonView, links: Record<string, SchemeJsonView>) => ({
    id: o.id!,
    numeric_id: toGroupId(o.id!),
    name: o.name,
    organisation: links[o.organisation].name
  });

  const columns = [{
    name: "ID",
    selector: (row: any) => row.numeric_id,
    sortable: true,
    width: "100px"
  },{
    name: "Name",
    selector: (row: any) => row.name,
    sortable: true
  },{
    name: "Organisation",
    selector: (row: any) => row.organisation,
    sortable: true
  }];

  return (
    <ServerPaginatedTable columns={columns} uri={"/groups"} api={api} createRow={createRow} filterField={"name"}/>
  );
};

interface GroupsTableProps {
  api: AxiosInstance
}
