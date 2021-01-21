import React from "react";
import { toSchemeId } from "eco-rewards-hub/dist/src/scheme/Scheme";
import { Row, Table } from "../../Table/Table";
import { AxiosInstance } from "axios";
import { SchemeJsonView } from "eco-rewards-hub";

export const SchemesTable = ({ api, schemes, removeSchemes }: SchemesTableProps) => {
  const rows = schemes.map(s => ({ numeric_id: toSchemeId(s.id!), id: s.id!, ...s }));

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
    name: "VAC Client ID",
    selector: "vacClientId",
    sortable: true
  }];

  return (
    <Table columns={columns} rows={rows} removeRows={removeSchemes} api={api}/>
  );
};

interface SchemesTableProps {
  api: AxiosInstance,
  schemes: SchemeJsonView[],
  removeSchemes: (schemes: Row[]) => any
}
