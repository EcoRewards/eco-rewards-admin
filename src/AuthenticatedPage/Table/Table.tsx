import React, { useMemo } from "react";
import DataTable, { IDataTableColumn } from "react-data-table-component";
import styled from "styled-components";
import "./Table.css";

export const Table = <T extends Row>({ rows, columns }: TableProps<T>) => {
  const [filterText, setFilterText] = React.useState('');
  const [resetPaginationToggle] = React.useState(false);
  const filteredItems = rows.filter(item => item.name && item.name.includes(filterText));
  const subHeaderComponentMemo = useMemo(() => {
    return <FilterComponent onFilter={(e: any) => setFilterText(e.target.value)} filterText={filterText} />;
  }, [filterText]);

  return (
    <div className="card shadow mb-4">
      <div className="card-header py-3">
        <h6 className="m-0 font-weight-bold text-primary">Edit</h6>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <DataTable
            columns={columns}
            data={filteredItems}
            pagination
            paginationResetDefaultPage={resetPaginationToggle}
            subHeader
            subHeaderComponent={subHeaderComponentMemo}
          />
        </div>
      </div>
    </div>
  )
};

interface TableProps<T extends Row> {
  rows: T[],
  columns: IDataTableColumn<T>[]
}

interface Row {
  name: string
}

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
