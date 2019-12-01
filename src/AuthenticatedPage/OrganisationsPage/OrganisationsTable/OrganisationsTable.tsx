import React from "react";
import { toOrganisationId } from "eco-rewards-hub/dist/src/organisation/Organisation";
import { Table } from "../../Table/Table";
import { AxiosInstance } from "axios";
import { OrganisationJsonView } from "eco-rewards-hub";

export const OrganisationsTable = ({ api, organisations, links }: OrganisationsTableProps) => {
  const rows = organisations.map(o => ({
    id: toOrganisationId(o.id!),
    name: o.name,
    scheme: links[o.scheme].name
  }));

  const columns = [{
    name: "ID",
    selector: "id",
    sortable: true,
    width: "100px"
  },{
    name: "Name",
    selector: "name",
    sortable: true
  },{
    name: "Scheme",
    selector: "scheme",
    sortable: true
  }];

  return (
    <Table columns={columns} rows={rows}/>
  );
};

interface OrganisationsTableProps {
  api: AxiosInstance,
  organisations: OrganisationJsonView[],
  links: Record<string, any>
}
