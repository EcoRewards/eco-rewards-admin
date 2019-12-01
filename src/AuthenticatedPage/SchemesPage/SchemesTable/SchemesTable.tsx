import React from "react";
import { toSchemeId } from "eco-rewards-hub/dist/src/scheme/Scheme";
import { Table } from "../../Table/Table";
import { AxiosInstance } from "axios";
import { SchemeJsonView } from "eco-rewards-hub";

export const SchemesTable = ({ api, schemes}: SchemesTableProps) => {
  const rows = schemes.map(s => ({
    id: toSchemeId(s.id!),
    name: s.name
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
  }];

  return (
    <Table columns={columns} rows={rows}/>
  );
};

interface SchemesTableProps {
  api: AxiosInstance,
  schemes: SchemeJsonView[]
}
