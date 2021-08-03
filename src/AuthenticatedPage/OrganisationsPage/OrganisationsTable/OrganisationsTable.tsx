import React from "react";
import { toOrganisationId } from "eco-rewards-hub/dist/src/organisation/Organisation";
import { Row, ClientPaginatedTable } from "../../Table/ClientPaginatedTable/ClientPaginatedTable";
import { AxiosInstance } from "axios";
import { OrganisationJsonView } from "eco-rewards-hub";

export const OrganisationsTable = ({ api, organisations, links, removeOrganisations }: OrganisationsTableProps) => {
  const rows = organisations.map(o => ({
    id: o.id!,
    numeric_id: toOrganisationId(o.id!),
    name: o.name,
    scheme: links[o.scheme].name
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
    name: "Scheme",
    selector: "scheme",
    sortable: true
  }];

  return (
    <ClientPaginatedTable columns={columns} rows={rows} api={api} removeRows={removeOrganisations}/>
  );
};

interface OrganisationsTableProps {
  api: AxiosInstance,
  organisations: OrganisationJsonView[],
  links: Record<string, any>,
  removeOrganisations: (organisations: Row[]) => any
}
