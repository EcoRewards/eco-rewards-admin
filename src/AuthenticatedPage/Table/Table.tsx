import React, { useCallback, useMemo, useState } from "react";
import DataTable, { IDataTableColumn } from "react-data-table-component";
import styled from "styled-components";
import "./Table.css";
import { AxiosInstance } from "axios";

export const Table = <T extends Row>({ rows, columns, removeRows, editRow, api }: TableProps<T>) => {
  const [selectedRows, setSelectedRows] = useState([] as T[]);
  const [toggleCleared, setToggleCleared] = useState(false);

  const handleRowSelected = useCallback(state => {
    setSelectedRows(state.selectedRows);
  }, []);

  const contextActions = useMemo(() => {
    const handleDelete = async () => {

      if (window.confirm(`Are you sure you want to delete:\r ${selectedRows.map(r => r.name)}?`)) {
        setToggleCleared(!toggleCleared);

        await Promise.all(selectedRows.map(r => api.delete(r.id)));

        removeRows!(selectedRows);
      }
    };

    const deleteButton = <button className="btn btn-danger" key="delete" onClick={handleDelete}>Delete</button>;
    const editButton = editRow && selectedRows.length === 1
      ? <button className="btn btn-primary" key="edit" onClick={() => editRow(selectedRows[0])}>Edit</button>
      : null;

    return <>{editButton} {deleteButton}</>;
  }, [selectedRows, toggleCleared, api, removeRows, editRow]);

  const [filterText, setFilterText] = useState('');
  const [resetPaginationToggle] = useState(false);
  const filteredItems = rows.filter(item =>
    (item.name && item.name.includes(filterText)) ||
    item.id === filterText || item.id.includes(filterText)
  );
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
            paginationPerPage={50}
            paginationRowsPerPageOptions={[10, 50, 100, 250]}
            subHeader
            subHeaderComponent={subHeaderComponentMemo}
            selectableRows
            contextActions={removeRows ? contextActions : undefined}
            onSelectedRowsChange={handleRowSelected}
            clearSelectedRows={toggleCleared}
          />
        </div>
      </div>
    </div>
  )
};

interface TableProps<T extends Row> {
  rows: T[],
  columns: IDataTableColumn<T>[],
  removeRows?: (rows: Row[]) => any,
  editRow?: (row: T) => any,
  api: AxiosInstance
}

export interface Row {
  id: string,
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
