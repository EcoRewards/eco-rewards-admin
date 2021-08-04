import React, { useCallback, useEffect, useMemo, useState } from "react";
import DataTable, { IDataTableColumn } from "react-data-table-component";
import styled from "styled-components";
import "./ServerPaginatedTable.css";
import { AxiosInstance } from "axios";

export const ServerPaginatedTable = <T extends Row>({ uri, columns, createRow, editRow, api, filterField }: TableProps<T>) => {
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

        setData(data.filter(r1 => !selectedRows.some(r2 => r1.id === r2.id)));
      }
    };

    const deleteButton = <button className="btn btn-danger" key="delete" onClick={handleDelete}>Delete</button>;
    const editButton = editRow && selectedRows.length === 1
      ? <button className="btn btn-primary" key="edit" onClick={() => editRow(selectedRows[0])}>Edit</button>
      : null;

    return <>{editButton} {deleteButton}</>;
  }, [selectedRows, toggleCleared, api, editRow]);

  const [filterText, setFilterText] = useState('');
  const onFilterChange = (e: any) => {
    setFilterText(e.target.value);
    fetchData(1, perPage, e.target.value);
  }

  const subHeaderComponentMemo = useMemo(() => {
    return <FilterComponent onFilter={onFilterChange} filterText={filterText} />;
  }, [filterText]);

  const [data, setData] = useState([] as T[]);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(50);

  const fetchData = async (page: number, quantity: number, filter: string) => {
    const response = await api.get(`${uri}?page=${page}&quantity=${quantity}&filterText=${filter}&filterField=${filterField}`);

    setData(response.data.data.map((item: unknown) => createRow(item, response.data.links)));
    setTotalRows(response.data.pagination.count);
  };

  const handleChangePage = async (page: number) => {
    fetchData(page, perPage, filterText);
  };

  const handlePerRowsChange = async (newPerPage: number, page: number) => {
    setPerPage(50);
    fetchData(page, newPerPage, filterText);
  };

  useEffect(() => {
    fetchData(1, perPage, filterText);
  }, [perPage, filterText]);

  return (
    <div className="card shadow mb-4">
      <div className="card-header py-3">
        <h6 className="m-0 font-weight-bold text-primary">Edit</h6>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <DataTable
            columns={columns}
            data={data}
            pagination
            paginationServer
            paginationPerPage={50}
            paginationRowsPerPageOptions={[10, 50, 100, 250]}
            paginationTotalRows={totalRows}
            subHeader
            subHeaderComponent={subHeaderComponentMemo}
            selectableRows
            contextActions={contextActions}
            onSelectedRowsChange={handleRowSelected}
            onChangeRowsPerPage={handlePerRowsChange}
            onChangePage={handleChangePage}
            clearSelectedRows={toggleCleared}
          />
        </div>
      </div>
    </div>
  )
};

interface TableProps<T extends Row> {
  uri: string,
  columns: IDataTableColumn<T>[],
  editRow?: (row: T) => any,
  createRow: (row: any, links: any) => T,
  filterField: string,
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
