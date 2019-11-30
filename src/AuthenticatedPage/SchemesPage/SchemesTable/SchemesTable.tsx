import React from "react";
import { SchemeRow } from "./SchemeRow/SchemeRow";
import { AxiosInstance } from "axios";
import { SchemeJsonView } from "eco-rewards-hub";

export const SchemesTable = ({ api, schemes}: SchemesTableProps) => {
  return (
    <div className="card shadow mb-4">
      <div className="card-header py-3">
        <h6 className="m-0 font-weight-bold text-primary">Edit Schemes</h6>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-bordered" id="dataTable">
            <thead>
            <tr>
              <th className="col-1">ID</th>
              <th>Name</th>
              <th className="col-1">Edit</th>
            </tr>
            </thead>
            <tbody>
            { schemes.map(s => <SchemeRow key={s.id} api={api} scheme={s}/>)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

interface SchemesTableProps {
  api: AxiosInstance,
  schemes: SchemeJsonView[]
}
