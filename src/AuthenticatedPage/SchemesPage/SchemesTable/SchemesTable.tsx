import React, { useMemo } from "react";
import { AxiosInstance } from "axios";
import { SchemeJsonView } from "eco-rewards-hub";
import { toSchemeId } from "eco-rewards-hub/dist/src/scheme/Scheme";
import DataTable from "react-data-table-component";
import styled from "styled-components";
import "./SchemesTable.css";

export const SchemesTable = ({ api, schemes}: SchemesTableProps) => {
  const rows = schemes.map(s => ({
    id: toSchemeId(s.id!),
    name: s.name
  }));

  const [filterText, setFilterText] = React.useState('');
  const [resetPaginationToggle] = React.useState(false);
  const filteredItems = rows.filter(item => item.name && item.name.includes(filterText));
  const subHeaderComponentMemo = useMemo(() => {
    return <FilterComponent onFilter={(e: any) => setFilterText(e.target.value)} filterText={filterText} />;
  }, [filterText]);

  return (
    <div className="card shadow mb-4">
      <div className="card-header py-3">
        <h6 className="m-0 font-weight-bold text-primary">Edit Schemes</h6>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <DataTable
            columns={[{
              name: "ID",
              selector: "id",
              sortable: true,
              width: "100px"
            },{
              name: "Name",
              selector: "name",
              sortable: true
            }]}
            data={filteredItems}
            pagination
            paginationResetDefaultPage={resetPaginationToggle}
            subHeader
            subHeaderComponent={subHeaderComponentMemo}
          />
        </div>
      </div>
    </div>
  );
};

const FilterComponent = ({ filterText, onFilter, onClear }: any) => (
  <TextField id="search" type="text" placeholder="Filter By Name" value={filterText} onChange={onFilter} />
);


const TextField = styled.input`
  height: 32px;
  width: 200px;
  border-radius: 3px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border: 1px solid #e5e5e5;
  padding: 0 32px 0 16px;

  &:hover {
    cursor: pointer;
  }
`;

interface SchemesTableProps {
  api: AxiosInstance,
  schemes: SchemeJsonView[]
}
